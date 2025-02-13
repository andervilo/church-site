import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

interface MinistryCardProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  onClick?: () => void;
}

const MinistryCard = ({
  title = "Youth Ministry",
  description = "A vibrant community for young people to grow in faith and fellowship together.",
  imageUrl = "https://images.unsplash.com/photo-1523803326055-9729b9e02e5a?auto=format&fit=crop&q=80",
  onClick = () => console.log("Ministry card clicked"),
}: MinistryCardProps) => {
  return (
    <Card className="w-[380px] h-[220px] overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
      <div className="relative h-full">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 z-10" />

        <div className="relative z-20 h-full flex flex-col justify-end p-6">
          <CardHeader className="p-0 space-y-1">
            <CardTitle className="text-xl font-bold text-white">
              {title}
            </CardTitle>
            <CardDescription className="text-gray-200">
              {description}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0 mt-4">
            <Button
              variant="secondary"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={onClick}
            >
              Saiba Mais
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

export default MinistryCard;
