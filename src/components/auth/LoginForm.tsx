"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDispatch } from "react-redux";
import { login as authLogin } from "@/store/slices/authSlice";
import { closeModal, setAuthModalView } from "@/store/slices/uiSlice";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  setView: (view: "login" | "register") => void;
}

export default function LoginForm({ setView }: LoginFormProps) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const responseData = await res.json();
      if (!res.ok) throw new Error(responseData.message || "Failed to login");
      localStorage.setItem("userToken", responseData.token);
      dispatch(authLogin({ user: responseData.user, token: responseData.token }));
      dispatch(closeModal("auth"));
      toast.success("Successfully logged in!");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onError = (errors: any) => {
    const firstError = Object.values(errors)[0] as any;
    if (firstError?.message) toast.error(firstError.message);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="relative z-10 flex w-full flex-col justify-between p-5 gap-4 min-h-[400px] md:h-[546px]"
    >
      {/* Top Container */}
      <div className="flex flex-col gap-4 w-full">

        {/* Header with Logo */}
        <div className="flex w-full items-center justify-center gap-1 py-1">
          <span className="text-lg text-[#FFC83D] leading-none">👑</span>
          <span className="text-sm font-black uppercase tracking-wide text-white leading-none">
            MIGHTY <span className="text-[#FFC83D]">LUCK</span>
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex w-full h-[40px] items-center gap-2">
          <button
            type="button"
            onClick={() => { dispatch(setAuthModalView("register")); setView("register"); }}
            className="flex flex-1 h-full items-center justify-center rounded-[8px] font-manrope text-[14px] font-bold tracking-[0.02em] bg-[#1463FF] text-white hover:bg-blue-600 transition-all cursor-pointer"
          >
            Join Now
          </button>
          <button
            type="button"
            onClick={() => { dispatch(setAuthModalView("login")); setView("login"); }}
            className="flex flex-1 h-full items-center justify-center rounded-[8px] font-manrope text-[14px] font-bold tracking-[0.02em] bg-[#FFC83D] text-black cursor-pointer"
          >
            Log In
          </button>
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-3 w-full pt-2">

          {/* Email */}
          <div className="relative flex h-[44px] w-full items-center rounded-[8px] bg-[#112F82] px-4 py-[10px]">
            <input
              {...register("email")}
              type="email"
              placeholder="Email Address"
              className="w-full bg-transparent font-manrope text-[14px] font-semibold leading-[19px] tracking-[0.02em] text-white outline-none placeholder:text-[#A5B8EF]"
            />
          </div>

          {/* Password */}
          <div className="relative flex h-[44px] w-full items-center justify-between rounded-[8px] bg-[#112F82] px-4 py-[10px]">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full bg-transparent font-manrope text-[14px] font-semibold leading-[19px] tracking-[0.02em] text-white outline-none placeholder:text-[#A5B8EF]"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-[#A5B8EF] hover:text-white transition-colors cursor-pointer flex-none">
              {showPassword ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="flex w-full justify-end">
            <a href="#" className="font-manrope text-[12px] font-medium text-[#7795E8] hover:text-white transition-colors">
              Forgot Password?
            </a>
          </div>

        </div>
      </div>

      {/* Bottom Container */}
      <div className="flex flex-col gap-3 w-full mt-auto">
        <button
          type="submit"
          disabled={isLoading}
          className="flex h-[50px] w-full items-center justify-center gap-2 rounded-[8px] bg-[#1463FF] font-manrope text-[14px] font-bold tracking-[0.02em] text-white transition-all hover:bg-blue-600 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-[18px] w-[18px] text-white flex-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <span>Logging in...</span>
            </>
          ) : "Log In"}
        </button>

        <div className="flex w-full items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="7.25" stroke="#7795E8" strokeWidth="1.5"/>
            <path d="M8 11V10M8 8.5C8.82843 8.5 9.5 7.82843 9.5 7C9.5 6.17157 8.82843 5.5 8 5.5C7.17157 5.5 6.5 6.17157 6.5 7" stroke="#7795E8" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <p className="font-manrope text-[10px] font-medium leading-[14px] tracking-[0.02em] text-[#7795E8]">
            Having problems? <a href="#" className="font-bold text-[#FFC83D] hover:underline">Contact support</a>
          </p>
        </div>
      </div>

    </form>
  );
}
