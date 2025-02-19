import useAuth from "../hooks/useAuth";
import useCurrentUser from "../hooks/useCurrentUser";
import EmpOverview from "./EmployeeDashboard/EmpOverview";
import HROverview from "./HRDashboard/HROverview";

const Overview = () => {
  const { user, loading, setLoading } = useAuth();
  const currentUser = useCurrentUser();
  console.log(currentUser);
  console.log(user);

  return (
    <div className="px-4 py-2">
      {user?.email && currentUser?.role === "hr" && (
        <>
          <HROverview
            user={user}
            currentUser={currentUser}
            loading={loading}
            setLoading={setLoading}
          />
        </>
      )}
      {user?.email && currentUser?.role === "employee" && (
        <>
          <EmpOverview
            user={user}
            currentUser={currentUser}
            loading={loading}
            setLoading={setLoading}
          />
        </>
      )}
    </div>
  );
};

export default Overview;
