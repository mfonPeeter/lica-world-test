"use client";

import { useFormStatus } from "react-dom";

interface DashboardButtonInterface {
  disablePublishBtn: boolean;
}

export default function DashboardButtons({
  disablePublishBtn,
}: DashboardButtonInterface) {
  const { pending } = useFormStatus();

  return (
    <>
      <button
        disabled={true}
        type="button"
        className="px-4 py-1.5 bg-white border rounded-md cursor-not-allowed transition-colors hover:bg-white/70 sm:border-none"
      >
        Save as draft
      </button>
      <button
        disabled={true}
        type="button"
        className="px-4 py-1.5 bg-white border rounded-md cursor-not-allowed transition-colors hover:bg-white/70 sm:border-none"
      >
        Schedule
      </button>
      <button
        disabled={disablePublishBtn || pending}
        type="submit"
        className={`px-4 py-1.5 text-white rounded-md ${
          disablePublishBtn || pending
            ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
            : "bg-gray-700 hover:bg-gray-600"
        }`}
      >
        {pending ? "Posting..." : "Publish"}
      </button>
    </>
  );
}
