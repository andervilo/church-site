import React from "react";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Phone } from "lucide-react";

interface HeaderProps {
  logo?: string;
  onContactClick?: () => void;
}

const Header = ({
  logo = "https://api.dicebear.com/7.x/initials/svg?seed=CP",
  onContactClick = () => console.log("Contact button clicked"),
}: HeaderProps) => {
  return (
    <header className="w-full h-20 bg-white/95 backdrop-blur-sm border-b border-gray-200 fixed top-0 left-0 z-50 shadow-sm">
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Church Logo" className="h-12 w-12" />
          <span className="ml-2 text-xl font-bold text-gray-900">
            Church Name
          </span>
        </div>

        {/* Navigation */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                href="/"
              >
                Início
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm font-medium text-gray-700 hover:text-gray-900">
                Sobre Nós
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[200px] p-2">
                  <NavigationMenuLink
                    className="block px-3 py-2 text-sm hover:bg-gray-100 rounded-md"
                    href="/historia"
                  >
                    Nossa História
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    className="block px-3 py-2 text-sm hover:bg-gray-100 rounded-md"
                    href="/visao"
                  >
                    Visão & Missão
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    className="block px-3 py-2 text-sm hover:bg-gray-100 rounded-md"
                    href="/equipe"
                  >
                    Equipe Pastoral
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                href="/eventos"
              >
                Eventos
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                href="/ministerios"
              >
                Ministérios
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Contact Button */}
        <Button
          onClick={onContactClick}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Phone className="mr-2 h-4 w-4" />
          Contact Us
        </Button>
      </div>
    </header>
  );
};

export default Header;
