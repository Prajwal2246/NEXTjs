"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<{
    username?: string;
    email?: string;
  }>({});

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("logout successfull");
      router.push("/login");
    } catch (error) {
      console.log(error);
      toast.error("failed to logout");
    }
  };

  const getUserInfo = async () => {
    const res = await axios.get("/api/users/me");
    setUser(res.data.user);
  };

  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center">
      <p>Profile</p>

      <button
        onClick={getUserInfo}
        className="m-2 p-2 bg-blue-600 hover:bg-blue-500 hover:scale-95 hover:text-slate-400 cursor-pointer rounded-md outline-none text-md"
      >
        Get user Info
      </button>

      {user.username ? (
        <div className="w-full text-center">
          <h2 className="font-extrabold text-3xl">user details</h2>
          <p>username:{user.username}</p>
          <p>email:{user.email}</p>
        </div>
      ) : (
        ""
      )}

      <button
        onClick={logout}
        className="m-2 p-2 bg-blue-600 hover:bg-blue-500 hover:scale-95 hover:text-slate-400 cursor-pointer rounded-md outline-none text-md"
      >
        Logout
      </button>
    </div>
  );
}
