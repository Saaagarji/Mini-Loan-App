import { FaLongArrowAltRight } from "react-icons/fa";
import { useState } from "react";
import useCreateLoan from "../hooks/useCreateLoan";
import { useAuthContext } from "../context/AuthContext";

const applyLoan = () => {
  const { authUser } = useAuthContext();
  const [rows, setRows] = useState([{ date: "", amount: "" }]);
  const [inputs, setInputs] = useState({
    user: authUser._id,
    amount: "",
    term: "",
    repaymentAmount: "",
    repaymentFrequency: "weekly",
    repaymentSchedule: [],
  });
  const { loading, createLoan } = useCreateLoan();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createLoan(inputs);
    document.getElementById("my_modal_3").close();
  };

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);

    const updatedSchedule = updatedRows.map(({ date, amount }) => ({
      date,
      amount,
    }));
    setInputs({ ...inputs, repaymentSchedule: updatedSchedule });
  };

  const handleAddRow = () => {
    setRows([...rows, { date: "", amount: "" }]);
  };

  const handleRemoveRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);

    const updatedSchedule = updatedRows.map(({ date, amount }) => ({
      date,
      amount,
      status: "PENDING",
    }));
    setInputs({ ...inputs, repaymentSchedule: updatedSchedule });
  };

  const generateTableRows = () => {
    return rows.map((row, index) => (
      <tr key={index}>
        <td>
          <input
            type="date"
            className="input input-bordered h-10 w-36"
            value={row.date}
            onChange={(e) => handleRowChange(index, "date", e.target.value)}
          />
        </td>
        <td>
          <input
            type="text"
            placeholder="Amount"
            className="input input-bordered h-10 w-28"
            value={row.amount}
            onChange={(e) => handleRowChange(index, "amount", e.target.value)}
          />
        </td>
        <td className="h-2 w-2 ">
          <button
            className="btn btn-circle bg-red-500 hover:bg-white text-white  text-l btn-outline"
            onClick={() => handleRemoveRow(index)}
          >
            X
          </button>
        </td>
        <td className="h-2 w-2 ">
          <button
            type="button"
            className="btn bg-lime-500  hover:bg-white hover:text-black  text-white  mt-2 text-xl"
            onClick={handleAddRow}
          >
            +
          </button>
        </td>
      </tr>
    ));
  };
  return (
    <div className="flex justify-between mt-8 bg-opacity-30  backdrop-blur-lg rounded-lg shadow-md bg-gray-600 bg-clip-padding backdrop-filter w-full">
      <h2 className="text-2xl font-semibold text-center content-center ms-4">
        Apply New Loan
      </h2>
      <button
        className="btn btn-primary "
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        Apply Loan <FaLongArrowAltRight />
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-xl">Create Loan</h3>
          <form method="dialog">
            <div>
              <label className="label pb-2">
                <span className="text-base label-text">Amount:</span>
              </label>
              <input
                type="text"
                placeholder="Enter Amount"
                className="w-full input input-bordered  h-10"
                value={inputs.amount}
                onChange={(e) => {
                  setInputs({ ...inputs, amount: e.target.value });
                }}
              />
            </div>
            <div>
              <label className="label pb-2">
                <span className="text-base label-text">Term:</span>
              </label>
              <input
                type="text"
                placeholder="Enter Term"
                className="w-full input input-bordered  h-10"
                value={inputs.term}
                onChange={(e) => {
                  setInputs({ ...inputs, term: e.target.value });
                }}
              />
            </div>
            <label className="label">
              <span className="text-base label-text">Add Repayment:</span>
            </label>
            <div className="">
              <table className="table p-0">
                <thead>
                  <tr className="text-sm ">
                    <th>Date</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>{generateTableRows()}</tbody>
              </table>
            </div>

            <div>
              <label className="label pb-2">
                <span className="text-base label-text">Repayment Amount:</span>
              </label>
              <input
                type="text"
                placeholder="Enter Repayment Amount"
                className="w-full input input-bordered  h-10"
                value={inputs.repaymentAmount}
                onChange={(e) => {
                  setInputs({ ...inputs, repaymentAmount: e.target.value });
                }}
              />
            </div>
            <div className="dropdown">
              <label className="label pb-2">
                <span className="text-base label-text">
                  Repayment Frequency:
                </span>
              </label>
              <div tabIndex={0} role="button" className="btn m-1 bg-base-300">
                {inputs.repaymentFrequency}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-40"
              >
                <li>
                  <a
                    onClick={() => {
                      setInputs({ ...inputs, repaymentFrequency: "weekly" });
                    }}
                  >
                    Weekly
                  </a>
                </li>
                <li>
                  <a
                    onClick={() =>
                      setInputs({
                        ...inputs,
                        repaymentFrequency: "monthly",
                      })
                    }
                  >
                    Monthly
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex justify-center rounded-lg overflow-hidden">
              <button className="btn btn-success" onClick={handleSubmit}>
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default applyLoan;
