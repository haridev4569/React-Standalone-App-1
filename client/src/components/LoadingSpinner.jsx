
export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-gray-100 bg-opacity-75 flex flex-col items-center justify-center z-50">
      {/* Spinner SVG */}
      <svg
        className="animate-spin h-12 w-12 text-indigo-600 mb-4" // Increased size and margin
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>

      {/* Loading Text */}
      <p className="text-lg font-semibold text-gray-700">
        Loading, please wait...
      </p>
      <p className="text-sm text-gray-500 mt-1">
        Fetching the latest movie magic!
      </p>
    </div>
  );
}

