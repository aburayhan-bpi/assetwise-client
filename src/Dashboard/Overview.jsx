import useAuth from "../hooks/useAuth";
import useCurrentUser from "../hooks/useCurrentUser";
import EmpOverview from "./EmployeeDashboard/EmpOverview";
import HROverview from "./HRDashboard/HROverview";

const Overview = () => {
  const { user } = useAuth();
  const currentUser = useCurrentUser();
  console.log(currentUser);
  console.log(user);

  return (
    <div className="px-4 py-2">
      {user?.email && currentUser?.role === "hr" && (
        <>
          <HROverview user={user} currentUser={currentUser} />
        </>
      )}
      {user?.email && currentUser?.role === "employee" && (
        <>
          <EmpOverview user={user} currentUser={currentUser} />
        </>
      )}
    </div>
  );
};

export default Overview;
