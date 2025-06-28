"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (error) {
      setStatus("error");
      setMessage("Authentication failed. Please try again.");
      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
      return;
    }

    if (token) {
      // Store the token
      localStorage.setItem("token", token);
      setStatus("success");
      setMessage("Successfully authenticated! Redirecting...");
      
      // Redirect to home page
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } else {
      setStatus("error");
      setMessage("No authentication token received.");
      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
    }
  }, [searchParams, router]);

  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        {status === "loading" && (
          <>
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
            <h1 className="text-xl font-medium">Processing authentication...</h1>
            <p className="text-muted-foreground">Please wait while we complete your sign-in.</p>
          </>
        )}
        
        {status === "success" && (
          <>
            <CheckCircle className="h-12 w-12 mx-auto text-green-600" />
            <h1 className="text-xl font-medium text-green-600">Authentication Successful!</h1>
            <p className="text-muted-foreground">{message}</p>
          </>
        )}
        
        {status === "error" && (
          <>
            <XCircle className="h-12 w-12 mx-auto text-red-600" />
            <h1 className="text-xl font-medium text-red-600">Authentication Failed</h1>
            <p className="text-muted-foreground">{message}</p>
          </>
        )}
      </div>
    </main>
  );
}