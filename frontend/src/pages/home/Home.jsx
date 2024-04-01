import ApplyLoan from "../../components/applyLoan.jsx";
import AllLoans from "../../components/allLoans.jsx";
import Logout from "../../components/logout.jsx";

function Home() {
  return (
    <div className="overflow-hidden h-full">
      <Logout />
      <h1 className="text-3xl font-semibold text-center text-gray-300">
        Loan Management
      </h1>
      <ApplyLoan />
      <AllLoans />
    </div>
  );
}

export default Home;
