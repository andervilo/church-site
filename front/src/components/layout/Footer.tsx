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
  churchName = "Igreja Evangélica",
  address = "Rua da Igreja, 123 - Centro",
  phone = "(11) 1234-5678",
  email = "contato@igreja.com",
  serviceTimes = [
    { day: "Domingo", time: "09:00 & 11:00" },
    { day: "Quarta-feira", time: "19:00" },
  ],
  socialLinks = {},
}: FooterProps) => {
  return (
    <footer className="w-full bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Informações de Contato */}
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

          {/* Horários dos Cultos */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Horários dos Cultos</h3>
            <div className="space-y-2">
              {serviceTimes.map((service, index) => (
                <div key={index} className="flex justify-between">
                  <span>{service.day}</span>
                  <span>{service.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Redes Sociais */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Conecte-se Conosco</h3>
            <div className="flex gap-4">
              {socialLinks.facebook && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => window.open(socialLinks.facebook, "_blank")}
                >
                  <Facebook className="h-5 w-5" />
                </Button>
              )}
              {socialLinks.instagram && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => window.open(socialLinks.instagram, "_blank")}
                >
                  <Instagram className="h-5 w-5" />
                </Button>
              )}
              {socialLinks.youtube && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => window.open(socialLinks.youtube, "_blank")}
                >
                  <Youtube className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-slate-700" />

        <div className="text-center text-sm text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} {churchName}. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
