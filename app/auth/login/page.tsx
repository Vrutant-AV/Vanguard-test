/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Target} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import styles from "./page.module.css";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({ email: '', password: '' });
    const router = useRouter();
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError('');
  
      try {
        const res = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (!res.ok) {
          console.log('Login failed:', data.message || 'Login failed');
          throw new Error(data.message || 'Login failed');
        }

        localStorage.setItem('token', data.token);
        console.log('Login successful:', data);
        router.push('/');
      } catch (err: any) {
          console.log('Error during login:', 'mail or password is wrong');
          setError('e-mail or password is wrong');
      } finally {
          setLoading(false);
      }
    };

  return (
    <main className="min-h-screen bg-background pt-24">
      <div className={`container ${styles.container}`}>
        <div className={styles.formWrapper}>
          <div className={styles.header}>
            <h1 className={styles.title}>Welcome Back</h1>
            <p className={styles.subtitle}>
              Sign in to your Vanguard account
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formFields}>
              <div className={styles.fieldGroup}>
                <Label htmlFor="email">Email</Label>
                <div className={styles.inputWrapper}>
                  <Mail className={styles.inputIcon} />
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-9"
                    required
                  />
                </div>
              </div>
              
              <div className={styles.fieldGroup}>
                <div className={styles.fieldHeader}>
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/auth/forgot-password"
                    className={styles.forgotLink}
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className={styles.inputWrapper}>
                  <Lock className={styles.inputIcon} />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-9"
                    required
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
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
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className={styles.footerLink}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}