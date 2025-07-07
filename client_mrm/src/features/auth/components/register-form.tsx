  import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { Combobox } from "@/components/common/Combobox";
import { registerUser } from "../api/authApi";
import { toast } from "sonner";

type RegisterFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
};

const roles = [
  { label: "Admin", value: "admin" },
  { label: "Manager", value: "manager" },
  { label: "Technician", value: "technician" }
];

export function RegisterForm({ className, ...props }: React.ComponentProps<"form">) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormValues>();
  const navigate = useNavigate();
  const onSubmit = async (data: RegisterFormValues) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Password and Confirm Password do not match");
      return;
    }

    const payload = {
      email: data.email,
      password: data.password,
      role: data.role,
    };
    // Check if role is selected
    if (!data.role) {
      toast.error("Please select a role");
      return;
    }
    const register = await registerUser(payload);
    console.log("Register payload:", register);
    if (!register) {
      toast.error("Registration failed. Please try again.");
      return;
    }
    toast.success("Registration successful! Please log in.");
    console.log("Registration successful:", register);
    setTimeout(() => {
      navigate(ROUTES.GUEST_PATHS.LOGIN);
    }, 50);
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Register</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to register
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@email.com"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
          />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>

        <div className="grid gap-3">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="grid gap-3">
          <Label htmlFor="role">Role</Label>
          <Combobox
            options={roles}
            value={watch("role")}
            onChange={(value) => setValue("role", value)}
            placeholder="Select a role"
          />
          {!watch("role") && (
            <p className="text-sm text-red-500">Please select your Role</p>
          )}
        </div>

        <Button type="submit" className="w-full">
          Register
        </Button>
      </div>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to={ROUTES.GUEST_PATHS.LOGIN} className="underline underline-offset-4">
          Log in
        </Link>
      </div>
    </form>
  );
}

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Link } from "react-router-dom";
// import { ROUTES } from "@/constants/routes";
// import { Combobox } from "@/components/common/Combobox";

// export function RegisterForm({
//   className,
//   ...props
// }: React.ComponentProps<"form">) {
//   return (
//     <form className={cn("flex flex-col gap-6", className)} {...props}>
//       <div className="flex flex-col items-center gap-2 text-center">
//         <h1 className="text-2xl font-bold">Register</h1>
//         <p className="text-muted-foreground text-sm text-balance">
//           Enter your email below to register
//         </p>
//       </div>
//       <div className="grid gap-6">
//         <div className="grid gap-3">
//           <Label htmlFor="email">Email</Label>
//           <Input id="email" type="email" placeholder="example@email.com" required />
//         </div>
//         <div className="grid gap-3">
//           <Label htmlFor="password">Password</Label>
//           <Input id="password" type="password" required />
//         </div>
//         <div className="grid gap-3">
//           <Label htmlFor="confirmPassword">Confirm Password</Label>
//           <Input id="confirmPassword" type="password" required />
//         </div>
//         <div className="grid gap-3">
//           <Label htmlFor="confirmPassword">Confirm Password</Label>
//           <Combobox value= required />
//         </div>
//         <Button type="submit" className="w-full">
//           Register
//         </Button>
//       </div>
//       <div className="text-center text-sm">
//         Already have an account?{" "}
//         <Link to={ROUTES.GUEST_PATHS.LOGIN} className="underline underline-offset-4">
//           Login up
//         </Link>
//       </div>
//     </form>
//   );
// }
