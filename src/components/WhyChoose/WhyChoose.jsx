import React from "react";

const WhyChoose = () => {
  return (
    <div>
      <section className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Why Choose Us?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          We offer the best features for efficient asset management.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {[
            {
              icon: "⚡",
              title: "Fast & Reliable",
              desc: "Quick processing with accurate tracking.",
            },
            {
              icon: "🔒",
              title: "Secure",
              desc: "Data security is our top priority.",
            },
            {
              icon: "📊",
              title: "Easy Reporting",
              desc: "Generate reports with just a click.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg flex flex-col items-center"
            >
              <span className="text-5xl">{feature.icon}</span>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WhyChoose;
