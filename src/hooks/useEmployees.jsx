import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useEmployees = () => {
  const { user } = useAuth();
  // console.log(user?.email);
  const axiosSecure = useAxiosSecure();

  const { data: employees = [], isLoading: employeesLoading, refetch } = useQuery({
    queryKey: [user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      const employees = res.data.filter(
        (emp) => emp?.role === "employee" && !emp?.affiliatedWith
      );
      // console.log(employees);
      return employees;
    },
  });
  return [employees, employeesLoading, refetch];
};

export default useEmployees;
