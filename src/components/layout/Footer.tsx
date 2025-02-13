import React from "react";
import {
  Facebook,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

interface FooterProps {
  churchName?: string;
  address?: string;
  phone?: string;
  email?: string;
  serviceTimes?: Array<{ day: string; time: string }>;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
}

const Footer = ({
  churchName = "Grace Protestant Church",
  address = "123 Faith Street, Cityville, ST 12345",
  phone = "(555) 123-4567",
  email = "contact@graceprotestant.church",
  serviceTimes = [
    { day: "Sunday", time: "9:00 AM & 11:00 AM" },
    { day: "Wednesday", time: "7:00 PM" },
  ],
  socialLinks = {
    facebook: "https://facebook.com/graceprotestant",
    instagram: "https://instagram.com/graceprotestant",
    youtube: "https://youtube.com/graceprotestant",
  },
}: FooterProps) => {
  return (
    <footer className="w-full bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">{churchName}</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-400" />
                <p>{address}</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-blue-400" />
                <p>{phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-400" />
                <p>{email}</p>
              </div>
            </div>
          </div>

          {/* Service Times */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Service Times</h3>
            <div className="space-y-2">
              {serviceTimes.map((service, index) => (
                <div key={index} className="flex justify-between">
                  <span>{service.day}</span>
                  <span>{service.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Connect With Us</h3>
            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.open(socialLinks.facebook, "_blank")}
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.open(socialLinks.instagram, "_blank")}
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.open(socialLinks.youtube, "_blank")}
              >
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-slate-700" />

        <div className="text-center text-sm text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} {churchName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
