import React from "react";
import Header from "./layout/Header";
import HeroSection from "./sections/HeroSection";
import MinistryGrid from "./sections/MinistryGrid";
import EventCalendar from "./sections/EventCalendar";
import Footer from "./layout/Footer";

interface HomeProps {
  churchName?: string;
  welcomeMessage?: string;
  welcomeSubtitle?: string;
}

const Home = ({
  churchName = "Grace Protestant Church",
  welcomeMessage = "Welcome to Our Church",
  welcomeSubtitle = "A place of worship, community, and spiritual growth",
}: HomeProps) => {
  return (
    <div>
      <HeroSection
        title={welcomeMessage}
        subtitle={welcomeSubtitle}
        backgroundImage="https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&q=80"
        ctaText="Join Us This Sunday"
        onCtaClick={() => console.log("CTA clicked")}
      />

      <MinistryGrid />

      <div className="py-16 bg-gray-50">
        <EventCalendar />
      </div>

      <Footer
        churchName={churchName}
        address="123 Faith Street, Cityville, ST 12345"
        phone="(555) 123-4567"
        email="contact@graceprotestant.church"
        serviceTimes={[
          { day: "Sunday", time: "9:00 AM & 11:00 AM" },
          { day: "Wednesday", time: "7:00 PM" },
        ]}
        socialLinks={{
          facebook: "https://facebook.com/graceprotestant",
          instagram: "https://instagram.com/graceprotestant",
          youtube: "https://youtube.com/graceprotestant",
        }}
      />
    </div>
  );
};

export default Home;
