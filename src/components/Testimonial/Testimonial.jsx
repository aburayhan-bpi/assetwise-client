import React from "react";

const Testimonial = () => {
  return (
    <div>
      <section className="text-center my-14">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          What Our Users Say
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          See what our users have to say about us.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {[
            {
              name: "John Doe",
              review: "This platform made asset management seamless!",
            },
            {
              name: "Sarah Khan",
              review: "I love the tracking features. So efficient!",
            },
            {
              name: "Michael Lee",
              review: "The best asset management system I’ve used.",
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg"
            >
              <p className="text-gray-700 dark:text-gray-300 italic">
                "{testimonial.review}"
              </p>
              <h3 className="mt-4 font-semibold text-gray-800 dark:text-white">
                {testimonial.name}
              </h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Testimonial;
