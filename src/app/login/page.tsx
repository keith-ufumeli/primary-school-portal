"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RoleSwitcher from "@/components/ui/RoleSwitcher";
import { users } from "@/lib/mockData";

export default function LoginPage() {
  const [role, setRole] = useState("parent");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Simple demo authentication
    const user = Object.values(users).find(
      (u: any) => u.username === username || u.role === role
    );
    
    if (user) {
      sessionStorage.setItem("userRole", user.role);
      sessionStorage.setItem("username", user.username);
      router.push("/dashboard");
    } else {
      // Fallback to selected role with default user
      sessionStorage.setItem("userRole", role);
      router.push("/dashboard");
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mb-4" />
          <CardTitle className="text-2xl">School Portal Login</CardTitle>
          <p className="text-gray-600">Access your school account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label>Login As</Label>
              <RoleSwitcher role={role} setRole={setRole} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Sign In
            </Button>
            
            <div className="text-center text-sm text-gray-600">
              <p>Demo credentials: any username/password</p>
              <p>Role determines dashboard content</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}