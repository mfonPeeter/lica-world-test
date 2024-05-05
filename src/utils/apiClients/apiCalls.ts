// In vercel, NEXT_PUBLIC_BASE_URL will be set to "https://lica-world-test.vercel.app" to avoid production error
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

// Get user Id
export const linkedInGetUserId = async (accessToken: string) => {
  const options: RequestInit = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const response = await fetch(`${baseUrl}/api/linkedin`, options);
  return response.json();
};

// Send a post with text
export const linkedInShareTextPost = async (
  userId: string,
  accessToken: string,
  postContent: string
) => {
  const options: RequestInit = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
      accessToken: accessToken,
      content: postContent,
    }),
  };
  const response = await fetch(`${baseUrl}/api/linkedin`, options);

  return response.json();
};

// Send a post with photo and text
export const linkedInSharePhotoPost = async (
  userId: string,
  accessToken: string,
  postContent: string,
  imageFile: File
) => {
  // Convert image file to binary data
  const binaryImageData = await imageFile.arrayBuffer();

  // Extract image file metadata
  const imageFileType = imageFile.type;
  const imageFileName = imageFile.name;

  // Set request headers
  const requestHeaders = {
    Authorization: `Bearer ${accessToken}`,
    "content-type": "application/json",
    "X-Restli-Protocol-Version": "2.0.0",
  };

  // Register image upload
  const registerImgBody = {
    registerUploadRequest: {
      recipes: ["urn:li:digitalmediaRecipe:feedshare-image"],
      owner: `urn:li:person:${userId}`,
      serviceRelationships: [
        {
          relationshipType: "OWNER",
          identifier: "urn:li:userGeneratedContent",
        },
      ],
    },
  };

  const regsiterImgOptions: RequestInit = {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(registerImgBody),
  };

  const registerImgResponse = await fetch(
    "https://api.linkedin.com/v2/assets?action=registerUpload",
    regsiterImgOptions
  );

  // Check if registration request was successful
  if (!registerImgResponse.ok) {
    return {
      error: `Failed to publish post: ${registerImgResponse.statusText}!`,
    };
  }

  const registerImgData = await registerImgResponse.json();
  const uploadUrl =
    registerImgData.value.uploadMechanism[
      "com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"
    ].uploadUrl;
  const asset = registerImgData.value.asset;

  // Upload Image
  const uploadImgOptions: RequestInit = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "content-type": imageFileType,
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: binaryImageData,
  };

  await fetch(uploadUrl, uploadImgOptions);

  // Create post with the uploaded image
  const createPostBody = {
    author: `urn:li:person:${userId}`,
    lifecycleState: "PUBLISHED",
    specificContent: {
      "com.linkedin.ugc.ShareContent": {
        shareCommentary: {
          text: postContent,
        },
        shareMediaCategory: "IMAGE",
        media: [
          {
            status: "READY",
            description: {
              text: imageFileName,
            },
            media: asset,
            title: {
              text: imageFileName,
            },
          },
        ],
      },
    },
    visibility: {
      "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
    },
  };

  const createPostOptions: RequestInit = {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(createPostBody),
  };

  const createPostResponse = await fetch(
    "https://api.linkedin.com/v2/ugcPosts",
    createPostOptions
  );

  // Check if post creation was successful
  if (!createPostResponse.ok) {
    return {
      error: `Failed to publish post: ${createPostResponse.statusText}!`,
    };
  }

  return createPostResponse.json();
};
