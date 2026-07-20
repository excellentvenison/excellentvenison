// GitHub OAuth — step 2: exchange the code for a token and hand it to Sveltia CMS.
// Message protocol mirrors Sveltia's official auth worker exactly.
// Requires env vars: OAUTH_GITHUB_CLIENT_ID, OAUTH_GITHUB_CLIENT_SECRET
const PROVIDER = "github";

function outputHTML({ token, error, errorCode }) {
  const state = error ? "error" : "success";
  const content = error ? { provider: PROVIDER, error, errorCode } : { provider: PROVIDER, token };
  const body = `<!doctype html><html><body><script>
  (() => {
    window.addEventListener('message', ({ data, origin }) => {
      if (data === 'authorizing:${PROVIDER}') {
        window.opener?.postMessage(
          'authorization:${PROVIDER}:${state}:${JSON.stringify(content)}',
          origin
        );
      }
    });
    window.opener?.postMessage('authorizing:${PROVIDER}', '*');
  })();
</script><p>${state === "success" ? "Logging you in…" : "Login failed — you can close this window."}</p></body></html>`;
  return { statusCode: 200, headers: { "Content-Type": "text/html;charset=UTF-8" }, body };
}

exports.handler = async (event) => {
  const code = event.queryStringParameters && event.queryStringParameters.code;
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret)
    return outputHTML({ error: "OAuth app client ID or secret is not configured.", errorCode: "MISCONFIGURED_CLIENT" });
  if (!code)
    return outputHTML({ error: "Failed to receive an authorization code.", errorCode: "AUTH_CODE_REQUEST_FAILED" });

  let response;
  let token = "";
  let error = "";
  try {
    response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ code, client_id: clientId, client_secret: clientSecret }),
    });
  } catch {
    /* handled below */
  }
  if (!response)
    return outputHTML({ error: "Failed to request an access token. Please try again.", errorCode: "TOKEN_REQUEST_FAILED" });

  try {
    ({ access_token: token, error } = await response.json());
  } catch {
    return outputHTML({ error: "Server responded with malformed data.", errorCode: "MALFORMED_RESPONSE" });
  }
  return outputHTML({ token, error });
};
