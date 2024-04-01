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
        const url = `/api/loans/user/${authUser._id}`;
        const res = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch loans");
          // console.log("Failed to fetch loans");
        }
       const data = await res.json();
       if (!data || Object.keys(data).length === 0) {
         throw new Error("Empty response or invalid data");
       }
        setLoans(data);
      } catch (error) {
        console.error("Error fetching loans:", error);
        toast.error(error.message || "An error occurred while fetching loans");
      } finally {
        setLoading(false);
      }
    };

    if (authUser && authUser._id) {
      fetchLoans();
    }
  }, []);

  return { loans, loading };
};

export default useGetLoans;
