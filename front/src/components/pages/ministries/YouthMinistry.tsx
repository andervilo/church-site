import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Clock, MapPin } from "lucide-react";

const YouthMinistry = () => {
  const ministry = {
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
    leaders: [
      {
        name: "Pastor Mike Johnson",
        role: "Youth Pastor",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      },
      {
        name: "Sarah Thompson",
        role: "Youth Coordinator",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      },
    ],
    upcomingEvents: [
      {
        title: "Youth Summer Camp",
        date: "July 15-20, 2024",
        description: "A week of fun, fellowship, and spiritual growth",
      },
      {
        title: "Friday Night Live",
        date: "Every Friday",
        description: "Weekly youth gathering with worship and activities",
      },
    ],
  };

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
          <h2 className="text-3xl font-bold mb-6">About Our Youth Ministry</h2>
          <p className="text-lg text-gray-700 mb-8">{ministry.description}</p>

          <h3 className="text-2xl font-bold mb-4">What We Do</h3>
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

          <h3 className="text-2xl font-bold mb-4">Our Leaders</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {ministry.leaders.map((leader, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h4 className="font-semibold">{leader.name}</h4>
                  <p className="text-gray-600">{leader.role}</p>
                </div>
              </div>
            ))}
          </div>

          <Button size="lg" className="w-full md:w-auto">
            Join Youth Ministry
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
            <h3 className="text-xl font-bold mb-4">Upcoming Events</h3>
            <div className="space-y-4">
              {ministry.upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  className="border-b border-blue-200 last:border-0 pb-4 last:pb-0"
                >
                  <h4 className="font-semibold">{event.title}</h4>
                  <p className="text-sm text-gray-600">{event.date}</p>
                  <p className="text-sm text-gray-700 mt-1">
                    {event.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 bg-green-50 rounded-xl border border-green-200">
            <h3 className="text-xl font-bold mb-4">Get Involved</h3>
            <p className="text-gray-700 mb-4">
              Want to join our youth ministry or have questions?
            </p>
            <Button variant="outline" className="w-full">
              Contact Youth Pastor
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouthMinistry;
