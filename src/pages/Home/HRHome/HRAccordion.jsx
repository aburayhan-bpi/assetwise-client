import React, { useState } from "react";

const HRAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const questionsAnswers = [
    {
      question: "What is AssetWise?",
      answer:
        "AssetWise is an asset management system designed to help businesses efficiently track and manage their assets.",
    },
    {
      question: "How do I request an asset?",
      answer:
        "To request an asset, you will need to navigate to the 'Request an Asset' section within the AssetWise application.",
    },
    {
      question: "How can I access my assigned assets?",
      answer:
        "You can view your assigned assets within the AssetWise application.",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
        FAQs
      </h2>
      <div className="space-y-4">
        {questionsAnswers.map((item, index) => (
          <div
            key={index}
            className={`border border-gray-300 rounded-lg shadow-sm transition-all duration-300 ${
              activeIndex === index ? "bg-gray-100" : ""
            }`}
          >
            <button
              className={`w-full text-left p-5 focus:outline-none flex justify-between items-center text-gray-800 font-medium hover:bg-gray-200 ${
                activeIndex === index ? "text-blue-500" : ""
              }`}
              onClick={() => toggleAccordion(index)}
            >
              <span>{item.question}</span>
              <span className="ml-2 text-gray-500 text-xl">
                {activeIndex === index ? "-" : "+"}
              </span>
            </button>
            {activeIndex === index && (
              <div className="p-4 text-gray-600 border-t border-gray-200">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HRAccordion;
