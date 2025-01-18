import React from "react";

const Button = ({ title }) => {
  return (
    <div>
      <button className="px-6 py-2 rounded-md font-medium text-white bg-blue-600 border border-transparent hover:bg-white hover:text-blue-600 hover:border-blue-600 transition duration-300">
        {title}
      </button>
    </div>
  );
};

export default Button;
