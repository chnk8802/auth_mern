import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { loginFailure, loginStart, loginSuccess } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { loginUser } from "../api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { toast } from "sonner";
import { Loading } from "@/components/common/Loading";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loading = useAppSelector((state) => state.auth.loading.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const user = await loginUser({ email, password });
      if (!user || !user.data || user.data.length === 0) {
        throw new Error("Login failed. Please try again.");
      }

      const userData = user.data[0];
      if (!userData) {
        throw new Error("Login failed. Please try again.");
      }
      dispatch(loginSuccess(userData));
      toast.success("Login Successful");
      navigate(ROUTES.DASHBOARD);
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
      dispatch(loginFailure(message));
    }
  };
  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              to={ROUTES.GUEST_PATHS.FORGOT_PASSWORD}
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            required
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loading size="sm"/> : "Login"}
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link
          to={ROUTES.GUEST_PATHS.REGISTER}
          className="underline underline-offset-4"
        >
          Sign up
        </Link>
      </div>
    </form>
  );
}
