import React, { useEffect, useState } from 'react';

const Notification = ({ error }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);

      return () => clearTimeout(timer); 
    }
  }, [error]);

  if (!visible) return null;

  return (
    <div className="fixed top-4 left-4 text-red-800 bg-red-100 z-50 w-full max-w-xs p-4 rounded-lg shadow dark:bg-gray-800 dark:text-gray-400" role="alert">
      <div className="flex">

        <div className="ms-3 text-sm font-normal">
          <span className="mb-1 text-sm font-semibold text-red-900">Error Notification</span>
          <div className="mb-2 text-sm font-normal">{error.message} {error.status}</div>
        </div>
        <button 
          type="button" 
          className="ms-auto -mx-1.5 -my-1.5  text-red-800 justify-center items-center flex-shrink-0  rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex h-8 w-8 " 
          aria-label="Close"
          onClick={() => setVisible(false)}
        >
          <span className="sr-only">Close</span>
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Notification;
