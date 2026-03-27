"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
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

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <p>Profile</p>

      <button
        onClick={logout}
        className="m-2 p-2 bg-blue-600 hover:bg-blue-500 hover:scale-95 hover:text-slate-400 cursor-pointer rounded-md outline-none text-md"
      >
        Logout
      </button>
    </div>
  );
}
