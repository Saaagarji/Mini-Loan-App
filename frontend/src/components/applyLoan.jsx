import { FaLongArrowAltRight } from "react-icons/fa";

const applyLoan = () => {
  return (
    <div className="flex justify-between mt-8 bg-opacity-30  backdrop-blur-lg rounded-lg shadow-md bg-gray-600 bg-clip-padding backdrop-filter w-96">
      <h2 className="text-2xl font-semibold text-center content-center ms-4">
        Apply New Loan
      </h2>
      <button
        className="btn btn-primary text-white"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        Apply Loan <FaLongArrowAltRight />
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
        <h3 className="font-bold text-lg">Create Loan</h3>
          <form method="dialog">
            <div>
              <label className="label pb-2">
                <span className="text-base label-text">Amount:</span>
              </label>
              <input
                type="text"
                placeholder="Enter Amount"
                className="w-full input input-bordered  h-10"
              />
            </div>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default applyLoan;