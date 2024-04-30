"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

export default function DashboardForm() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const fileSelectHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedImage(file || null);
  };

  const uploadImgHandler = () => {
    fileInputRef.current?.click();
  };

  return (
    <form>
      <div className="flex justify-between p-2 mb-2 bg-gray-200 rounded-md">
        <div className="flex space-x-2">
          <button
            onClick={uploadImgHandler}
            type="button"
            className="flex items-center justify-center px-2 py-1.5 bg-white rounded-md sm:py-0"
          >
            <input
              onChange={fileSelectHandler}
              type="file"
              accept=".jpg, .jpeg, .png, .webp, .gif"
              ref={fileInputRef}
              className="hidden"
            />
            <Image
              src="/svg/media.svg"
              alt="Media upload"
              width="20"
              height="20"
            />
          </button>
          <button
            disabled={true}
            type="button"
            className="flex items-center justify-center px-2 py-1.5 bg-white rounded-md cursor-not-allowed sm:py-0"
          >
            <Image src="/svg/emoji.svg" alt="Emoji" width="20" height="20" />
          </button>
          <button
            disabled={true}
            type="button"
            className="flex items-center justify-center px-2 py-1.5 bg-white rounded-md cursor-not-allowed sm:py-0"
          >
            <Image
              src="/svg/preview.svg"
              alt="Preview"
              width="20"
              height="20"
            />
          </button>
          <button
            disabled={true}
            type="button"
            className="flex items-center justify-center px-2 py-1.5 bg-white rounded-md cursor-not-allowed sm:py-0"
          >
            <Image
              src="/svg/ai-assist.svg"
              alt="AI assist"
              width="20"
              height="20"
            />
          </button>
        </div>
        <div className="hidden space-x-2 font-medium sm:flex">
          <button
            disabled={true}
            type="button"
            className="px-4 py-1.5 bg-white rounded-md cursor-not-allowed"
          >
            Save as draft
          </button>
          <button
            disabled={true}
            type="button"
            className="px-4 py-1.5 bg-white rounded-md cursor-not-allowed"
          >
            Schedule
          </button>
          <button
            disabled={true}
            type="submit"
            className="px-4 py-1.5 text-white bg-gray-700 rounded-md cursor-not-allowed"
          >
            Publish
          </button>
        </div>
      </div>

      <div className="mb-3 border rounded-md sm:mb-0">
        <textarea
          rows={1}
          placeholder="Write your new post..."
          className={`resize-none h-[70vh] w-full py-2 px-3 focus:outline-none ${
            selectedImage ? "h-[43vh] xs:h-[50vh]" : "h-[65vh] sm:h-[75vh]"
          }`}
        ></textarea>
        {selectedImage && (
          <div className="group relative w-full h-[25vh] px-3 pb-2">
            <img
              src={imageUrl as string}
              alt={selectedImage?.name as string}
              className="rounded-md w-72 h-full bg-gray-100 px-10 py-1 xs:px-16"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 left-[265px] bg-red-200 p-1 rounded-full opacity-100 transition-all hover:bg-red-100 group-hover:opacity-100"
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
        <button
          disabled={true}
          type="button"
          className="px-4 py-1.5 bg-white rounded-md border cursor-not-allowed"
        >
          Save as draft
        </button>
        <button
          disabled={true}
          type="button"
          className="px-4 py-1.5 bg-white rounded-md border cursor-not-allowed"
        >
          Schedule
        </button>
        <button
          disabled={true}
          type="submit"
          className="px-4 py-1.5 text-white bg-gray-700 rounded-md cursor-not-allowed"
        >
          Publish
        </button>
      </div>
    </form>
  );
}
