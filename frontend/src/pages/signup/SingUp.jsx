import { Link } from "react-router-dom";
import { useState } from "react";
import useSignUp from "../../hooks/useSignUp";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { loading, signup } = useSignUp();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    await signup(inputs)
  }
	return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-600 bg-clip-padding backdrop-filter bg-opacity-30  backdrop-blur-lg ">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up <span className="text-blue-500"> LoanApp</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              value={inputs.fullName}
              onChange={(e) => {
                setInputs({ ...inputs, fullName: e.target.value });
              }}
              placeholder="Enter Full Name"
              className="w-full input input-bordered  h-10"
            />
          </div>

          <div>
            <label className="label p-2 ">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              value={inputs.email}
              onChange={(e) => {
                setInputs({ ...inputs, email: e.target.value });
              }}
              type="text"
              placeholder="Enter Email"
              className="w-full input input-bordered h-10"
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              value={inputs.password}
              onChange={(e) => {
                setInputs({ ...inputs, password: e.target.value });
              }}
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              value={inputs.confirmPassword}
              onChange={(e) => {
                setInputs({ ...inputs, confirmPassword: e.target.value });
              }}
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
            />
          </div>

          <Link
            to={"/login"}
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
            href="#"
          >
            Already have an account?
          </Link>
          <div>
            <button
              className="btn btn-block btn-sm mt-2 border border-slate-700"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
