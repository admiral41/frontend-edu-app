"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/constants/data";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-sm shadow-md"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative h-10 w-10 md:h-12 md:w-12 group-hover:scale-110 transition-transform">
              <Image
                src="/images/padhaihub_logo.png"
                alt="PadhaiHub Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className={cn(
              "text-xl md:text-2xl font-bold transition-colors",
              isScrolled ? "text-foreground" : "text-white"
            )}>PadhaiHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={cn(
                  "text-sm font-semibold transition-colors relative group",
                  isScrolled
                    ? "text-foreground hover:text-primary"
                    : "text-white hover:text-white/90"
                )}
              >
                {link.label}
                <span className={cn(
                  "absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full",
                  isScrolled ? "bg-primary" : "bg-white"
                )} />
              </button>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button
                variant="outline"
                className={cn(
                  "transition-all",
                  !isScrolled && "bg-transparent border-white/40 text-white hover:bg-white/20 hover:border-white/60"
                )}
              >
                Login
              </Button>
            </Link>
            <Link href="/student-registration">
              <Button
                className={cn(
                  "transition-all",
                  isScrolled
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-primary text-white hover:bg-primary/90"
                )}
              >
                Sign Up
              </Button>
            </Link>
            <Link href="/instructor-application">
              <Button
                className={cn(
                  "transition-all",
                  !isScrolled && "bg-white text-primary hover:bg-white/90"
                )}
              >
                Become a Teacher
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "md:hidden p-2 rounded-md transition-colors",
              isScrolled ? "hover:bg-accent" : "hover:bg-white/10"
            )}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className={cn("h-6 w-6", isScrolled ? "text-foreground" : "text-white")} />
            ) : (
              <Menu className={cn("h-6 w-6", isScrolled ? "text-foreground" : "text-white")} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className={cn(
            "md:hidden py-4 border-t",
            isScrolled ? "bg-background/95" : "bg-white/10 backdrop-blur-md border-white/20"
          )}>
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={cn(
                    "text-left px-4 py-2 rounded-md transition-colors font-medium",
                    isScrolled
                      ? "hover:bg-accent text-foreground"
                      : "hover:bg-white/20 text-white"
                  )}
                >
                  {link.label}
                </button>
              ))}
              <div className={cn(
                "flex flex-col gap-2 px-4 pt-4 border-t",
                isScrolled ? "" : "border-white/20"
              )}>
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full",
                      !isScrolled && "bg-transparent border-white/40 text-white hover:bg-white/20"
                    )}
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/student-registration" onClick={() => setIsOpen(false)}>
                  <Button
                    className={cn(
                      "w-full",
                      isScrolled
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-primary text-white hover:bg-primary/90"
                    )}
                  >
                    Sign Up
                  </Button>
                </Link>
                <Link href="/instructor-application" onClick={() => setIsOpen(false)}>
                  <Button
                    className={cn(
                      "w-full",
                      !isScrolled && "bg-white text-primary hover:bg-white/90"
                    )}
                  >
                    Become a Teacher
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
