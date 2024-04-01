import useGetLoans from "../hooks/useGetLoan";
import useRepayment from "../hooks/useRepayment";
import toast from "react-hot-toast";

const allLoans = () => {
  const { loans, loading } = useGetLoans();
  const { PayRepayment } = useRepayment();

  const handleRepayment = async (loanId, scheduleId) => {
    try {
      const data = await PayRepayment(loanId, scheduleId);
      toast.success("Payment Successfull");
      // console.log(data);
    } catch (error) {
      console.error(error.message);
    }
  };
   const allPaid = (repaymentSchedule) =>
     repaymentSchedule.every((schedule) => schedule.status === "PAID");
  return (
    <div className="bg-opacity-30 sm:h-[450px] min-w-[550px]  md:h-[650px] backdrop-blur-lg rounded-lg shadow-md bg-gray-600 bg-clip-padding backdrop-filter mt-10">
      <h2 className="text-3xl font-semibold text-center text-gray-300 p-3">
        All Loans
      </h2>
      {loading ? (
        <div className="text-center mt-4">
          <span className="loading loading-spinner "></span>
        </div>
      ) : loans.length === 0 ? (
        <div className="text-center mt-4">
          <p className="text-xl pt-20 text-white">No loans found.</p>
        </div>
      ) : (
        <div className="overflow-auto max-h-[580px]">
          <ul>
            {loans.map((loan) => (
              <li key={loan._id} className="">
                <div className=" pb-5">
                  <p className="text-2xl text-center bg-gray-900 text-white font-semibold p-4">
                    Loan Date:{" "}
                    <span className="text-l font-normal">
                      {new Date(loan.createdAt).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="text-xl font-semibold ms-5 pt-4">
                    Loan Amount: $
                    <span className="text-l font-normal text-white">
                      {" " + loan.amount}
                    </span>
                  </p>
                  <p className="text-xl font-semibold ms-5 pt-4">
                    Loan Term:{" "}
                    <span className="text-l font-normal text-white">
                      {loan.term}
                    </span>
                  </p>
                  <p className="text-xl font-semibold ms-5 pt-4">
                    Loan Repayment: $
                    <span className="text-l font-normal text-white">
                      {" " + loan.repaymentAmount}
                    </span>
                  </p>
                  <p className="text-xl font-semibold ms-5 pt-4">
                    Loan Frequency:{" "}
                    <span className="text-l font-normal text-white">
                      {loan.repaymentFrequency.charAt(0).toUpperCase() +
                        loan.repaymentFrequency.slice(1).toLowerCase()}
                    </span>
                  </p>
                  <div className="text-xl font-semibold ms-5 pt-4">
                    Repayment Schedule:
                    {allPaid(loan.repaymentSchedule) ? (
                      <span className="text-green-400 p-2">Loan Close</span>
                    ) : (
                      <button
                        className="btn btn-warning ms-4"
                        onClick={() =>
                          document.getElementById("my_modal_1").showModal()
                        }
                      >
                        Pay
                      </button>
                    )}
                    <dialog id="my_modal_1" className="modal">
                      <div className=" modal-box">
                        <div className="modal-action block">
                          <form method="dialog">
                            <table method="dialog" className="table text-sm">
                              {/* head */}
                              <thead>
                                <tr>
                                  <th>S. no.</th>
                                  <th>Date</th>
                                  <th>Amount</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {loan.repaymentSchedule.map(
                                  (schedule, index) => (
                                    <tr key={index}>
                                      <th>{index + 1}</th>
                                      <td>
                                        {new Date(
                                          schedule.date
                                        ).toLocaleDateString()}
                                      </td>
                                      <td>{schedule.amount}</td>
                                      <td>
                                        <span
                                          className={`text-l font-semibold ${
                                            schedule.status === "PENDING"
                                              ? "text-yellow-400"
                                              : "text-green-400"
                                          }`}
                                        >
                                          {" "}
                                          {schedule.status}
                                        </span>
                                      </td>
                                      <td>
                                        <button
                                          className={`btn btn-success ${
                                            schedule.status === "PENDING"
                                              ? "bg-yellow-400 border-yellow-400"
                                              : "bg-green-400 border-green-400 "
                                          }`}
                                          onClick={() => {
                                            handleRepayment(
                                              loan._id,
                                              schedule._id
                                            );
                                          }}
                                        >
                                          {schedule.status === "PENDING"
                                            ? "PAY"
                                            : "PAID"}
                                        </button>
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                            <button className="btn">Close</button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                  </div>
                  <p className="text-xl font-semibold ms-5 pt-4">
                    Loan Status:{" "}
                    <span
                      className={`text-l font-semibold ${
                        loan.status === "PENDING"
                          ? "text-yellow-400"
                          : loan.status === "APPROVED"
                          ? "text-green-400"
                          : loan.status === "REJECTED"
                          ? "text-red-400"
                          : ""
                      }`}
                    >
                      {loan.status.charAt(0).toUpperCase() +
                        loan.status.slice(1).toLowerCase()}
                    </span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default allLoans;
