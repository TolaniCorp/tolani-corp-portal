import { Hero } from "../components/Hero";
import { CommandSurfaces } from "../components/CommandSurfaces";
import { LiveAnnouncements } from "../components/LiveAnnouncements";
import { Portfolio } from "../components/Portfolio";
import { PurchaseChannelsSection } from "../components/PurchaseChannels";
import { getLiveAnnouncements } from "../lib/live-announcements";
import { featuredPurchaseChannels } from "../lib/portfolioStrategy";

export default async function Home() {
  const announcements = await getLiveAnnouncements(3);

  return (
    <>
      <Hero />
      <CommandSurfaces />
      <section className="bg-white px-6 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <LiveAnnouncements announcements={announcements} />
        </div>
      </section>
      <section className="bg-[linear-gradient(180deg,#ffffff,#f8fafc_40%,#eef2ff_100%)] px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <PurchaseChannelsSection
            id="purchase-channels"
            title="Current buy-now and operator-entry routes"
            description="These are the active purchase channels across the Tolani portfolio right now. They are direct site, consultation, or operator-routed paths. None of these public routes requires a crypto wallet."
            channels={featuredPurchaseChannels}
          />
        </div>
      </section>
      <Portfolio />
    </>
  );
}
