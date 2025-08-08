"use client";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  href?: string;
  label?: string;
  variant?: "default" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function BackButton({ 
  href, 
  label = "Back", 
  variant = "ghost",
  size = "sm",
  className = ""
}: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={`flex items-center gap-2 ${className}`}
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </Button>
  );
} 