import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useGetLoans = () => {
  const { authUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/loans/user/${authUser._id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch loans");
        }
        const data = await res.json();
        setLoans(data);
      } catch (error) {
        toast.error(error.message || "An error occurred while fetching loans");
      } finally {
        setLoading(false);
      }
    };

    if (authUser && authUser._id) {
      fetchLoans();
    }
  }, [authUser]);

  return { loans, loading };
};

export default useGetLoans;
