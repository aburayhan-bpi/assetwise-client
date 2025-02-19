import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <section className="relative py-16 px-6 text-center ">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Get in Touch
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-4">
          Have any questions or need assistance? We’re here to help. Reach out
          to us and we'll get back to you as soon as possible.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
          {/* Email */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full sm:w-1/3 flex flex-col items-center">
            <FaEnvelope className="text-3xl text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold text-gray-700 dark:text-white mt-3">
              Email Us
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              support@assetwise.com
            </p>
          </div>
          {/* Phone */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full sm:w-1/3 flex flex-col items-center">
            <FaPhoneAlt className="text-3xl text-green-600 dark:text-green-400" />
            <h3 className="text-lg font-semibold text-gray-700 dark:text-white mt-3">
              Call Us
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              +880 123 456 789
            </p>
          </div>
          {/* Location */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full sm:w-1/3 flex flex-col items-center">
            <FaMapMarkerAlt className="text-3xl text-red-600 dark:text-red-400" />
            <h3 className="text-lg font-semibold text-gray-700 dark:text-white mt-3">
              Visit Us
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Bogura, Bangladesh
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
