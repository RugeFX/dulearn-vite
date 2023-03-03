import React, { useEffect, useRef, useState, useContext } from "react";
import { FaPowerOff } from "react-icons/fa";
import logo from "/src/img/logo.png";
import defpp from "/src/img/profile/default.png";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function useOutsideAlerter(ref, set) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        // alert("You clicked outside of me!");
        set(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [toggleUser, setToggleUser] = useState(false);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();
  useOutsideAlerter(wrapperRef, setToggleUser);

  return (
    <nav className="bg-[#161719] w-screen fixed top-0 p-3 px-5 h-20 grid grid-cols-2 z-20 box-border">
      <div
        ref={wrapperRef}
        className={`z-10 absolute flex flex-col w-52 h-28 top-20 right-10 bg-white rounded-lg shadow-md divide-y-2 ${
          !toggleUser && `hidden`
        }`}
      >
        <div
          onClick={() => navigate("/profile")}
          className="grid grid-flow-col items-center rounded-t-lg hover:bg-slate-300 p-3 cursor-pointer"
        >
          <img src={defpp} alt="User" />
          <div>
            <p className="text-black text-xs font-bold">
              {Object.keys(user).length !== 0 && user.registered_user.name}
            </p>
            <p className="text-black text-xs">
              {Object.keys(user).length !== 0 && user.level.level}
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            logout();
          }}
          className="h-full flex gap-5 items-center justify-center rounded-b-lg hover:bg-slate-300"
        >
          <FaPowerOff />
          Log Out
        </button>
      </div>
      <div className="flex items-center h-full justify-start">
        <img
          className="cursor-pointer"
          src={logo}
          onClick={() => {
            navigate("/home");
          }}
        ></img>
      </div>
      <div className="flex items-center gap-5 h-full justify-end">
        <img
          className="w-10 rounded-full border-white border-2 cursor-pointer"
          src={defpp}
          // ref={wrapperRef}
          onClick={() => {
            setToggleUser(true);
          }}
        ></img>
      </div>
    </nav>
  );
};

export default Navbar;
