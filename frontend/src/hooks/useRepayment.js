import { useState } from "react";

const useRepayment = () => {
  const [loading, setLoading] = useState(false);

  const PayRepayment = async (loanId, scheduleId) => {
  setLoading(true);
  try {
    const res = await fetch(`/api/loans/${loanId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scheduleId }),
    });
    if (!res.ok) {
      throw new Error('Failed to process repayment');
    }
    const data = await res.json();
    setLoading(false);
    return data;
  } catch (error) {
    setLoading(false);
    console.error("Error In Repayment:", error);
    throw new Error("Repayment Failed");
  }
  };
  return { PayRepayment, loading };
};

export default useRepayment;
