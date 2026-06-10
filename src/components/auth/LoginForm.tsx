"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDispatch } from "react-redux";
import { login as authLogin } from "@/store/slices/authSlice";
import { closeModal } from "@/store/slices/uiSlice";
import { toast } from "sonner";
import { Eye } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.message || "Failed to login");
      }

      // Handle success
      localStorage.setItem("userToken", responseData.token);
      dispatch(
        authLogin({ user: responseData.user, token: responseData.token })
      );
      dispatch(closeModal("auth"));
      toast.success("Successfully logged in!");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-[350px] flex-col items-start gap-[12px] pt-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-[12px]">
        
        {/* Email */}
        <div className="relative flex h-[40px] w-full items-center rounded-[8px] bg-[#112F82] px-[16px]">
          <input
            {...register("email")}
            type="email"
            placeholder="Email Address"
            className="w-full bg-transparent font-manrope text-[14px] font-semibold tracking-[0.02em] text-white outline-none placeholder:text-[#A5B8EF]"
          />
        </div>

        {/* Password */}
        <div className="relative flex h-[40px] w-full items-center justify-between rounded-[8px] bg-[#112F82] px-[16px]">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full bg-transparent font-manrope text-[14px] font-semibold tracking-[0.02em] text-white outline-none placeholder:text-[#A5B8EF]"
          />
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-[#A5B8EF] hover:text-white"
          >
            <Eye size={18} />
          </button>
        </div>

        {/* Forgot Password Link */}
        <div className="flex w-full justify-end">
          <a href="#" className="font-manrope text-[12px] font-medium text-[#7795E8] hover:text-white transition-colors">
            Forgot Password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="mt-6 flex h-[50px] w-full items-center justify-center rounded-[8px] bg-[#1463FF] font-manrope text-[14px] font-bold tracking-[0.02em] text-[#FFFFFF] transition-colors hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? "Logging in..." : "Log In"}
        </button>

        {/* Support Link */}
        <div className="flex w-full items-center gap-[8px] mt-4">
          <div className="flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[#7795E8]/20 text-[#7795E8]">
            <span className="text-[10px] font-bold">?</span>
          </div>
          <p className="font-manrope text-[10px] font-medium tracking-[0.02em] text-[#7795E8]">
            Having problems? <a href="#" className="font-bold text-[#FFC83D] hover:underline">Contact support</a>
          </p>
        </div>

      </form>
    </div>
  );
}
