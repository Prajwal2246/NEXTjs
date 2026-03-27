"use client";
import react, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const onSignup = async () => {
    try {
      const response = await axios.post("/api/users/signup", user);
      console.log(response.data);
      toast.success("Signup successful 🚀");
      router.push("/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Something went wrong");
    }
  };
  return (
    <div className="text-center ">
      <h2>Signup page</h2>
      <div className="flex flex-col w-screen text-center h-full items-center">
        <label htmlFor="username">username</label>
        <input
          className="p-2 border  bg-amber-50 text-black rounded-2xl"
          type="text"
          placeholder="username"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <label htmlFor="email">Email</label>
        <input
          className="p-2 border  bg-amber-50 text-black rounded-2xl"
          type="text"
          placeholder="email"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <label htmlFor="password">password</label>
        <input
          className="p-2 border  bg-amber-50 text-black rounded-2xl"
          type="text"
          placeholder="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button
          onClick={onSignup}
          className="px-3 py-1 border-2 m-2 rounded-2xl"
        >
          Signup
        </button>
        <Link href="/login">Login Here</Link>
      </div>
    </div>
  );
}
