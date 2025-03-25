"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdClose } from "react-icons/md";
import { z } from "zod";
import { login } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";

const Login = ({ setOpenModal }) => {
  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);
  const dispatch = useDispatch();
  const backendUrl = "http://localhost:4000";
  const [state, setState] = useState("Login");
  const [error, setError] = useState(null);
  const [focusedField, setFocusedField] = useState(null); // Track focused input
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Zod schema for validation
  const loginSchema = z.object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
  });
  const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
  });

  const handleGetStarted = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    // Check if both email and password are empty
    if (data.name === "" && data.email === "" && data.password === "") {
      setError("Name,Email and password are required");
      return;
    }

    try {
      // Validate the form data using the schema
      let validatedData;

      // If validation passes, make the API call
      let newUrl = backendUrl;
      if (state === "Login") {
        validatedData = loginSchema.parse(data);
        newUrl += "/api/auth/login";
      } else {
        validatedData = registerSchema.parse(data);
        newUrl += "/api/auth/register";
      }

      const res = await axios.post(newUrl, validatedData);

      if (res.data.success) {
        dispatch(login(res.data.payload));
        localStorage.setItem("token", res.data.payload);
        setOpenModal(false);
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Handle Zod validation errors
        setError(err.errors[0].message); // Display the first error message
      } else if (err.response) {
        // Handle backend errors
        setError(err.response.data.message);
      } else if (err.request) {
        // No response from the server
        setError("No response from server. Please try again.");
      } else {
        // Something went wrong in the request setup
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className='fixed max-sm:w-full md:w-96 max-sm:px-2 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 no-scroll z-50  flex justify-center items-center '>
      <form
        onSubmit={handleGetStarted}
        className='relative bg-white p-10 rounded-xl text-slate-700 w-full'
      >
        <span
          onClick={() => setOpenModal(false)}
          className='absolute right-2 top-2 p-2 rounded-full border'
        >
          <MdClose />
        </span>
        <h1 className='text-center text-2xl text-neutral-700 font-medium'>
          {state}
        </h1>
        <p className='text-sm'>Welcome back! Please sign in to continue</p>

        {/* Display error message */}
        {error && (
          <p className='text-red-500 text-sm mt-2 text-center'>{error}</p>
        )}

        {state !== "Login" && (
          <div className='space-y-1'>
            <div
              className={`border px-6 py-2 flex items-center gap-2 rounded-full mt-5 ${
                focusedField === "name" ? "border-black" : "border-gray-300"
              }`}
            >
              <input
                className='w-full outline-none text-black'
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                value={data.name}
                type='text'
                placeholder='Full name'
              />
            </div>
          </div>
        )}

        <div
          className={`border px-6 py-2 flex items-center gap-2 rounded-full mt-4 ${
            focusedField === "email" ? "border-black" : "border-gray-300"
          }`}
        >
          <input
            className='w-full outline-none text-black'
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            value={data.email}
            type='email'
            placeholder='Email Id'
          />
        </div>

        <div
          className={`border px-6 py-2 flex items-center gap-2 rounded-full mt-4 ${
            focusedField === "password" ? "border-black" : "border-gray-300"
          }`}
        >
          <input
            className='w-full outline-none text-black'
            onFocus={() => setFocusedField("password")}
            onBlur={() => setFocusedField(null)}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            value={data.password}
            type='password'
            placeholder='Password'
          />
        </div>

        <p className='text-sm text-blue-600 my-4 cursor-pointer'>
          Forgot password?
        </p>

        <button className='bg-blue-600 w-full text-white py-2 rounded-full'>
          {state === "Login" ? "Login" : "Create Account"}
        </button>

        {state === "Login" ? (
          <p className='text-base mt-2'>
            Don't have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className='text-blue-600 cursor-pointer'
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className='text-base mt-2'>
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className='text-blue-600 cursor-pointer'
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
