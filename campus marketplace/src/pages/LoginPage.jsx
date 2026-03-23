import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import authService from '../services/authService'
import chatService from '../services/chatService'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login as authLogin } from '../store/authSlice';
import { Mail, Lock, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { useToast } from '../Components/Toast/ToastContainer';

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch
  } = useForm({ mode: 'onChange' });

  const [error, setError] = useState("");
  const emailValue = watch("email");
  const passwordValue = watch("password");

  let from = location.state?.from?.pathname || "/";
  if (from === "/login") from = "/";

  const handleLogin = async (data) => {
    setError("");

    try {
      const session = await authService.login(data);

      if (session) {
        const userData = await authService.getCurrentUser();

        if (userData) {
          dispatch(
            authLogin({
              userData,
              profilePhoto: userData.prefs?.profilePhoto || null,
              accessToken: session?.data?.accessToken || null
            })
          );

          // Reconnect socket with new auth
          setTimeout(() => {
            chatService.reconnect();
          }, 100);

          showToast(`Welcome back, ${userData.name || "User"}!`, 'success', 3000);
        }

        navigate(from, { replace: true });
      }
    } catch (error) {
      const errorMsg = error.message || "Login failed. Please try again.";
      setError(errorMsg);
      showToast(errorMsg, 'error', 4000);
    }
  };

  return (
    <div className="w-full flex justify-center items-center min-h-[80vh] px-4 py-8">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="w-full max-w-md space-y-6 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 bg-white dark:bg-gray-900 shadow-xl animate-fadeIn"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
          <p className="text-gray-500 dark:text-gray-500 text-sm">Sign in to continue to your account</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex gap-3 animate-slideInFromBottom">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        {/* Email Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Please enter a valid email address",
                },
              })}
              className={`w-full pl-12 pr-12 py-3.5 rounded-xl border transition-all duration-200 outline-none dark:bg-gray-900/50 dark:text-white
                          ${errors.email
                            ? 'border-red-400 focus:ring-2 focus:ring-red-500/20 bg-red-50 dark:bg-red-900/20'
                            : 'border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500'
                          }`}
            />
            {emailValue && !errors.email && (
              <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500 animate-scaleIn" />
            )}
          </div>
          {errors.email && (
            <div className="flex items-center gap-2 animate-slideInFromBottom">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <p className="text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
            </div>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={`w-full pl-12 pr-12 py-3.5 rounded-xl border transition-all duration-200 outline-none dark:bg-gray-800/50 dark:text-white
                          ${errors.password
                            ? 'border-red-400 focus:ring-2 focus:ring-red-500/20 bg-red-50 dark:bg-red-900/20'
                            : 'border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500'
                          }`}
            />
            {passwordValue && !errors.password && (
              <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500 animate-scaleIn" />
            )}
          </div>
          {errors.password && (
            <div className="flex items-center gap-2 animate-slideInFromBottom">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <p className="text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3.5 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 btn-press
                      ${isSubmitting
                        ? 'bg-gray-300 dark:bg-gray-800 text-gray-500 dark:text-gray-300 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
                      }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Signing in...
            </>
          ) : (
            <>
              Sign In
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        {/* Helper Text */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-500">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline transition-colors"
          >
            Create one
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;