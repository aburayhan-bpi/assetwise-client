import React from "react";
import { MdEmail, MdPhone, MdAccessTime } from "react-icons/md";

const Support = () => {
  return (
    <div className="p-8 bg-white rounded-2xl mt-14 text-center">
      <h2 className="text-center text-3xl font-bold text-gray-800 mb-4">
        Support & Contact
      </h2>
      <p className="text-center text-lg text-gray-600 mb-6">
        Need help? Get in touch with our HR support team.
      </p>
      <div className="space-y-4 text-gray-700 text-lg">
        <p className="flex items-center justify-center gap-2">
          <MdEmail className="text-blue-600 text-2xl" /> <strong>Email:</strong>{" "}
          support@assetwise.com
        </p>
        <p className="flex items-center justify-center gap-2">
          <MdPhone className="text-green-600 text-2xl" />{" "}
          <strong>Phone:</strong> +880 1234-567890
        </p>
        <p className="flex items-center justify-center gap-2">
          <MdAccessTime className="text-orange-600 text-2xl" />{" "}
          <strong>Office Hours:</strong> Mon-Fri, 9:00 AM - 6:00 PM
        </p>
      </div>
    </div>
  );
};

export default Support;
