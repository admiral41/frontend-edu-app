"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GraduationCap, Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, Clock } from "lucide-react";
import { footerLinks, socialLinks, contactInfo } from "@/lib/constants/data";
import { useState } from "react";

const socialIconMap = {
  Facebook: Facebook,
  Twitter: Twitter,
  Instagram: Instagram,
  Linkedin: Linkedin,
  Youtube: Youtube,
};

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <footer id="contact" className="bg-secondary/10 border-t">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg group-hover:scale-110 transition-transform">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold">PadhaiHub</span>
            </Link>
            <p className="text-muted-foreground max-w-sm">
              Empowering SEE and +2 students across Nepal with quality education and expert guidance to achieve their academic goals.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = socialIconMap[social.icon];
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    className="p-2 rounded-full bg-background hover:bg-primary hover:text-primary-foreground transition-all"
                    aria-label={social.platform}
                  >
                    {Icon && <Icon className="h-5 w-5" />}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info & Newsletter */}
        <div className="grid md:grid-cols-2 gap-8 py-8 border-t border-b">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 mt-0.5 text-primary" />
                <span>{contactInfo.address}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-5 w-5 text-primary" />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-primary transition-colors">
                  {contactInfo.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-5 w-5 text-primary" />
                <div className="space-y-1">
                  <div>{contactInfo.phone}</div>
                  <div>{contactInfo.mobile}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Clock className="h-5 w-5 text-primary" />
                <span>{contactInfo.hours}</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Subscribe to Our Newsletter</h3>
            <p className="text-muted-foreground">
              Get the latest updates on courses, offers, and educational tips delivered to your inbox
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-muted-foreground mt-8">
          <p>© {new Date().getFullYear()} PadhaiHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}