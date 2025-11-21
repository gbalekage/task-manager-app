import { GalleryVerticalEnd, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "@/lib/axios";
import { toast } from "sonner";

export function RegisterForm({ className, ...props }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleLoading = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/create-user", {
        name: form.name,
        email: form.email,
        password: form.password,
        password2: form.confirm_password,
      });

      toast.success("Account created now login");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while create account"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form className="space-y-5" onSubmit={handleLoading}>
        <div className="flex flex-col items-center gap-2 text-center">
          <Link to="/" className="flex flex-col items-center gap-2 font-medium">
            <div className="flex size-8 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-6" />
            </div>
            <span className="sr-only">Acme Inc.</span>
          </Link>
          <h1 className="text-xl font-bold">Welcome to Tasky</h1>
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/auth/sign-in" className="underline">
              Sign In
            </Link>
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            className="mt-2"
            value={form.name}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            className="mt-2"
            value={form.email}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            className="mt-2"
            value={form.password}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="confirm_password" className="text-sm font-medium">
            Confirm Password
          </label>
          <Input
            id="confirm_password"
            type="password"
            placeholder="Confirm Password"
            className="mt-2"
            value={form.confirm_password}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <Loader2 className="animate-spin size-4" />
          ) : (
            <>Register</>
          )}
        </Button>
      </form>

      <p className="px-6 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <Link to="#" className="underline hover:text-foreground">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link to="#" className="underline hover:text-foreground">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
