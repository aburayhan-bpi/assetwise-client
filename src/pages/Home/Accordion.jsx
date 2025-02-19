import React, { useState } from "react";

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const questionsAnswers = [
    {
      question: "What is AssetWise about?",
      answer:
        "AssetWise is an asset management system designed to help businesses efficiently manage and track their assets. It allows HR managers to oversee asset allocation, and employees to request and use assets within their teams.",
    },
    {
      question: "How can I register as an employee or HR manager?",
      answer:
        "To register as an employee or HR manager, click on the links in navbar (Join as Employee, Join as HR) and fill in the required details. HR managers will need to provide payment information to access the service.",
    },
    {
      question: "Do HR managers need to pay to use AssetWise?",
      answer:
        "Yes, HR managers are required to pay to access the full range of services offered by AssetWise, including asset tracking, reporting, and more.",
    },
    {
      question: "Can employees request assets without being part of a team?",
      answer:
        "No, employees must be part of a team to request assets. This ensures that asset allocation is managed efficiently and securely within the organization.",
    },
    {
      question: "How can I join a team as an employee?",
      answer:
        "Employees can join a team through the HR manager chooice. Once added to a team, you can start requesting assets and managing your assets and so on.",
    },
    {
      question: "What features are available for HR managers?",
      answer:
        "HR managers have access to advanced features such as asset management, team creation, add assets, update assets, manage asset reqeusrt, and the ability to oversee employee asset requests.",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className=" mx-auto mt-8 p-4 bg-white dark:bg-black dark:text-white shadow-lg rounded-lg">
      <h2 className="underline text-3xl font-semibold mb-6 text-center text-gray-900 dark:text-white">
        FAQs
      </h2>
      <div className="space-y-4">
        {questionsAnswers.map((item, index) => (
          <div
            key={index}
            className="border border-gray-300 dark:border-gray-800  rounded-lg shadow-sm transition-all duration-300"
          >
            <button
              className="w-full text-left p-5 focus:outline-none flex justify-between items-center text-gray-800 dark:text-white dark:hover:bg-gray-800 font-medium hover:bg-gray-100"
              onClick={() => toggleAccordion(index)}
            >
              <span>{item.question}</span>
              <span className="ml-2 text-gray-500 text-xl">
                {activeIndex === index ? "-" : "+"}
              </span>
            </button>
            {activeIndex === index && (
              <div className="p-4 text-gray-600 dark:text-white/80 border-t border-gray-200">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordion;
