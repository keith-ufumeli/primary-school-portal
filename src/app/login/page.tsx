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
    
    // Find user by username and role match
    const user = Object.values(users).find(
      (u: any) => u.username === username && u.role === role
    );
    
    if (user || (username && password)) {
      // Store user info in session
      const userData = user || { role, username, name: username };
      sessionStorage.setItem("userRole", userData.role);
      sessionStorage.setItem("username", userData.username);
      sessionStorage.setItem("userName", userData.name || username);
      
      // Redirect to dashboard
      router.push("/dashboard");
    } else {
      alert("Please enter both username and password");
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto bg-blue-100 border-2 border-blue-300 rounded-xl w-20 h-20 mb-4 flex items-center justify-center">
            <div className="text-blue-600 text-2xl font-bold">📚</div>
          </div>
          <CardTitle className="text-2xl text-blue-800">Lorem Primary School</CardTitle>
          <p className="text-gray-600">Portal Login</p>
          <p className="text-sm text-blue-600 font-medium">Welcome to our school community</p>
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
            
            <div className="text-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              <p className="font-medium text-blue-700 mb-2">Demo Accounts:</p>
              <div className="text-xs space-y-1">
                <p><strong>Admin:</strong> admin@school.com</p>
                <p><strong>Teacher:</strong> teacher-01</p>
                <p><strong>Parent:</strong> parent-01</p>
                <p className="mt-2 text-gray-500">Password: any</p>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}