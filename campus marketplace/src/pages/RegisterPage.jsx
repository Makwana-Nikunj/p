import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice'
import authService from '../services/authService'
import chatService from '../services/chatService'
import { useState } from "react";
import { User, Mail, Lock, AlertCircle, CheckCircle2 } from "lucide-react";
import { useToast } from '../Components/Toast/ToastContainer';
import AtmosphericBlooms from '../Components/AtmosphericBlooms';

const RegisterForm = () => {
  const navigate = useNavigate()
  const { showToast } = useToast();
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({ mode: 'onChange' })

  const password = watch("password");
  const nameValue = watch("name");
  const emailValue = watch("email");
  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");

  const create = async (data) => {
    setError("")
    try {
      const userData = await authService.createAccount(data)
      if (userData) {
        const currentUser = await authService.getCurrentUser()
        if (currentUser) {
          dispatch(login({
            userData: currentUser,
            profilePhoto: currentUser.prefs?.profilePhoto || null,
            accessToken: userData?.data?.accessToken || null
          }));
          setTimeout(() => chatService.reconnect(), 100);
          showToast(`Welcome, ${currentUser.name}! Your account has been created.`, 'success', 3000);
          navigate("/")
        }
      }
    } catch (error) {
      const errorMsg = error.message || "Registration failed. Please try again.";
      setError(errorMsg)
      showToast(errorMsg, 'error', 4000);
    }
  }

  return (
    <div className="w-full flex flex-col justify-center items-center min-h-[80vh] px-4 py-8 relative">
      {/* Vibrant Background */}
      <AtmosphericBlooms intensity="vibrant" />

      <form
        onSubmit={handleSubmit(create)}
        className="w-full max-w-md space-y-6 glass-intense rounded-2xl p-8 relative z-10 animate-fadeIn"
      >
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold gradient-text">Create Account</h2>
          <p className="text-gray-400 text-sm mt-1">Join our campus marketplace</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-xl flex gap-3 border-subtle">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              placeholder="John Doe"
              {...register("name", {
                required: "Full name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters"
                }
              })}
              className={`w-full pl-12 pr-4 py-3.5 rounded-xl border transition-all outline-none bg-[rgba(255,255,255,0.03)] text-white
                          ${errors.name || errors.email || errors.password || errors.confirmPassword
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500/50 bg-red-900/20'
                  : 'border-subtle focus-glow-indigo'
                }`}
            />
            {nameValue && !errors.name && (
              <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-400 animate-scaleIn" />
            )}
          </div>
          {errors.name && (
            <div className="flex items-center gap-2 mt-2">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <p className="text-sm text-red-400">{errors.name.message}</p>
            </div>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
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
              className={`w-full pl-12 pr-4 py-3.5 rounded-xl border transition-all outline-none bg-[rgba(255,255,255,0.03)] text-white
                          ${errors.email
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500/50 bg-red-900/20'
                  : 'border-subtle focus-glow-indigo'
                }`}
            />
            {emailValue && !errors.email && (
              <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-400 animate-scaleIn" />
            )}
          </div>
          {errors.email && (
            <div className="flex items-center gap-2 mt-2">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <p className="text-sm text-red-400">{errors.email.message}</p>
            </div>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                  message: "Password must contain at least one uppercase letter, one lowercase letter, and one number"
                }
              })}
              className={`w-full pl-12 pr-4 py-3.5 rounded-xl border transition-all outline-none bg-[rgba(255,255,255,0.03)] text-white
                          ${errors.password
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500/50 bg-red-900/20'
                  : 'border-subtle focus-glow-indigo'
                }`}
            />
            {passwordValue && !errors.password && (
              <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-400 animate-scaleIn" />
            )}
          </div>
          {errors.password && (
            <div className="flex items-center gap-2 mt-2">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <p className="text-sm text-red-400">{errors.password.message}</p>
            </div>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Confirm Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className={`w-full pl-12 pr-4 py-3.5 rounded-xl border transition-all outline-none bg-[rgba(255,255,255,0.03)] text-white
                          ${errors.confirmPassword
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500/50 bg-red-900/20'
                  : 'border-subtle focus-glow-indigo'
                }`}
            />
            {confirmPasswordValue && !errors.confirmPassword && (
              <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-400 animate-scaleIn" />
            )}
          </div>
          {errors.confirmPassword && (
            <div className="flex items-center gap-2 mt-2">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <p className="text-sm text-red-400">{errors.confirmPassword.message}</p>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 btn-press
                      ${isSubmitting
                        ? 'bg-gray-700 text-gray-300 cursor-not-allowed'
                        : 'btn-gradient-primary text-white hover:shadow-indigo-500/60'
                      }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Creating Account...
            </>
          ) : (
            'Create Account'
          )}
        </button>

        {/* Helper Text */}
        <p className="text-center text-sm text-gray-400">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors hover:underline"
          >
            Sign in
          </button>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
