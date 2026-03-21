import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import authService from '../services/authService'
import chatService from '../services/chatService'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login as authLogin } from '../store/authSlice';
import { Mail, Lock, AlertCircle, CheckCircle2 } from "lucide-react";
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
    <div className="w-full flex justify-center items-center mt-20 pb-8">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="w-full max-w-md space-y-6 border border-gray-200 dark:border-gray-700 rounded-xl p-8 bg-white dark:bg-gray-800 shadow-lg"
      >
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">Sign in to your account</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-300 border-l-4 border-l-red-600 rounded-lg flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Email Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="your@email.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Please enter a valid email address",
                },
              })}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all outline-none dark:bg-gray-700 dark:text-white
                          ${errors.email || errors.password
                  ? 'border-red-300 focus:ring-2 focus:ring-red-200 bg-red-50 dark:bg-red-900/30 dark:border-red-500'
                  : 'border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 focus:border-black dark:focus:border-gray-400'
                }`}
            />
            {emailValue && !errors.email && (
              <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
            )}
          </div>
          {errors.email && (
            <div className="flex items-center gap-2 mt-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <p className="text-sm text-red-600">{errors.email.message}</p>
            </div>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
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
              className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all outline-none
                          ${errors.password
                  ? 'border-red-300 focus:ring-2 focus:ring-red-200 bg-red-50'
                  : 'border-gray-300 focus:ring-2 focus:ring-black/20 focus:border-black'
                }`}
            />
            {passwordValue && !errors.password && (
              <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
            )}
          </div>
          {errors.password && (
            <div className="flex items-center gap-2 mt-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <p className="text-sm text-red-600">{errors.password.message}</p>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${isSubmitting
            ? 'bg-gray-300 text-gray-700 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400'
            : 'bg-black text-white hover:bg-gray-800 active:scale-95 dark:bg-white dark:text-black dark:hover:bg-gray-200'
            }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Logging in...
            </>
          ) : (
            'Sign In'
          )}
        </button>

        {/* Helper Text */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-black dark:text-white font-semibold hover:underline"
          >
            Create one
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
