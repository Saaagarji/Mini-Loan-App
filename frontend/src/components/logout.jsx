import useLogout from "../hooks/useLogout.js";

const logout = () => {
  const { loading, logout } = useLogout();

  return (
    <div className="flex justify-end rounded-lg overflow-hidden">
      {!loading ? (
        <button className="btn btn-outline m-5" onClick={logout}>
          Logout
        </button>
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};

export default logout;
