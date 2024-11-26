import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { SectionTitle } from "@/components/SectionTitle";
import { Benefits } from "@/components/Benefits";
import { Video } from "@/components/Video";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { Cta } from "@/components/Cta";

import { benefitOne, benefitTwo } from "@/components/data";
export default function Home() {
  return (
    <Container>
      <Hero />

      {/* New Soccer League Section */}

      <SectionTitle
        preTitle="Why Join Empire Football League?"
        title="Why should you join this league"
      >
      </SectionTitle>
      <div className="grid gap-10 mt-10 md:grid-cols-3">
          <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Competitive Matches
            </h3>
            <p className="mt-3 text-gray-500 dark:text-gray-300">
              Experience weekly games with teams of all skill levels. Compete for the championship while building camaraderie.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Community Engagement
            </h3>
            <p className="mt-3 text-gray-500 dark:text-gray-300">
              Be part of a league that values community outreach. Participate in local events and support soccer initiatives.
            </p>
          </div>
        <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            Player Spotlights
          </h3>
          <p className="mt-3 text-gray-500 dark:text-gray-300">
            Get recognized for your achievements on and off the field with monthly player spotlights and awards.
          </p>
        </div>
      </div>

      {/* Benefits */}
      <Benefits data={benefitOne} />
      <Benefits imgPos="right" data={benefitTwo} />


      {/* Video */}
      <SectionTitle
        preTitle="Experience the Action"
        title="See the Thrill of Gameplay at Empire League"
      >
        Our courts come alive with energy and excitement! Watch this highlight reel showcasing competitive games, teamwork, and the passion of players at our venue. Feel the adrenaline and imagine yourself on the field!
      </SectionTitle>

      <Video videoSrc="/videos/img_04.mp4" />


      {/* <SectionTitle
        preTitle="Testimonials"
        title="Here's what our customers said"
      >
        Testimonials is a great way to increase the brand trust and awareness.
        Use this section to highlight your popular customers.
      </SectionTitle> */}

      {/* <Testimonials /> */}

      <SectionTitle preTitle="FAQ" title="Frequently Asked Questions">
        {/* Answer your customers possible questions here, it will increase the
        conversion rate as well as support or chat requests. */}
      </SectionTitle>

      <Faq />
      {/* <Cta /> */}



    </Container>
  );
}
