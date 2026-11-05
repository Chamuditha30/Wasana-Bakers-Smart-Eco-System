import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.webp";
import Card from "../../ui/Card";
import CustomInput from "../../ui/CustomInput";
import CustomButton from "../../ui/CustomButton";

export default function LoginPage() {
  const [username, setUsername] = useState("wasana");
  const [password, setPassword] = useState("•••");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen w-full bg-[#231b18] flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center mb-6">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-amber-400 p-1 mb-4 shadow-lg">
          <img src={logo} alt="Wasana Bakers" className="w-full h-full object-cover rounded-full" />
        </div>
        <h1 className="text-white text-2xl font-bold tracking-tight">Wasana Bakers</h1>
        <p className="text-[#a89790] text-sm mt-0.5">POS & Management System</p>
      </div>

      <Card className="w-full max-w-sm p-8 shadow-2xl !rounded-3xl">
        <h2 className="text-[#1a1412] text-xl font-bold mb-6">Staff Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <CustomInput
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <CustomInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <CustomButton type="submit" size="lg" className="w-full mt-2">
            Login
          </CustomButton>

          <div className="text-center pt-2">
            <button
              type="button"
              className="text-xs text-neutral-600 hover:text-neutral-900 transition underline underline-offset-2"
            >
              Forget password?
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}