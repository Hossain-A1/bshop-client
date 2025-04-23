"use client";
import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
import axios from "axios";
import { MdClose } from "react-icons/md";
import { z } from "zod";
import { login, setOffModal } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { serverURL } from "@/secret";

// Zod validation schemas
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

const forgetSchema = z
  .object({
    email: z.string().min(1, "Email is required").email("Enter a valid email"),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [state, setState] = useState("Login");
  const [error, setError] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  const handleGetStarted = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      let validatedData;
      let url = `${serverURL}/api/auth`;

      if (state === "Login") {
        validatedData = loginSchema.parse(data);
        url += "/login";
      } else if (state === "Sign-Up") {
        validatedData = registerSchema.parse(data);
        url += "/register";
      } else {
        validatedData = forgetSchema.parse(data);
        url += "/forget";
      }

      const res = await axios.post(url, validatedData, {
        withCredentials: true,
      });

      if (res.data.success) {
        const auth = cookie.get("auth");
        dispatch(login(auth));
        dispatch(setOffModal());
        router.refresh();
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else if (err.response) {
        setError(err.response.data.message || "Something went wrong");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className='fixed max-sm:w-full md:w-96 max-sm:px-2 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 no-scroll z-50 flex justify-center items-center'>
      <form
        onSubmit={handleGetStarted}
        className='relative bg-white p-10 rounded-xl text-slate-700 w-full'
      >
        <span
          onClick={() => dispatch(setOffModal())}
          className='absolute right-2 top-2 p-2 rounded-full border cursor-pointer'
        >
          <MdClose />
        </span>
        <h1 className='text-center text-2xl text-neutral-700 font-medium'>
          {state}
        </h1>
        <p className='text-sm text-center'>
          Welcome back! Please {state.toLowerCase()} to continue
        </p>

        {error && (
          <p className='text-red-500 text-sm mt-2 text-center'>{error}</p>
        )}

        {state === "Sign-Up" && (
          <div
            className={`border px-6 py-2 flex items-center gap-2 rounded-full mt-5 ${
              focusedField === "name" ? "border-black" : "border-gray-300"
            }`}
          >
            <input
              className='w-full outline-none text-black'
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
              onChange={(e) =>
                setData({ ...data, name: e.target.value.trim() })
              }
              value={data.name}
              type='text'
              placeholder='Full name'
            />
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
            onChange={(e) =>
              setData({ ...data, email: e.target.value.trim() })
            }
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
            onChange={(e) =>
              setData({ ...data, password: e.target.value.trim() })
            }
            value={data.password}
            type='password'
            placeholder='Password'
          />
        </div>

        {state === "Forget-Password" && (
          <div
            className={`border px-6 py-2 flex items-center gap-2 rounded-full mt-4 ${
              focusedField === "confirmPassword"
                ? "border-black"
                : "border-gray-300"
            }`}
          >
            <input
              className='w-full outline-none text-black'
              onFocus={() => setFocusedField("confirmPassword")}
              onBlur={() => setFocusedField(null)}
              onChange={(e) =>
                setData({
                  ...data,
                  confirmPassword: e.target.value.trim(),
                })
              }
              value={data.confirmPassword}
              type='password'
              placeholder='Confirm password'
            />
          </div>
        )}

        <button
          type='button'
          onClick={() => setState("Forget-Password")}
          className='text-sm text-blue-600 my-4 cursor-pointer'
        >
          Forgot password?
        </button>

        <button
          type='submit'
          className='bg-blue-600 w-full text-white py-2 rounded-full'
        >
          {state === "Login"
            ? "Login"
            : state === "Forget-Password"
            ? "Update Password"
            : "Create Account"}
        </button>

        <p className='text-base mt-2 text-center'>
          {state === "Login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <span
            onClick={() => setState(state === "Login" ? "Sign-Up" : "Login")}
            className='text-blue-600 cursor-pointer'
          >
            {state === "Login" ? "Sign up" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
