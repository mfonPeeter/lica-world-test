import { auth, clerkClient } from "@clerk/nextjs/server";

export const getAccessToken = async () => {
  const { userId } = auth();

  // Get the OAuth access token for the user
  const provider = "oauth_linkedin_oidc";

  const clerkResponse = await clerkClient.users.getUserOauthAccessToken(
    userId as string,
    provider
  );

  const accessToken = (clerkResponse as any)[0].token;

  return accessToken;
};
