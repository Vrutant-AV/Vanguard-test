"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import styles from "./page.module.css";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [formDate, setFormData] = useState({
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
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(setFormData),
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
      setIsLoading(false);
    }
  };

    // Helper for social login (placeholder)
  const handleSocialLogin = (provider: string) => {
    setErrorMsg("");
    setIsLoading(true);
    // Implement actual social login here
    setTimeout(() => {
      setIsLoading(false);
      setErrorMsg("Social login is not implemented yet.");
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-background pt-24">
      <div className={`container ${styles.container}`}>
        <div className={styles.formWrapper}>
          <div className={styles.header}>
            <h1 className={styles.title}>Create Account</h1>
            <p className={styles.subtitle}>
              Join Vanguard to start shopping
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formFields}>
              <div className={styles.fieldGroup}>
                <Label htmlFor="name">Full Name</Label>
                <div className={styles.inputWrapper}>
                  <User className={styles.inputIcon} />
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <Label htmlFor="email">Email</Label>
                <div className={styles.inputWrapper}>
                  <Mail className={styles.inputIcon} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-9"
                    required
                  />
                </div>
              </div>
              
              <div className={styles.fieldGroup}>
                <Label htmlFor="password">Password</Label>
                <div className={styles.inputWrapper}>
                  <Lock className={styles.inputIcon} />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    className="pl-9"
                    required
                  />
                </div>
              </div>
            </div>

            {errorMsg && (
              <div className="text-red-500 text-sm text-center">{errorMsg}</div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <div className={styles.socialSection}>
            <div className={styles.divider}>
              <div className={styles.dividerLine}>
                <Separator />
              </div>
              <div className={styles.dividerText}>
                <span className={styles.dividerTextSpan}>
                  Or continue with
                </span>
              </div>
            </div>

            <div className={styles.socialButtons}>
              <Button variant="outline" className="w-full">Google</Button>
              <Button variant="outline" className="w-full">Apple</Button>
            </div>
          </div>

          <p className={styles.footer}>
            Already have an account?{" "}
            <Link href="/auth/login" className={styles.footerLink}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}