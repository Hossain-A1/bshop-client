'use client'
import { setOffModal } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";

const LoginOverlay = () => {
  const dispatch = useDispatch()
  return (
    <div
      onClick={() => dispatch(setOffModal())}
      className="fixed inset-0 z-30 bg-black/50"
    ></div>
  );
};

export default LoginOverlay;
