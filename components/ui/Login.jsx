"use client";
import React, { useState } from "react";
import axios from "axios";

const Login = ({ setOpenCtg, setToken, setUser }) => {
  const backendUrl = "http://localhost:4000";
  const [state, setState] = useState("Login");
  const [focusedField, setFocusedField] = useState(null); // Track focused input

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleGetStarted = async (e) => {
    e.preventDefault();
    try {
      let newUrl = backendUrl;

      if (state === "Login") {
        newUrl += "/api/auth/login";
      } else {
        newUrl += "/api/auth/register";
      }

      const { data: res } = await axios.post(newUrl, data);

      if (res.success) {
        setToken(res.payload.token);
        setUser(res.payload.name);
        localStorage.setItem("token", res.payload.token);
        setOpenCtg(false);
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.error(error.message);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="fixed left-0 top-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form
        onSubmit={handleGetStarted}
        className="relative bg-white p-10 rounded-xl text-slate-700"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          {state}
        </h1>
        <p className="text-sm">Welcome back! Please sign in to continue</p>

        {state !== "Login" && (
          <div
            className={`border px-6 py-2 flex items-center gap-2 rounded-full mt-5 ${
              focusedField === "name" ? "border-black" : "border-gray-300"
            }`}
          >
            <input
              className="w-full outline-none text-black"
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              value={data.name}
              type="text"
              placeholder="Full name"
              required
            />
          </div>
        )}

        <div
          className={`border px-6 py-2 flex items-center gap-2 rounded-full mt-4 ${
            focusedField === "email" ? "border-black" : "border-gray-300"
          }`}
        >
          <input
            className="w-full outline-none text-black"
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            value={data.email}
            type="email"
            placeholder="Email Id"
            required
          />
        </div>

        <div
          className={`border px-6 py-2 flex items-center gap-2 rounded-full mt-4 ${
            focusedField === "password" ? "border-black" : "border-gray-300"
          }`}
        >
          <input
            className="w-full outline-none text-black"
            onFocus={() => setFocusedField("password")}
            onBlur={() => setFocusedField(null)}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>

        <p className="text-sm text-blue-600 my-4 cursor-pointer">
          Forgot password?
        </p>

        <button className="bg-blue-600 w-full text-white py-2 rounded-full">
          {state === "Login" ? "Login" : "Create Account"}
        </button>

        {state === "Login" ? (
          <p className="text-base mt-2">
            Don't have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-blue-600 cursor-pointer"
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="text-base mt-2">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-600 cursor-pointer"
            >
              Login
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
