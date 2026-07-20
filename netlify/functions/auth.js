// GitHub OAuth — step 1: send the admin to GitHub to authorise.
// Requires env var: OAUTH_GITHUB_CLIENT_ID
exports.handler = async (event) => {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  if (!clientId) {
    return { statusCode: 500, body: "Missing OAUTH_GITHUB_CLIENT_ID environment variable." };
  }
  const proto = event.headers["x-forwarded-proto"] || "https";
  const host = event.headers.host;
  const redirectUri = `${proto}://${host}/.netlify/functions/callback`;
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: "repo,user",
    allow_signup: "false",
  });
  return {
    statusCode: 302,
    headers: { Location: `https://github.com/login/oauth/authorize?${params.toString()}` },
    body: "",
  };
};
