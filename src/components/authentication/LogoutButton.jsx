import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = ({ logoutRef, isLogout, setIsLogout }) => {
  const { logout, isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();
  return (
    isAuthenticated && (
      <div className="relative wrap_logout" ref={logoutRef}>
        <h2 className="cursor-pointer" onClick={() => setIsLogout(!isLogout)}>
          {user?.name}
        </h2>
        {isLogout && (
          <div className="after">
            <div className="flex flex-col rounded-lg overflow-hidden absolute top-8 right-0 bg-[#333]">
              <div
                className="cursor-pointer p-2 hover:bg-slate-700"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                Sign Out
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default LogoutButton;
