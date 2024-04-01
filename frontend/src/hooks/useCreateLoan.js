import { useState } from "react";
import toast from "react-hot-toast";

const useCreateLoan = () => {
  const [loading, setLoading] = useState(false);

  const createLoan = async ({
    user,
    amount,
    term,
    repaymentAmount,
    repaymentFrequency,
    repaymentSchedule,
  }) => {
    const success = handleInputErrors({
      user,
      amount,
      term,
      repaymentAmount,
      repaymentFrequency,
      repaymentSchedule,
    });
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch("/api/loans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user,
          amount,
          term,
          repaymentAmount,
          repaymentFrequency,
          repaymentSchedule,
        }),
      });

      if (success) {
        toast.success("Loan applied successfully");
      }
      const data = await res.json();

      // console.log(data, "Error in Data");

      if (data.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  return { createLoan, loading };
};

export default useCreateLoan;

function handleInputErrors({ amount, term, repaymentAmount, repaymentFrequency,repaymentSchedule }) {
  if (
    !amount ||
    !term ||
    !repaymentAmount ||
    !repaymentFrequency ||
    !repaymentSchedule
  ) {
    toast.error("All fields are required");
    return false;
  }
  return true;
}
