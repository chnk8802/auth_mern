"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { CircleCheck } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import * as z from "zod";

// ------------------------
// Validation Schema
// ------------------------

const forgotPasswordSchema = z
  .object({
    email: z.string().email(),
    otp: z.string().length(6),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

type Step = "email" | "otp" | "reset";

export function ForgotPasswordForm() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
      otp: "",
      password: "",
      confirmPassword: "",
    },
  });

  // STEP 1: Email Submission
  const handleEmailSubmit = async (data: ForgotPasswordFormData) => {
    try {
      // await axios.post("/forgot-password", { email: data.email });
      setEmail(data.email);
      setStep("otp");
    } catch (err) {
      toast.error("Failed to send reset email.");
    }
  };

  // STEP 2: OTP Verification
  const handleOtpSubmit = async (data: ForgotPasswordFormData) => {
    try {
      // await axios.post("/verify-otp", { email, otp: data.otp });
      setStep("reset");
    } catch (err) {
      toast.error("Please check the code and try again.");
    }
  };

  // STEP 3: Password Reset
  const handlePasswordReset = async (data: ForgotPasswordFormData) => {
    try {
      // await axios.post("/reset-password", { email, password: data.password });
      toast.success("Password Updated", {
        description: "You can now log in with your new password.",
      });
    } catch (err) {
      toast.error("Password reset failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      {step === "email" && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleEmailSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Send Reset Link</Button>
          </form>
        </Form>
      )}

      {step === "otp" && (
        <>
          <div className="mb-4 text-center">
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
              <CircleCheck className="w-4 h-4 text-green-500" />
              Verification code sent to
            </p>
            <p className="text-sm text-muted-foreground font-semibold">
              {email}
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleOtpSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter OTP</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          {[...Array(6)].map((_, i) => (
                            <InputOTPSlot key={i} index={i} />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Verify OTP</Button>
            </form>
          </Form>
        </>
      )}

      {step === "reset" && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handlePasswordReset)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Reset Password</Button>
          </form>
        </Form>
      )}
    </div>
  );
}
