// app/banned/noticed/page.jsx
"use client";

export default function NoticedPage() {
  return (
    <div className="min-h-screen  fixed w-full flex flex-col z-9999 items-center justify-center bg-gray-950 text-gray-100  px-4">
      <h1 className="text-4xl font-bold text-red-500 mb-4">
        🚫 Access Restricted
      </h1>
      <p className="text-xl bold mb-6 text-center text-green-700 max-w-md">
        Your device has been banned from accessing this application. <br />
        <br />
        Please contact the Admin for more information or to resolve this issue.
      </p>
    </div>
  );
}
