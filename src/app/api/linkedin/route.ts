import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

// Get user info
export async function GET() {
  const headersList = headers();
  const authorizationDetails = headersList.get("authorization");

  const options: RequestInit = {
    headers: {
      Authorization: authorizationDetails as string,
    },
  };
  const response = await fetch("https://api.linkedin.com/v2/userinfo", options);
  const data = await response.json();

  // Extract the user ID from the response data
  const { sub }: { sub: string } = data;

  return NextResponse.json({ userId: sub });
}

// Post on LinkedIn with text
export async function POST(req: NextRequest) {
  const { userId, accessToken, content } = await req.json();

  const bodyData = {
    author: `urn:li:person:${userId}`,
    lifecycleState: "PUBLISHED",
    specificContent: {
      "com.linkedin.ugc.ShareContent": {
        shareCommentary: {
          text: content,
        },
        shareMediaCategory: "NONE",
      },
    },
    visibility: {
      "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
    },
  };

  const options: RequestInit = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "content-type": "application/json",
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify(bodyData),
  };

  const response = await fetch("https://api.linkedin.com/v2/ugcPosts", options);

  if (!response.ok) {
    return NextResponse.json({
      error: `Failed to publish post: ${response.statusText}!`,
    });
  }

  const data = await response.json();

  return NextResponse.json(data);
}
