import React from "react";
import { useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Calendar, Users, Clock, MapPin } from "lucide-react";

const ministryData = {
  jovens: {
    title: "Youth Ministry",
    description:
      "A vibrant community for young people to grow in faith and fellowship together.",
    imageUrl:
      "https://images.unsplash.com/photo-1523803326055-9729b9e02e5a?auto=format&fit=crop&q=80",
    meetingTime: "Every Friday at 7:00 PM",
    location: "Youth Center",
    ageGroup: "13-18 years",
    activities: [
      "Bible Study",
      "Worship Nights",
      "Social Events",
      "Service Projects",
    ],
  },
  criancas: {
    title: "Children's Ministry",
    description:
      "Nurturing young hearts and minds in the love of Christ through fun and engaging activities.",
    imageUrl:
      "https://images.unsplash.com/photo-1602008672365-1e4f1e12c3a6?auto=format&fit=crop&q=80",
    meetingTime: "Sundays at 9:30 AM",
    location: "Children's Wing",
    ageGroup: "3-12 years",
    activities: ["Sunday School", "VBS", "Children's Choir", "Family Events"],
  },
  casais: {
    title: "Couples Ministry",
    description:
      "Supporting and strengthening marriages through fellowship and Biblical teaching.",
    imageUrl:
      "https://images.unsplash.com/photo-1529634597503-139d3726fed5?auto=format&fit=crop&q=80",
    meetingTime: "First Saturday of each month at 6:00 PM",
    location: "Fellowship Hall",
    ageGroup: "All married couples",
    activities: [
      "Marriage Workshops",
      "Date Nights",
      "Couple's Retreats",
      "Small Groups",
    ],
  },
  mulheres: {
    title: "Women's Ministry",
    description:
      "Empowering women through prayer, study, and community support.",
    imageUrl:
      "https://images.unsplash.com/photo-1609234656388-0ff363383899?auto=format&fit=crop&q=80",
    meetingTime: "Wednesdays at 10:00 AM",
    location: "Room 201",
    ageGroup: "Adult women",
    activities: [
      "Bible Study",
      "Prayer Groups",
      "Women's Retreats",
      "Service Projects",
    ],
  },
  homens: {
    title: "Men's Ministry",
    description:
      "Building strong Christian men through fellowship and discipleship.",
    imageUrl:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80",
    meetingTime: "Saturdays at 8:00 AM",
    location: "Fellowship Hall",
    ageGroup: "Adult men",
    activities: [
      "Bible Study",
      "Breakfast Fellowship",
      "Men's Retreats",
      "Service Projects",
    ],
  },
  louvor: {
    title: "Music Ministry",
    description:
      "Praising God through music and leading the congregation in worship.",
    imageUrl:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80",
    meetingTime: "Thursday at 7:00 PM",
    location: "Sanctuary",
    ageGroup: "All ages",
    activities: ["Choir", "Worship Band", "Orchestra", "Children's Choir"],
  },
};

const MinistryDetails = () => {
  const { id } = useParams();
  const ministry = ministryData[id as keyof typeof ministryData];

  if (!ministry) {
    return <div>Ministry not found</div>;
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12">
      <div className="relative h-[400px] rounded-xl overflow-hidden mb-12">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${ministry.imageUrl})` }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">{ministry.title}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
        <div>
          <h2 className="text-3xl font-bold mb-6">About This Ministry</h2>
          <p className="text-lg text-gray-700 mb-8">{ministry.description}</p>

          <h3 className="text-2xl font-bold mb-4">Activities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {ministry.activities.map((activity, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                {activity}
              </div>
            ))}
          </div>

          <Button size="lg" className="w-full md:w-auto">
            Join This Ministry
          </Button>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold mb-4">Ministry Details</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gray-600" />
                <span>{ministry.meetingTime}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gray-600" />
                <span>{ministry.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-gray-600" />
                <span>{ministry.ageGroup}</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
            <h3 className="text-xl font-bold mb-4">Get Involved</h3>
            <p className="text-gray-700 mb-4">
              Interested in joining or learning more about this ministry?
            </p>
            <Button variant="outline" className="w-full">
              Contact Ministry Leader
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinistryDetails;
