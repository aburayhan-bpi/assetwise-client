import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div className="">
      <h2>Sidebar</h2>
    </div>
  );
};

export default Sidebar;
