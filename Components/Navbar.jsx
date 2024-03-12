"use client";
import React, { useState } from "react";
import Link from "next/link";
import { MdAccountCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/Redux/authslice";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.token);
  const route = useRouter();
  return (
    <div className="flex flex-row justify-between w-screen h-[10vh] items-center  shadow-2xl sticky top-0 z-10 bg-white text-black">
      <div className="logo mx-4">
        <Link href={"/"}>
          <h1 className="font-bold text-xl">GRROW.AI</h1>
        </Link>
      </div>

      <div className="flex absolute right-0 top-4 mx-5 cursor-pointer">
        {dropdown && isLoggedIn && (
          <div
            onMouseOver={() => {
              setDropdown(true);
            }}
            onMouseLeave={() => {
              setDropdown(false);
            }}
            className="absolute right-5 top-5 md:right-6 md:top-6 py-2 px-5 w-36 bg-zinc-900 text-white rounded-md"
          >
            <ul>
              <button
                onClick={() => {
                  dispatch(logout());
                  route.replace("/");
                }}
              >
                <li className="py-1 hover:text-gray-400">Logout</li>
              </button>
            </ul>
          </div>
        )}
        {isLoggedIn && (
          <MdAccountCircle
            onMouseOver={() => {
              setDropdown(true);
            }}
            onMouseLeave={() => {
              setDropdown(false);
            }}
            className="text-xl md:text-3xl"
          />
        )}
        {!isLoggedIn && (
          <Link href={"/login"}>
            {" "}
            <button className="bg-slate-200 p-2 mx-2 rounded-lg font-bold hover:text-slate-50 hover:bg-slate-800">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
