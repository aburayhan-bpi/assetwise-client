import { FaEye, FaMousePointer, FaEdit, FaCheckCircle } from "react-icons/fa";

const HowToRequest = () => {
  return (
    <section className="pt-16 px-6 ">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          How to Request an Asset?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-4">
          Follow these simple steps to request an asset effortlessly.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {/* Step 1: View Available Assets */}
        <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center group">
          <FaEye className="text-blue-600 dark:text-blue-400 text-5xl mx-auto mb-4 transition-transform group-hover:scale-110" />
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Go to Request Page</h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Navigate to the "Request Asset" page to see all available assets.
          </p>
          <div className="absolute top-0 left-0 w-full h-full bg-blue-500 dark:bg-blue-600 opacity-10 rounded-lg"></div>
        </div>

        {/* Step 2: Click Request Button */}
        <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center group">
          <FaMousePointer className="text-green-600 dark:text-green-400 text-5xl mx-auto mb-4 transition-transform group-hover:scale-110" />
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Click Request Button</h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Select the asset you need and click the "Request" button.
          </p>
          <div className="absolute top-0 left-0 w-full h-full bg-green-500 dark:bg-green-600 opacity-10 rounded-lg"></div>
        </div>

        {/* Step 3: Add a Note & Submit */}
        <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center group">
          <FaEdit className="text-yellow-600 dark:text-yellow-400 text-5xl mx-auto mb-4 transition-transform group-hover:scale-110" />
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Add Note & Submit</h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            A modal will open—add a note if needed, then submit your request.
          </p>
          <div className="absolute top-0 left-0 w-full h-full bg-yellow-500 dark:bg-yellow-600 opacity-10 rounded-lg"></div>
        </div>

        {/* Step 4: Wait for Approval */}
        <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center group">
          <FaCheckCircle className="text-red-600 dark:text-red-400 text-5xl mx-auto mb-4 transition-transform group-hover:scale-110" />
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Wait for Approval</h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            HR will review your request, and once approved, you can collect your asset.
          </p>
          <div className="absolute top-0 left-0 w-full h-full bg-red-500 dark:bg-red-600 opacity-10 rounded-lg"></div>
        </div>
      </div>
    </section>
  );
};

export default HowToRequest;
