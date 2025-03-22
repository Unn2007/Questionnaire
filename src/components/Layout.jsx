import { Suspense } from "react";
import { AppBar } from "./AppBar/AppBar";
import { Toaster } from "react-hot-toast";

export const Layout = ({ children }) => {
  return (
    <div>
      <AppBar />
      <Suspense fallback={null}>{children}</Suspense>
      <Toaster />
    </div>
  );
};
