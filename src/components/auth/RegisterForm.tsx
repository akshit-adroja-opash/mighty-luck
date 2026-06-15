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

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(7, "Invalid phone number"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  setView: (view: "login" | "register") => void;
}

export default function RegisterForm({ setView }: RegisterFormProps) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const responseData = await res.json();
      if (!res.ok) throw new Error(responseData.message || "Failed to register");
      localStorage.setItem("userToken", responseData.token);
      dispatch(authLogin({ user: responseData.user, token: responseData.token }));
      dispatch(closeModal("auth"));
      toast.success("Successfully registered!");
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
      className="relative z-10 flex w-full max-w-[350px] mx-auto md:mx-0 flex-col items-center md:items-start gap-[16px] mt-[10px] md:mt-0"
    >
      {/* Top Container */}
      <div className="flex flex-col gap-[16px] w-full">

        {/* Header with Logo */}
        <div className="flex w-full items-center justify-center py-2 mb-2">
          <Logo 
            className="gap-[8px]"
            iconClassName="-mt-1 w-[28px] h-[20px]"
            textClassName="text-[18px] mt-1 tracking-wide"
          />
        </div>

        {/* Tab Switcher */}
        <div className="flex w-full h-[40px] items-center gap-2">
          <button
            type="button"
            onClick={() => { dispatch(setAuthModalView("register")); setView("register"); }}
            className="flex flex-1 h-full items-center justify-center rounded-[8px] font-manrope text-[14px] font-bold tracking-[0.02em] bg-[#FFC83D] text-black cursor-pointer"
          >
            Join Now
          </button>
          <button
            type="button"
            onClick={() => { dispatch(setAuthModalView("login")); setView("login"); }}
            className="flex flex-1 h-full items-center justify-center rounded-[8px] font-manrope text-[14px] font-bold tracking-[0.02em] bg-[#1463FF] text-white hover:bg-blue-600 transition-all cursor-pointer"
          >
            Log In
          </button>
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-3 w-full">

          {/* Username */}
          <div className="relative flex h-[44px] w-full items-center rounded-[8px] bg-[#112F82] px-4 py-[10px]">
            <input {...register("username")} type="text" placeholder="User name"
              className="w-full bg-transparent font-manrope text-[14px] font-semibold leading-[19px] tracking-[0.02em] text-white outline-none border-none ring-0 focus:ring-0 placeholder:text-[#A5B8EF]" />
          </div>

          {/* First + Last Name */}
          <div className="flex w-full gap-2">
            <div className="relative flex h-[44px] flex-1 items-center rounded-[8px] bg-[#112F82] px-4 py-[10px]">
              <input {...register("firstName")} type="text" placeholder="First Name"
                className="w-full bg-transparent font-manrope text-[14px] font-semibold leading-[19px] tracking-[0.02em] text-white outline-none border-none ring-0 focus:ring-0 placeholder:text-[#A5B8EF]" />
            </div>
            <div className="relative flex h-[44px] flex-1 items-center rounded-[8px] bg-[#112F82] px-4 py-[10px]">
              <input {...register("lastName")} type="text" placeholder="Last Name"
                className="w-full bg-transparent font-manrope text-[14px] font-semibold leading-[19px] tracking-[0.02em] text-white outline-none border-none ring-0 focus:ring-0 placeholder:text-[#A5B8EF]" />
            </div>
          </div>

          {/* Email */}
          <div className="relative flex h-[44px] w-full items-center rounded-[8px] bg-[#112F82] px-4 py-[10px]">
            <input {...register("email")} type="email" placeholder="Email"
              className="w-full bg-transparent font-manrope text-[14px] font-semibold leading-[19px] tracking-[0.02em] text-white outline-none border-none ring-0 focus:ring-0 placeholder:text-[#A5B8EF]" />
          </div>

          {/* Password */}
          <div className="relative flex h-[44px] w-full items-center justify-between rounded-[8px] bg-[#112F82] px-4 py-[10px]">
            <input {...register("password")} type={showPassword ? "text" : "password"} placeholder="Password"
              className="w-full bg-transparent font-manrope text-[14px] font-semibold leading-[19px] tracking-[0.02em] text-white outline-none border-none ring-0 focus:ring-0 placeholder:text-[#A5B8EF]" />
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

          {/* Phone */}
          <div className="flex w-full gap-2">
            <div className="flex h-[40px] w-[121px] items-center gap-[10px] rounded-[8px] bg-[#112F82] px-[16px] cursor-pointer hover:bg-blue-800 transition-colors flex-none">
              <img src="/images/america.svg" alt="US" className="w-[20px] h-[20px] flex-none" />
              <span className="font-manrope text-[14px] font-semibold leading-[19px] tracking-[0.02em] text-white flex-none w-[35px] whitespace-nowrap">+380</span>
              <div className="flex items-center justify-center w-[14px] h-[14px] flex-none">
                <svg width="7" height="4" viewBox="0 0 7 4" fill="none">
                  <path d="M1 1L3.5 3L6 1" stroke="#A5B8EF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="relative flex h-[40px] flex-1 items-center rounded-[8px] bg-[#112F82] px-4">
              <input {...register("phone")} type="text" placeholder="Phone Number"
                className="w-full bg-transparent font-manrope text-[14px] font-semibold leading-[19px] tracking-[0.02em] text-white outline-none border-none ring-0 focus:ring-0 placeholder:text-[#A5B8EF]" />
            </div>
          </div>

        </div>

        {/* Terms */}
        <p className="w-full font-manrope text-[10px] font-medium leading-[14px] text-justify tracking-[0.01em] text-[#BBCAF3]">
          By clicking &ldquo;Join Now&rdquo; I confirm that I&rsquo;m over 18 years old and agree to Mighty Luck&rsquo;s T&amp;C along with the Privacy Policy
        </p>

      </div>

      {/* Bottom Container */}
      <div className="flex flex-col items-center md:items-start gap-[12px] w-full mt-[4px]">
        <button
          type="submit"
          disabled={isLoading}
          className="flex h-[50px] w-full items-center justify-center gap-[10px] rounded-[8px] bg-[#FFC83D] px-[30px] py-[10px] font-manrope text-[14px] font-bold tracking-[0.02em] text-[#1A1404] transition-all hover:bg-yellow-400 disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? "Creating account..." : "Join with a 350% Bonus"}
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
