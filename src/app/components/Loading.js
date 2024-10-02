// LoadingButton.js
const LoadingButton = ({ loading, children }) => {
  return (
    <button
      type="submit" // Button type is set to submit for form submission
      className={`w-full py-2 rounded-md text-white transition-all ${
        loading
          ? "bg-gray-400 cursor-not-allowed" // Styles when loading
          : "bg-indigo-600 hover:bg-indigo-700" // Styles when not loading
      }`}
      disabled={loading} // Disable the button when loading
    >
      {loading ? (
        <div className="flex items-center justify-center">
          {" "}
          {/* Flex container for loader and text*/}
          <div className="loader mr-2"></div> {/*Loader spinner*/}
          Loading... {/**Loading text */}
          <style jsx>{`
            .loader {
              border: 4px solid rgba(255, 255, 255, 0.3); // Light border for the loader
              border-top: 4px solid #ffffff; // White border on top for effect
              border-radius: 50%; // Circular shape
              width: 24px; // Width of the loader
              height: 24px; // Height of the loader
              animation: spin 1s linear infinite; // Spin animation
            }
            @keyframes spin {
              0% {
                transform: rotate(0deg); // Initial position
              }
              100% {
                transform: rotate(360deg); // Complete rotation
              }
            }
          `}</style>
        </div>
      ) : (
        children // Render children if not loading
      )}
    </button>
  );
};

export default LoadingButton; // Exporting the LoadingButton component
