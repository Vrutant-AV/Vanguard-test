/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import GoogleAuthButton from "@/components/google-auth-button";
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
<<<<<<< HEAD
      
=======

>>>>>>> 1c420b6c49c974881a23ac0add3a1419be2bcbf9
      if (!res.ok) {
        console.log('Login failed:', data.message || 'Login failed');
        throw new Error(data.message || 'Login failed');
      }
<<<<<<< HEAD
      
      localStorage.setItem('token', data.token);
      console.log('Login successful:', data);
      router.push('/');
    } catch (err: any){
        console.log('Error during login:', 'Email or password is wrong');
        setError('Email or password is wrong');
    } finally {
        setLoading(false);
    }
  };
  
=======

      localStorage.setItem('token', data.token);
      console.log('Login successful:', data);
      router.push('/');
    } catch (err: any) {
      console.log('Error during login:', 'Email or password is wrong');
      setError('Email or password is wrong');
    } finally {
      setLoading(false);
    }
  };

>>>>>>> 1c420b6c49c974881a23ac0add3a1419be2bcbf9
  const handleGoogleSuccess = (token: string, user: any) => {
    localStorage.setItem('token', token);
    router.push('/');
  };

  const handleGoogleError = (error: string) => {
    setError(error);
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

            <GoogleAuthButton
              mode="login"
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              disabled={loading}
            />
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