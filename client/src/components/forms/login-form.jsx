import { GalleryVerticalEnd, Loader, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "@/lib/axios";
import { toast } from "sonner";

export function LoginForm({ className, ...props }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoading = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user.id);

      setTimeout(() => {
        navigate("/");
      }, 100);
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "An error occurred while signing in"
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
            Don&apos;t have an account?{" "}
            <Link to="/auth/sign-up" className="underline">
              Sign up
            </Link>
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            className={"mt-2"}
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
            className={"mt-2"}
            disabled={loading}
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="animate-spin size-4" /> : <>Login</>}
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
