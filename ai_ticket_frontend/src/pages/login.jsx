import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Sparkles, Mail, Lock, ArrowRight, Zap, Bot, Users, BarChart } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.data?.user) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        navigate("/admin/dashboard");
        window.location.reload();
      } else {
        alert(res.data?.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login failed:", err);
      alert("Something went wrong while logging in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900  relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Branding & Features */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-16">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg shadow-purple-500/50">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              TaskAI
            </h1>
          </div>

          {/* Hero Text */}
          <div className="space-y-6 mb-12">
            <h2 className="text-5xl font-bold text-white leading-tight">
              AI-Powered<br />
              Work Distribution<br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed max-w-lg">
              Revolutionize your workflow with intelligent task assignment, real-time analytics, and seamless team collaboration.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 gap-6 max-w-lg">
            <div className="flex items-start gap-4 group">
              <div className="p-3 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors">
                <Bot className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Smart AI Distribution</h3>
                <p className="text-gray-400 text-sm">Automatically assign tasks based on skills and workload</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="p-3 bg-pink-500/10 rounded-xl group-hover:bg-pink-500/20 transition-colors">
                <Users className="w-6 h-6 text-pink-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Team Collaboration</h3>
                <p className="text-gray-400 text-sm">Seamless communication and real-time updates</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="p-3 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
                <BarChart className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Advanced Analytics</h3>
                <p className="text-gray-400 text-sm">Track productivity and optimize performance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg shadow-purple-500/50">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                TaskAI
              </h1>
            </div>

            {/* Login Card */}
            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Welcome back</h2>
                <p className="text-gray-400">Sign in to continue to your dashboard</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Password
                    </label>
                    <Link to="/forgot-password" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 bg-gray-700 border-gray-600 rounded text-purple-600 focus:ring-purple-500 focus:ring-2"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-300">
                    Remember me for 30 days
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 rounded-xl shadow-lg shadow-purple-500/30 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in to Dashboard
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gray-800/50 text-gray-400">Or continue with</span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-700/50 hover:bg-gray-700 border border-gray-600/50 rounded-xl text-white transition-all">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-700/50 hover:bg-gray-700 border border-gray-600/50 rounded-xl text-white transition-all">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  GitHub
                </button>
              </div>

              {/* Sign Up Link */}
              <p className="mt-8 text-center text-gray-400">
                Don't have an account?{" "}
                <Link to="/signup" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                  Sign up for free
                </Link>
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                Trusted by 10,000+ teams worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
