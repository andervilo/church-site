import React from "react";
import MinistryCard from "../cards/MinistryCard";

interface Ministry {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface MinistryGridProps {
  ministries?: Ministry[];
}

const MinistryGrid = ({
  ministries = [
    {
      id: "1",
      title: "Youth Ministry",
      description:
        "A vibrant community for young people to grow in faith and fellowship together.",
      imageUrl:
        "https://images.unsplash.com/photo-1523803326055-9729b9e02e5a?auto=format&fit=crop&q=80",
    },
    {
      id: "2",
      title: "Children's Ministry",
      description:
        "Nurturing young hearts and minds in the love of Christ through fun and engaging activities.",
      imageUrl:
        "https://images.unsplash.com/photo-1602008672365-1e4f1e12c3a6?auto=format&fit=crop&q=80",
    },
    {
      id: "3",
      title: "Couples Ministry",
      description:
        "Supporting and strengthening marriages through fellowship and Biblical teaching.",
      imageUrl:
        "https://images.unsplash.com/photo-1529634597503-139d3726fed5?auto=format&fit=crop&q=80",
    },
    {
      id: "4",
      title: "Women's Ministry",
      description:
        "Empowering women through prayer, study, and community support.",
      imageUrl:
        "https://images.unsplash.com/photo-1609234656388-0ff363383899?auto=format&fit=crop&q=80",
    },
    {
      id: "5",
      title: "Men's Ministry",
      description:
        "Building strong Christian men through fellowship and discipleship.",
      imageUrl:
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80",
    },
    {
      id: "6",
      title: "Music Ministry",
      description:
        "Praising God through music and leading the congregation in worship.",
      imageUrl:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80",
    },
  ],
}: MinistryGridProps) => {
  return (
    <section className="w-full max-w-[1200px] mx-auto py-16 px-4 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Our Ministries
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover the various ways you can get involved and grow in your faith
          journey through our diverse ministry programs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {ministries.map((ministry) => (
          <MinistryCard
            key={ministry.id}
            title={ministry.title}
            description={ministry.description}
            imageUrl={ministry.imageUrl}
            onClick={() => {
              const slug = ministry.title
                .toLowerCase()
                .replace(/'s/g, "")
                .replace(/\s+/g, "-");
              window.location.href = `/ministerios/${ministry.id}`;
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default MinistryGrid;
