import useGetLoans from "../../hooks/useGetLoan";
import { useAuthContext } from "../../context/AuthContext";
import useAdmin from "../../hooks/useAdmin";
import toast from "react-hot-toast";

const admin = () => {
  const { loans, loading } = useGetLoans();
  const { approveLoan, rejectLoan } = useAdmin();
  const { authUser } = useAuthContext();

  const handleApprove = async (loanId) => {
    try {
        const data = await approveLoan(loanId);
        console.log(data);
         toast.success("Loan Approved");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleReject = async (loanId) => {
    try {
      const data = await rejectLoan(loanId);
       toast.success("Loan Rejected");
      console.log(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="bg-opacity-30 sm:h-[450px] min-w-[550px]  md:h-[600px] backdrop-blur-lg rounded-lg shadow-md bg-gray-600 bg-clip-padding backdrop-filter mt-16">
      {loading ? (
        <p className="text-center mt-4">Loading...</p>
      ) : (
        <div className="overflow-auto max-h-[600px]">
          <ul>
            {loans.map((loan) => (
              <li key={loan._id} className="">
                <div className=" pb-5">
                  <div className="text-2xl text-center bg-gray-900 text-white font-semibold p-4">
                    User Name:{" "}
                    <span className="text-l font-normal">
                      {authUser.fullName}
                    </span>
                  </div>
                  <div className="text-xl font-semibold ms-5 pt-4">
                    Loan Amount: $
                    <span className="text-l font-normal text-white">
                      {" " + loan.amount}
                    </span>
                  </div>
                  <div className="text-xl font-semibold ms-5 pt-4">
                    Loan Term:{" "}
                    <span className="text-l font-normal text-white">
                      {loan.term}
                    </span>
                  </div>
                  <div className="text-xl font-semibold ms-5 pt-4">
                    Loan Repayment: $
                    <span className="text-l font-normal text-white">
                      {" " + loan.repaymentAmount}
                    </span>
                  </div>
                  <div className="text-xl font-semibold ms-5 pt-4">
                    Loan Frequency:{" "}
                    <span className="text-l font-normal text-white">
                      {loan.repaymentFrequency.charAt(0).toUpperCase() +
                        loan.repaymentFrequency.slice(1).toLowerCase()}
                    </span>
                  </div>
                  <div className="text-xl font-semibold ms-5 pt-4">
                    Repayment Schedule:
                    <button
                      className="btn btn-blac text-white  ms-4 "
                      onClick={() =>
                        document.getElementById("my_modal_1").showModal()
                      }
                    >
                      View
                    </button>
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
                  <div className="text-xl font-semibold ms-5 pt-4">
                    {loan.status === "APPROVED" ||
                    loan.status === "REJECTED" ? (
                      <div>
                        Status:
                        <span
                          className={`${
                            loan.status === "APPROVED"
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {" "}
                          {loan.status}
                        </span>
                      </div>
                    ) : (
                      <div>
                        <button
                          className="btn btn-success me-5"
                          onClick={() => handleApprove(loan._id)}
                          disabled={loading}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-error"
                          onClick={() => handleReject(loan._id)}
                          disabled={loading}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default admin;
