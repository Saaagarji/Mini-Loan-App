const allLoans = () => {
  return (
    <div className="bg-opacity-30 sm:h-[450px] md:h-[550px] md:min-w-[550px] backdrop-blur-lg rounded-lg shadow-md bg-gray-600 bg-clip-padding backdrop-filter mt-5 ">
      <h2 className="text-3xl font-semibold text-center pt-4">All Loans</h2>
      <div className="overflow-x-auto">
        <table className="table text-sm">
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
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>2024-02-01</td>
              <td>16666.67</td>
              <td>Paid</td>
            </tr>
            {/* row 2 */}
            <tr>
              <th>2</th>
              <td>2024-02-08</td>
              <td>16666.67</td>
              <td>Pending</td>
            </tr>
            {/* row 3 */}
            <tr>
              <th>2</th>
              <td>2024-02-15</td>
              <td>16666.67</td>
              <td>Pending</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default allLoans;
