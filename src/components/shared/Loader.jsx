import React from "react";
import { SpinnerDotted } from "spinners-react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <SpinnerDotted size={40} thickness={100} speed={93} color="#36ad47" />
    </div>
  );
};

export default Loader;
