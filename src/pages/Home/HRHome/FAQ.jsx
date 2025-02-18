import React, { useState } from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "How do I request a new asset?",
      answer:
        "Go to the Asset Request page, fill out the form, and submit your request.",
    },
    {
      question: "What happens if my request is rejected?",
      answer:
        "You will receive a notification with the reason for rejection. You can modify and resubmit the request.",
    },
    {
      question: "How can I track my pending asset requests?",
      answer:
        "Navigate to the 'Pending Requests' section on your dashboard to see the status.",
    },
    {
      question: "What should I do if an asset is damaged?",
      answer:
        "Report the issue using the 'Report Damage' option in your dashboard.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="px-4 mt-14">
      <h2 className="text-center text-2xl font-semibold mb-4 dark:text-white">
        Frequently Asked Questions
      </h2>
      <p className="text-center max-w-xl mx-auto px-2 mb-10 dark:text-white/80">
        Find answers to common questions about AssetWise and how our assetwise
        management system works.
      </p>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b pb-3">
            <button
              className="w-full text-left font-medium text-lg flex justify-between items-center dark:text-white"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span>{openIndex === index ? "-" : "+"}</span>
            </button>
            {openIndex === index && (
              <p className="text-gray-600 dark:text-white/70 mt-2">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default FAQ;
