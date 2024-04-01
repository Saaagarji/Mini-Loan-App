import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from "../context/AuthContext";

const useSignUp = () => {
  const [loading,setLoading]=useState(false)
  const { setAuthUser } = useAuthContext();

  const signup = async ({ fullName, email, password, confirmPassword }) => {
    const success = handleInputErrors({
      fullName,
      email,
      password,
      confirmPassword,
    });
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          password,
          confirmPassword,
        }),
      });
        
       if (success) {
         toast.success("User created successfully");
       }
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("loan-user", JSON.stringify(data));
      setAuthUser(data);
      // console.log(data)
    } catch (error) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  return {signup,loading}

}

export default useSignUp

function handleInputErrors({ fullName, email, password, confirmPassword }) {
  if (!fullName || !email || !password) {
    toast.error("All fields are required");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Password do not match");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be atleast 6 characters long");
    return false;
  }
  return true;
}
