import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
import {login} from '../../../store/authSlice'
import authService from '../../../appwrite/auth'
import { useState } from "react";

const RegisterForm = () => {
   const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register,
           handleSubmit ,
           watch,
          formState: { errors, isSubmitting }} = useForm()

    const create = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }


  const password = watch("password");

  

  return (
    <div className="w-full flex flex-col justify-center items-center mt-25">

      {error && <p className="text-red-600 mb-10 text-center">{error}</p>}

      <form
        onSubmit={handleSubmit(create)}
        className="w-full max-w-md space-y-4 border border-gray-300 rounded-xl p-6 bg-white"
      >
        <h2 className="text-xl font-semibold text-center">Create Account</h2>

        {/* Name */}
        <div>
          <input
            placeholder="Full Name"
            {...register("name", { required: "Name is required" })}
            className="w-full border border-gray-300 rounded-md px-3 py-2
                       outline-none focus:border-black focus:ring-2 focus:ring-black/20"
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email",
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

        {/* Confirm Password */}
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "Confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            className="w-full border border-gray-300 rounded-md px-3 py-2
                       outline-none focus:border-black focus:ring-2 focus:ring-black/20"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500 mt-1">
              {errors.confirmPassword.message}
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
          {isSubmitting ? "Creating..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
