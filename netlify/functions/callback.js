// GitHub OAuth — step 2: exchange the code for a token and hand it back to the CMS.
// Requires env vars: OAUTH_GITHUB_CLIENT_ID, OAUTH_GITHUB_CLIENT_SECRET
const PROVIDER = "github";

function respondPage(status, content) {
  const message = `authorization:${PROVIDER}:${status}:${JSON.stringify(content)}`;
  const body = `<!doctype html><html><head><meta charset="utf-8"></head><body>
<script>
  (function () {
    function receiveMessage(e) {
      window.opener.postMessage(${JSON.stringify(message)}, e.origin);
      window.removeEventListener("message", receiveMessage, false);
    }
    window.addEventListener("message", receiveMessage, false);
    window.opener.postMessage("authorizing:${PROVIDER}", "*");
  })();
</script>
<p>${status === "success" ? "Logging you in…" : "Login failed — you can close this window."}</p>
</body></html>`;
  return { statusCode: 200, headers: { "Content-Type": "text/html" }, body };
}

exports.handler = async (event) => {
  const code = event.queryStringParameters && event.queryStringParameters.code;
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;

  if (!code) return respondPage("error", { message: "No code returned from GitHub." });
  if (!clientId || !clientSecret)
    return respondPage("error", { message: "Missing OAuth environment variables." });

  try {
    const res = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    });
    const data = await res.json();
    if (data.error || !data.access_token) {
      return respondPage("error", { message: data.error_description || "No access token." });
    }
    return respondPage("success", { token: data.access_token, provider: PROVIDER });
  } catch (err) {
    return respondPage("error", { message: String(err) });
  }
};
