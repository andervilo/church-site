import React from "react";
import HeroSection from "./sections/HeroSection";
import MinistryGrid from "./sections/MinistryGrid";
import EventCalendar from "./sections/EventCalendar";
import Footer from "./layout/Footer";
import { useSiteSettings } from "../hooks/useSiteSettings";

const Home = () => {
  const { settings } = useSiteSettings();

  const serviceTimes = settings.service_times?.map((s) => ({
    day: s.day,
    time: s.times.join(" & "),
  }));

  return (
    <div>
      <HeroSection
        title={`Bem-vindo à ${settings.church_name || "Nossa Igreja"}`}
        subtitle="Um lugar de adoração, comunidade e crescimento espiritual"
        backgroundImage="https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&q=80"
        ctaText="Venha nos Visitar"
      />

      <MinistryGrid />

      <div className="py-16 bg-gray-50">
        <EventCalendar />
      </div>

      <Footer
        churchName={settings.church_name}
        address={settings.address}
        phone={settings.phone}
        email={settings.email}
        serviceTimes={serviceTimes}
        socialLinks={settings.social_links}
      />
    </div>
  );
};

export default Home;
