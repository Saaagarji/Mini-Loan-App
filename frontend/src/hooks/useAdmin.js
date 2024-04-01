import { useState } from "react";

const useAdmin = () => {
  const [loading, setLoading] = useState(false);

  const approveLoan = async (loanId) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/loans/${loanId}/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      console.error("Error approving loan:", error);
      throw new Error("Failed to approve loan");
    }
  };

  const rejectLoan = async (loanId) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/loans/${loanId}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      console.error("Error rejecting loan:", error);
      throw new Error("Failed to reject loan");
    }
  };

  return { approveLoan, rejectLoan, loading };
};

export default useAdmin;
