const RequestAsset = () => {

  









  return (
    <div class="min-h-screen bg-gray-50">
      <div class="bg-white shadow-md p-6">
        <div class="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <input
            type="text"
            placeholder="Search assets..."
            class="w-full sm:w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <div class="flex space-x-4">
            <select class="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option value="">All Availability</option>
              <option value="Available">Available</option>
              <option value="Out of stock">Out of Stock</option>
            </select>
            <select class="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option value="">All Types</option>
              <option value="Returnable">Returnable</option>
              <option value="Non-returnable">Non-returnable</option>
            </select>
          </div>
        </div>
      </div>

      <div class="container mx-auto p-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-white shadow rounded-lg p-4 space-y-4">
            <h2 class="text-lg font-semibold text-gray-800">Laptop</h2>
            <p class="text-sm text-gray-600">
              Type: <span class="font-medium text-teal-600">Returnable</span>
            </p>
            <p class="text-sm text-gray-600">
              Availability:{" "}
              <span class="font-medium text-green-600">Available</span>
            </p>
            <button class="w-full py-2 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600">
              Request
            </button>
          </div>

          <div class="bg-white shadow rounded-lg p-4 space-y-4">
            <h2 class="text-lg font-semibold text-gray-800">Office Chair</h2>
            <p class="text-sm text-gray-600">
              Type:{" "}
              <span class="font-medium text-teal-600">Non-returnable</span>
            </p>
            <p class="text-sm text-gray-600">
              Availability:{" "}
              <span class="font-medium text-red-600">Out of stock</span>
            </p>
            <button
              class="w-full py-2 bg-gray-400 text-white font-semibold rounded-md cursor-not-allowed"
              disabled
            >
              Request
            </button>
          </div>
        </div>
      </div>

      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
        <div class="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
          <h3 class="text-lg font-semibold text-gray-800">
            Request Asset: Laptop
          </h3>
          <textarea
            class="w-full mt-4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            rows="4"
            placeholder="Additional notes (optional)..."
          ></textarea>
          <div class="flex justify-end mt-4 space-x-2">
            <button class="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">
              Cancel
            </button>
            <button class="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600">
              Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestAsset;
