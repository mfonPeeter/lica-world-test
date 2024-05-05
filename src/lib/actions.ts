"use server";

import {
  linkedInShareTextPost,
  linkedInSharePhotoPost,
} from "@/utils/apiClients/apiCalls";

export const sharePost = async (
  userId: string,
  accessToken: string,
  formData: FormData
) => {
  // Extract post content and image file from form data
  const postContent = formData.get("post-content") as string;
  const imageFile = formData.get("image-file") as File;

  // Check if an image file is present
  if (imageFile.name === "undefined") {
    // If no image file is present, post only text on LinkedIn
    const data = await linkedInShareTextPost(userId, accessToken, postContent);
    return data;
  } else {
    // If an image file is present, post both text and photo on LinkedIn
    const data = await linkedInSharePhotoPost(
      userId,
      accessToken,
      postContent,
      imageFile
    );
    return data;
  }
};
