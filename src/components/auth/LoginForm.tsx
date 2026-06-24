"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDispatch } from "react-redux";
import { login as authLogin } from "@/store/slices/authSlice";
import { closeModal, setAuthModalView } from "@/store/slices/uiSlice";
import { toast } from "sonner";
import Logo from "@/components/ui/Logo";

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
      className="relative z-10 flex w-full max-w-[374px] md:max-w-[350px] mx-auto md:mx-0 flex-col items-center md:items-start gap-[32px] md:mt-0"
    >
      {/* Top Container */}
      <div className="flex flex-col gap-[16px] w-full">

        {/* Header with Logo (Desktop Only) */}
        <div className="hidden md:flex w-full items-center justify-center h-[25.54px]">
          <Logo 
            className="gap-[6px]"
            iconClassName="w-[25px] h-[18.24px]"
            textClassName="text-[18px] leading-[18.24px] tracking-[0.01em]"
          />
        </div>

        {/* Tab Switcher (Desktop Only) */}
        <div className="hidden md:flex w-full h-[40px] items-center p-0">
          <button
            type="button"
            onClick={() => { dispatch(setAuthModalView("register")); setView("register"); }}
            className="flex flex-1 h-full items-center justify-center rounded-l-[8px] rounded-r-none font-manrope text-[14px] font-bold tracking-[0.02em] bg-[#112F82] text-white hover:bg-[#173EAD] transition-all cursor-pointer"
          >
            Join Now
          </button>
          <button
            type="button"
            onClick={() => { dispatch(setAuthModalView("login")); setView("login"); }}
            className="flex flex-1 h-full items-center justify-center rounded-r-[8px] rounded-l-none font-manrope text-[14px] font-bold tracking-[0.02em] bg-[#1463FF] text-white cursor-pointer"
          >
            Log In
          </button>
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-[12px] w-full">

          {/* Email */}
          <div className="relative flex h-[40px] w-full items-center rounded-[8px] bg-[#112F82] px-4">
            <input
              {...register("email")}
              type="email"
              placeholder="Email Address"
              className="w-full bg-transparent font-manrope text-[14px] font-semibold leading-[19px] tracking-[0.02em] text-white outline-none border-none ring-0 focus:ring-0 placeholder:text-[#A5B8EF]"
            />
          </div>

          {/* Password */}
          <div className="relative flex h-[40px] w-full items-center justify-between rounded-[8px] bg-[#112F82] px-4">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full bg-transparent font-manrope text-[14px] font-semibold leading-[19px] tracking-[0.02em] text-white outline-none border-none ring-0 focus:ring-0 placeholder:text-[#A5B8EF]"
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
      <div className="flex flex-col items-center gap-[12px] w-full">
        <button
          type="submit"
          disabled={isLoading}
          className="flex h-[50px] w-full items-center justify-center gap-2 rounded-[8px] bg-[#1463FF] font-manrope text-[14px] leading-[19px] font-bold tracking-[0.02em] text-white transition-all hover:bg-blue-600 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
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

        <div className="flex w-full sm:w-[350px] h-auto items-center justify-start gap-[8px]">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-none">
            <circle cx="8" cy="8" r="7.25" stroke="#7795E8" strokeWidth="1.5"/>
            <path d="M8 11V10M8 8.5C8.82843 8.5 9.5 7.82843 9.5 7C9.5 6.17157 8.82843 5.5 8 5.5C7.17157 5.5 6.5 6.17157 6.5 7" stroke="#7795E8" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <p className="font-manrope text-[12px] font-medium leading-[16px] tracking-[0.02em] text-[#7795E8] flex items-center">
            Having problems?&nbsp;<a href="#" className="font-bold text-[#FFC83D] hover:underline">Contact support</a>
          </p>
        </div>
      </div>

    </form>
  );
}
