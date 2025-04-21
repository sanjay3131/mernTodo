import { useQuery } from "@tanstack/react-query";
import Dashboard from "@/components/Dashboard";
import { fetchUser } from "@/utls/apiFunction";

const UserPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user"], // Cache key for the query
    queryFn: fetchUser, // Function to fetch user data
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching user data</div>;

  return (
    <div className="">
      <Dashboard userData={data.user} />
    </div>
  );
};

export default UserPage;
