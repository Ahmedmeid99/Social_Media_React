import { Spinner } from "flowbite-react";
import React from "react";

function Loading() {
  return (
    <div className="h-screen flex items-center justify-center text-center">
        <Spinner aria-label="Center-aligned Large spinner example" size="lg" />
      </div>
  );
}

export default Loading;
