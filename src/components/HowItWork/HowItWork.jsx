import React from "react";

const HowItWork = () => {
  return (
    <div>
      <section className="text-center my-14">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          How It Works
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          A simple process to manage your assets efficiently.
        </p>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          {[
            {
              step: "1",
              title: "Register & Login",
              desc: "Sign up and log in to access the asset management dashboard.",
            },
            {
              step: "2",
              title: "Request Assets",
              desc: "Browse available assets and request what you need.",
            },
            {
              step: "3",
              title: "Manage & Track",
              desc: "Keep track of assigned assets and their status easily.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg"
            >
              <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                {item.step}
              </span>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-2">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HowItWork;
