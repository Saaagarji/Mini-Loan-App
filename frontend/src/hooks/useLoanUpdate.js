import { useState } from "react";
import toast from "react-hot-toast";

const useLoanUpdate = () => {
  const [loading, setLoading] = useState(false);

  const updateLoanStatus = async (loanId, newStatus) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/loans/${loanId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newStatus }),
      });

      if (res.ok) {
        toast.success("Loan status updated successfully");
      } else {
        throw new Error("Failed to update loan status");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { updateLoanStatus, loading };
};

export default useLoanUpdate;
