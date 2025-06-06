"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const rawText = await res.text();
      let data;
      try {
        data = JSON.parse(rawText);
      } catch {
        throw new Error("Unexpected server response. Please try again.");
      }

      if (!res.ok) {
        throw new Error(data?.message || "Registration failed");
      }

      router.push("/auth/login");
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Helper for social login (placeholder)
  const handleSocialLogin = (provider: string) => {
    setErrorMsg("");
    setLoading(true);
    // Implement actual social login here
    setTimeout(() => {
      setLoading(false);
      setErrorMsg("Social login is not implemented yet.");
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-background pt-24">
      <div className="container flex flex-col items-center py-8 md:py-12">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="mb-2 font-serif text-3xl font-light">Create Account</h1>
            <p className="text-muted-foreground">
              Join Vanguard to start shopping
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-9"
                    required
                    autoComplete="name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-9"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-9"
                    required
                    minLength={6}
                    autoComplete="new-password"
                  />
                </div>
              </div>
            </div>

            {errorMsg && (
              <div className="text-red-500 text-sm text-center">{errorMsg}</div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="w-full"
                type="button"
                onClick={() => handleSocialLogin("google")}
                disabled={loading}
              >
                Google
              </Button>
              <Button
                variant="outline"
                className="w-full"
                type="button"
                onClick={() => handleSocialLogin("apple")}
                disabled={loading}
              >
                Apple
              </Button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}