import React, { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useUser from "./useUser";

const useCurrentUser = () => {
  const { user } = useAuth();
  const [users] = useUser();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const matchedUser = users.find((u) => u?.email === user?.email);
    setCurrentUser(matchedUser);
  }, [user, users]);
  return currentUser;
};

export default useCurrentUser;
