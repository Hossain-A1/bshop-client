"use client";
import { store } from "@/app/store";
import { Provider } from "react-redux";

export const ReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
