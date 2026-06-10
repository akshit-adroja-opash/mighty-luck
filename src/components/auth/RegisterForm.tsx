"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDispatch } from "react-redux";
import { login as authLogin } from "@/store/slices/authSlice";
import { closeModal } from "@/store/slices/uiSlice";
import { toast } from "sonner";
import { Eye } from "lucide-react"; // Using Lucide eye as placeholder for the password eye icon

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(7, "Invalid phone number"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.message || "Failed to register");
      }

      // Handle success
      localStorage.setItem("userToken", responseData.token);
      dispatch(
        authLogin({ user: responseData.user, token: responseData.token })
      );
      dispatch(closeModal("auth"));
      toast.success("Successfully registered!");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-[350px] flex-col items-start gap-[12px]">
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-[12px]">
        
        {/* Row 1: Username */}
        <div className="relative flex h-[40px] w-full items-center rounded-[8px] bg-[#112F82] px-[16px]">
          <input
            {...register("username")}
            type="text"
            placeholder="User name"
            className="w-full bg-transparent font-manrope text-[14px] font-semibold tracking-[0.02em] text-white outline-none placeholder:text-[#A5B8EF]"
          />
        </div>

        {/* Row 2: First Name & Last Name */}
        <div className="flex w-full gap-[8px]">
          <div className="relative flex h-[40px] flex-1 items-center rounded-[8px] bg-[#112F82] px-[16px]">
            <input
              {...register("firstName")}
              type="text"
              placeholder="First Name"
              className="w-full bg-transparent font-manrope text-[14px] font-semibold tracking-[0.02em] text-white outline-none placeholder:text-[#A5B8EF]"
            />
          </div>
          <div className="relative flex h-[40px] flex-1 items-center rounded-[8px] bg-[#112F82] px-[16px]">
            <input
              {...register("lastName")}
              type="text"
              placeholder="Last Name"
              className="w-full bg-transparent font-manrope text-[14px] font-semibold tracking-[0.02em] text-white outline-none placeholder:text-[#A5B8EF]"
            />
          </div>
        </div>

        {/* Row 3: Email */}
        <div className="relative flex h-[40px] w-full items-center rounded-[8px] bg-[#112F82] px-[16px]">
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="w-full bg-transparent font-manrope text-[14px] font-semibold tracking-[0.02em] text-white outline-none placeholder:text-[#A5B8EF]"
          />
        </div>

        {/* Row 4: Password */}
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

        {/* Row 5: Phone Number */}
        <div className="flex w-full gap-[8px]">
          <div className="flex h-[40px] w-[121px] items-center gap-[10px] rounded-[8px] bg-[#112F82] px-[16px] cursor-pointer hover:bg-blue-800 transition-colors">
            {/* American flag icon placeholder */}
            <span className="text-lg leading-none">🇺🇸</span>
            <span className="font-manrope text-[14px] font-semibold tracking-[0.02em] text-white">+1</span>
            <div className="ml-auto flex flex-col gap-[2px]">
               {/* Arrow down icon */}
               <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5 5L9 1" stroke="#A5B8EF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
            </div>
          </div>
          <div className="relative flex h-[40px] flex-1 items-center rounded-[8px] bg-[#112F82] px-[16px]">
            <input
              {...register("phone")}
              type="text"
              placeholder="Phone Number"
              className="w-full bg-transparent font-manrope text-[14px] font-semibold tracking-[0.02em] text-white outline-none placeholder:text-[#A5B8EF]"
            />
          </div>
        </div>

        {/* Terms Text */}
        <p className="w-[300px] font-manrope text-[10px] font-medium leading-[14px] tracking-[0.01em] text-[#BBCAF3] text-left mt-2">
          By clicking "Join Now" I confirm that I'm over 18 years old and agree to Mighty Luck's T&C along with the Privacy Policy
        </p>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 flex h-[50px] w-full items-center justify-center rounded-[8px] bg-[#FFC83D] font-manrope text-[14px] font-bold tracking-[0.02em] text-[#1A1404] transition-colors hover:bg-yellow-400 disabled:opacity-50"
        >
          {isLoading ? "Creating account..." : "Join with a 350% Bonus"}
        </button>

        {/* Support Link */}
        <div className="flex w-full items-center gap-[8px] mt-2">
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
