import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import authService from '../../../appwrite/auth'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login as authLogin } from '../../../store/authSlice';

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { 
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();
  
  const [error, setError] = useState("");

  // FIX: use let instead of const because you reassign it
  let from = location.state?.from?.pathname || "/";
  if (from === "/login") from = "/";

  // FIXED: renamed login → handleLogin (prevent naming conflicts)
  const handleLogin = async (data) => {
    setError("");

    try {
      const session = await authService.login(data);

      if (session) {
        const userData = await authService.getCurrentUser();

        if (userData) {
          // FIX: correct payload format for authSlice
          dispatch(
            authLogin({
              userData,
              profilePhoto: userData.prefs?.profilePhoto || null
            })
          );
        }

        navigate(from, { replace: true });
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full flex justify-center items-center mt-25">
      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

      <form
        onSubmit={handleSubmit(handleLogin)}  
        className="w-full max-w-md space-y-4 border border-gray-300 rounded-xl p-6 bg-white"
      >
        <h2 className="text-xl font-semibold text-center">Login</h2>

        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            className="w-full border border-gray-300 rounded-md px-3 py-2
                       outline-none focus:border-black focus:ring-2 focus:ring-black/20"
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters",
              },
            })}
            className="w-full border border-gray-300 rounded-md px-3 py-2
                       outline-none focus:border-black focus:ring-2 focus:ring-black/20"
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full border border-black rounded-md py-2 font-medium
                     transition hover:bg-black hover:text-white
                     active:scale-95 disabled:opacity-50"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
