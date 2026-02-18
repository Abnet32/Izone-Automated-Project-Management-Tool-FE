"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthSuccessRedirect() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (!token) {
          console.error("[auth/success] No token found in URL");
          router.replace("/login");
          return;
        }

        console.log("[auth/success] Token received, storing...");

        // Store token in localStorage (used by client-side API calls)
        localStorage.setItem("auth_token", token);

        // Set httpOnly cookie via API route (required by middleware for protected routes)
        await fetch("/api/auth/set-cookie", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        console.log("[auth/success] Token stored, redirecting to dashboard...");

        // Redirect to dashboard
        router.replace("/dashboard");
      } catch (err) {
        console.error("[auth/success] Error handling auth success", err);
        router.replace("/login");
      }
    };

    handleAuth();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-lg">Signing you in...</p>
      </div>
    </div>
  );
}
