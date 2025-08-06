"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RoleSwitcher from "@/components/ui/RoleSwitcher";
import Modal from "@/components/ui/Modal";
import { users } from "@/lib/mockData";
import { useMainLoader } from "@/components/ui/MainLoader";

export default function LoginPage() {
  const [role, setRole] = useState("parent");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: 'error' | 'success' | 'warning' | 'info';
  }>({ isOpen: false, title: '', message: '', type: 'info' });
  const router = useRouter();
  const { showLoader, hideLoader } = useMainLoader();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!username || !password) {
      setModal({
        isOpen: true,
        title: 'Validation Error',
        message: 'Please enter both username and password to continue.',
        type: 'warning'
      });
      return;
    }

    setIsLoading(true);
    showLoader(); // Show main loader

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user by username and role match
      const user = Object.values(users).find(
        (u: { username: string; role: string }) => u.username === username && u.role === role
      );
      
      if (user || (username && password)) {
        // Store user info in session
        const userData = user || { role, username, name: username };
        sessionStorage.setItem("userRole", userData.role);
        sessionStorage.setItem("username", userData.username);
        sessionStorage.setItem("userName", userData.name || username);
        
        // Show success message
        setModal({
          isOpen: true,
          title: 'Login Successful',
          message: `Welcome back, ${userData.name || username}! Redirecting to your dashboard...`,
          type: 'success'
        });
        
        // Redirect to dashboard after a short delay
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } else {
        setModal({
          isOpen: true,
          title: 'Login Failed',
          message: 'Invalid username or password. Please check your credentials and try again.',
          type: 'error'
        });
      }
    } catch {
      setModal({
        isOpen: true,
        title: 'Connection Error',
        message: 'Unable to connect to the server. Please check your internet connection and try again.',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
      hideLoader(); // Hide main loader
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
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
            
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                "Sign In"
              )}
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
      
      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />
    </div>
  );
}