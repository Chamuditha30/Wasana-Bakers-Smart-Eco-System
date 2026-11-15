import React, { useState } from "react";
import logo from "../../images/logo.webp";
import CustomInput from "../../ui/CustomInput";
import CustomButton from "../../ui/CustomButton";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  //initialize auth
  const { login } = useAuth();

  //initialize navigate
  const navigate = useNavigate();

  //initialize data
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  //initialize error and loading
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  //handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(data);

      navigate("/dashboard", { replace: true });
    } catch (error) {
      setError(
        error.response?.data?.message || "Unable to login. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-secondary flex h-screen w-full flex-col items-center justify-center gap-2 p-6">
      {/* logo */}
      <img src={logo} alt="logo" className="size-16" />

      {/* headers */}
      <h1 className="text-2xl font-bold text-white">Wasana Bakers</h1>
      <p className="font-semibold text-white/50">POS & Management System</p>

      {/* login form */}
      <form
        onSubmit={handleLogin}
        className="mt-2 flex w-full flex-col items-center justify-center gap-4 rounded-xl bg-white p-6 md:w-1/2"
      >
        {/* title */}
        <h1 className="text-muted text-2xl font-semibold">Staff Login</h1>

        {/* inputs */}
        <CustomInput
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={data.email}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <CustomInput
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={data.password}
          onChange={handleChange}
          required
          disabled={loading}
        />

        {/* error message */}
        {error && (
          <p className="w-full text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        <CustomButton type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </CustomButton>

        <p className="text-tertiary">Forgot Password?</p>
      </form>
    </div>
  );
}
