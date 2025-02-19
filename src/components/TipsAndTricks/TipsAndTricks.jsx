import { FaLightbulb, FaClock, FaCheckCircle, FaTools } from "react-icons/fa";

const TipsAndTricks = () => {
  const tips = [
    {
      icon: (
        <FaLightbulb className="text-yellow-500 dark:text-yellow-400 text-4xl" />
      ),
      title: "Prioritize Your Requests",
      description:
        "Only request assets when necessary to keep the approval process smooth.",
    },
    {
      icon: <FaClock className="text-blue-500 dark:text-blue-400 text-4xl" />,
      title: "Request in Advance",
      description: "Submit requests early to avoid delays in asset allocation.",
    },
    {
      icon: (
        <FaCheckCircle className="text-green-500 dark:text-green-400 text-4xl" />
      ),
      title: "Track Your Requests",
      description:
        "Regularly check the status of your requests to stay updated.",
    },
    {
      icon: <FaTools className="text-red-500 dark:text-red-400 text-4xl" />,
      title: "Maintain Your Assets",
      description:
        "Take care of assigned assets to prevent unnecessary repairs or replacements.",
    },
  ];

  return (
    <section className="py-16 px-6 ">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Tips & Tricks for Asset Requests
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-4">
          Follow these simple guidelines to make the most of your asset
          requests.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center text-center transition-transform transform hover:scale-105"
          >
            {tip.icon}
            <h3 className="text-lg font-semibold text-gray-700 dark:text-white mt-4">
              {tip.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {tip.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TipsAndTricks;
