"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check } from "lucide-react";
import { inquiryBenefits } from "@/lib/constants/data";
import { useIntersectionObserver } from "@/lib/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";

export default function InquiryForm() {
  const [ref, isVisible] = useIntersectionObserver();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    level: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="inquiry" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start max-w-6xl mx-auto">
          {/* Benefits Section */}
          <div
            ref={ref}
            className={cn(
              "space-y-6 transition-all duration-700",
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            )}
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                Have Questions? Let's Talk!
              </h2>
              <p className="text-lg text-muted-foreground">
                Get in touch with our education counselors and find the perfect
                course for you
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">What You'll Get:</h3>
              <ul className="space-y-3">
                {inquiryBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 rounded-full bg-primary/10 p-1">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Decorative Card */}
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-1">
              <CardHeader>
                <CardTitle className="text-2xl">Quick Response</CardTitle>
                <CardDescription>
                  We typically respond within 2 hours during business hours
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Inquiry Form */}
          <Card
            className={cn(
              "transition-all duration-700",
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            )}
          >
            <CardHeader>
              <CardTitle className="text-2xl">Send Us Your Inquiry</CardTitle>
              <CardDescription>
                Fill out the form and we'll get back to you shortly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="98XXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    required
                  />
                </div>

                {/* Level */}
                <div className="space-y-2">
                  <Label htmlFor="level">Current Level *</Label>
                  <Select
                    value={formData.level}
                    onValueChange={(value) => handleChange("level", value)}
                  >
                    <SelectTrigger id="level">
                      <SelectValue placeholder="Select your level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="see">SEE (Class 10)</SelectItem>
                      <SelectItem value="plus2-science">+2 Science</SelectItem>
                      <SelectItem value="plus2-management">
                        +2 Management
                      </SelectItem>
                      <SelectItem value="plus2-humanities">
                        +2 Humanities
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your goals and what you're looking for..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                  />
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full" size="lg">
                  Submit Inquiry
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
