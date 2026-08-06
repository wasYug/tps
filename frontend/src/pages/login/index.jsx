import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "../../lib/supabase"; // Import supabase client
import toast from "react-hot-toast";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      toast.success("Logged in successfully!");
      // Login successful - redirect to home
      navigate("/");
    } catch (err) {
      setError(err.message || "An error occurred during login");
      toast.error(err.message || "An error occurred during login");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-sans bg-zinc-50 flex flex-col">
      <Navbar theme="light" />

      <main className="flex-grow flex items-center justify-center p-6 mt-16 md:mt-24 mb-12">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row border border-zinc-100">
          {/* Left Side - Image & Branding */}
          <div className="w-full md:w-1/2 bg-[#0f2142] relative hidden md:flex flex-col justify-between p-12 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80"
                alt="School Campus"
                className="w-full h-full object-cover opacity-30 mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f2142] via-transparent to-transparent"></div>
            </div>

            <div className="relative z-10">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Back to Home
              </Link>
            </div>

            <div className="relative z-10 mt-20">
              <div className="w-12 h-1 bg-[#fb2c36] mb-6 shadow-sm"></div>
              <h2 className="text-3xl lg:text-4xl font-bold font-serif text-white leading-tight mb-6">
                Welcome Back to Takshashila
              </h2>
              <p className="text-white/80 text-lg leading-relaxed">
                Log in to access your student portal, academic resources, and
                community updates.
              </p>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center bg-white relative">
            <div className="md:hidden mb-8">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-[#0f2142] transition-colors text-sm font-medium"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Back to Home
              </Link>
            </div>

            <div className="mb-10 text-center md:text-left">
              <h3 className="text-3xl font-bold text-[#0f2142] mb-3 font-serif">
                Log In
              </h3>
              <p className="text-gray-500 font-medium">
                Please enter your credentials to continue.
              </p>
            </div>

            {/* Error Message Display */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@takshashila.edu.in"
                    className="w-full pl-11 pr-4 py-3.5 bg-zinc-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0f2142]/20 focus:border-[#0f2142] transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-bold text-gray-700">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-sm font-bold text-[#fb2c36] hover:text-[#d6242d] transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-12 py-3.5 bg-zinc-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0f2142]/20 focus:border-[#0f2142] transition-all font-medium tracking-widest"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-[#0f2142] focus:ring-[#0f2142] cursor-pointer"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm font-medium text-gray-600 cursor-pointer"
                >
                  Remember me for 30 days
                </label>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0f2142] hover:bg-[#162d59] text-white font-bold py-6 rounded-xl shadow-lg shadow-[#0f2142]/20 transition-all hover:-translate-y-0.5 text-base mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600 text-sm font-medium">
                Don't have an account?{" "}
                <a
                  href="#"
                  className="font-bold text-[#DD9808] hover:text-[#c48507] transition-colors"
                >
                  Contact Administration
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
