import React, { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useUser from "./useUser";
import useCurrentUser from "./useCurrentUser";

const useHr = () => {
  const { user } = useAuth();
  const [users] = useUser();
  const currentUser = useCurrentUser();
  const [hr, setHr] = useState(null);

  useEffect(() => {
    const hr = currentUser?.role === "hr";
    setHr(hr);
  }, [user, currentUser]);

  return hr;
};

export default useHr;
