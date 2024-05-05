"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { sharePost } from "@/lib/actions";
import DashboardButtons from "./DashboardButtons";
import ToolTip from "../UI/ToolTip";

interface DashboardFormInterface {
  userId: string;
  accessToken: string;
}

export default function DashboardForm({
  userId,
  accessToken,
}: DashboardFormInterface) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null); // State to store the selected image file
  const [imageUrl, setImageUrl] = useState<string | null>(null); // State to store the URL of the selected image
  const [disablePublishBtn, setDisablePublishBtn] = useState(true); // State to control the disabled state of the publish button
  const fileInputRef = useRef<HTMLInputElement>(null); // Reference to the file input element
  const textAreaInputRef = useRef<HTMLTextAreaElement>(null); // Reference to the text area input element
  const formRef = useRef<HTMLFormElement>(null); // Reference to the form element

  // useEffect hook to focus on the text area input and set image URL when image is selected
  useEffect(() => {
    textAreaInputRef.current?.focus();

    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  // Handler for opening file select dialog
  const uploadImgHandler = () => {
    fileInputRef.current?.click(); // Trigger click event on file input element
  };

  // Handler for selecting a file
  const fileSelectHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the selected file
    setSelectedImage(file || null); // Update selected image state
  };

  // Handler for resetting file selection
  const resetFileSelectHandler = () => {
    setSelectedImage(null);
    setImageUrl(null);
  };

  // Handler for resetting the value of the input element to allow selecting the same file again
  const handleFileInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    input.value = "";
  };

  // Handler for handling text area input change
  const textAreaChangeHandler = () => {
    if (textAreaInputRef.current?.value === "") {
      setDisablePublishBtn(true);
    } else {
      setDisablePublishBtn(false);
    }
  };

  // Handler for form submission
  const formSubmitHandler = async (formData: FormData) => {
    // Call sharePost function to post content to LinkedIn
    const data = await sharePost(userId, accessToken, formData);

    // Display success or error toast based on response
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success("Post published successfully!");
    }

    // Reset form fields and focus on text area input
    formRef.current?.reset();
    textAreaInputRef.current?.focus();
    resetFileSelectHandler(); // Reset file selection
    setDisablePublishBtn(true); // Disable publish button
  };

  return (
    <form ref={formRef} action={formSubmitHandler}>
      <div className="flex justify-between p-2 mb-2 bg-gray-200 rounded-md">
        <div className="flex space-x-2">
          {/* Button to trigger file input */}
          <button
            onClick={uploadImgHandler}
            type="button"
            className="group relative flex items-center justify-center px-2 py-1.5 bg-white rounded-md transition-colors hover:bg-white/70 sm:py-0"
          >
            <input
              name="image-file"
              type="file"
              accept=".jpg, .jpeg, .png, .webp, .gif"
              ref={fileInputRef}
              onChange={fileSelectHandler}
              onClick={handleFileInputClick}
              className="hidden"
            />
            <Image
              src="/svg/media.svg"
              alt="Media upload"
              width="20"
              height="20"
            />
            <ToolTip text="Media upload" />
          </button>

          <button
            disabled={true}
            type="button"
            className="group relative flex items-center justify-center px-2 py-1.5 bg-white rounded-md cursor-not-allowed  transition-colors hover:bg-white/70 sm:py-0"
          >
            <Image src="/svg/emoji.svg" alt="Emoji" width="20" height="20" />
            <ToolTip text="Emojis" />
          </button>
          <button
            disabled={true}
            type="button"
            className="group relative flex items-center justify-center px-2 py-1.5 bg-white rounded-md cursor-not-allowed  transition-colors hover:bg-white/70 sm:py-0"
          >
            <Image
              src="/svg/preview.svg"
              alt="Preview"
              width="20"
              height="20"
            />
            <ToolTip text="Preview" />
          </button>
          <button
            disabled={true}
            type="button"
            className="group relative flex items-center justify-center px-2 py-1.5 bg-white rounded-md cursor-not-allowed  transition-colors hover:bg-white/70 sm:py-0"
          >
            <Image
              src="/svg/ai-assist.svg"
              alt="AI assist"
              width="20"
              height="20"
            />
            <ToolTip text="AI assist" />
          </button>
        </div>

        <div className=" hidden space-x-2 font-medium sm:flex">
          <DashboardButtons disablePublishBtn={disablePublishBtn} />
        </div>
      </div>

      {/* Post content input */}
      <div className="mb-3 border rounded-md sm:mb-0">
        <textarea
          rows={1}
          ref={textAreaInputRef}
          name="post-content"
          placeholder="Write your new post..."
          onChange={textAreaChangeHandler}
          className={`resize-none h-[70vh] w-full py-2 px-3 focus:outline-none ${
            selectedImage ? "h-[43vh] xs:h-[50vh]" : "h-[65vh] sm:h-[75vh]"
          }`}
        ></textarea>
        {/* Display selected image */}
        {selectedImage && (
          <div className="group relative w-full h-[25vh] px-3 pb-2">
            <img
              src={imageUrl as string}
              alt={selectedImage?.name}
              className="rounded-md h-full w-60 bg-gray-100 px-10 py-1 sm:w-72 sm:px-16"
            />
            {/* Button to reset file selection */}
            <button
              onClick={resetFileSelectHandler}
              className="absolute top-2 left-[218px] bg-red-200 p-1 rounded-full transition-colors hover:bg-red-100 sm:left-[265px]"
            >
              <Image
                src="/svg/delete.svg"
                alt="Delete image"
                width="20"
                height="20"
              />
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-2 font-medium xs:flex-row xs:justify-end xs:space-x-2 xs:space-y-0 sm:hidden">
        <DashboardButtons disablePublishBtn={disablePublishBtn} />
      </div>
    </form>
  );
}
