import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    !isAuthenticated && (
      <button
        onClick={() => {
          loginWithRedirect();
        }}
        className=" px-4 py-1 rounded-md border border-red-500"
      >
        Sign In
      </button>
    )
  );
};

export default LoginButton;
