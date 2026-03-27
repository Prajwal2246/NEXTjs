"use client";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = () => {};
  return (
    <div>
      <h2>Login page</h2>

      <div className="flex flex-col w-screen text-center h-full items-center">
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
          onClick={onLogin}
          className="px-3 py-1 border-2 m-2 rounded-2xl"
        >
          Login
        </button>
        <Link href="/signup">Signup Here</Link>
      </div>
    </div>
  );
}
