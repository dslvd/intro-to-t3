"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="border-b bg-white px-6 py-4 flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-6">
        <Link href="/" className="font-bold text-lg text-gray-900">
          EnterprisePortal
        </Link>
        {session && (
          <Link href="/projects" className="text-sm text-gray-600 hover:text-blue-600 font-medium">
            Projects
          </Link>
        )}
      </div>

      <div className="flex items-center gap-4">
        {status === "loading" ? (
          <div className="text-sm text-gray-400">Loading...</div>
        ) : session ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700">
              Hello, <span className="font-semibold">{session.user.name || session.user.email}</span>
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/auth/signin" })}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/auth/signin"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 px-3 py-2"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}