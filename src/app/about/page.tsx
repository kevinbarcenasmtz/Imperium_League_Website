import { Container } from "@/components/Container";
import { FaFutbol, FaUsers, FaMapMarkerAlt, FaHandshake } from "react-icons/fa";
import Image from "next/image";
import landscapePhoto from "../../../public/pickup_photos/IMG_3957.jpg";

export default function AboutUs() {
  return (
    <Container className="py-12">
      {/* Welcome Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-[#ED2939] mb-4">
          WELCOME TO EMPIRE FOOTBALL LEAGUE
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto mb-8 dark:text-white">
          Where Passion Meets Play: Your Premier Destination for Soccer Leagues.
          At Empire Football League, we’re more than just a soccer league – we’re a vibrant
          community of passionate players dedicated to the beautiful game. With a focus on
          fostering camaraderie, competition, and fun, we offer leagues for all ages and skill
          levels.
        </p>
        {/* Landscape Photo */}
        <div className="relative w-full h-72 lg:h-96 max-w-5xl mx-auto rounded-lg overflow-hidden shadow-lg">
          <Image
            src={landscapePhoto} // Replace with your landscape image
            alt="Soccer field with players"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </section>
      {/* Our Mission Section */}
      <section className="bg-gray-100 p-8 rounded-lg shadow-md mb-16">
        <h2 className="text-4xl font-semibold text-center text-gray-800 mb-6">
          OUR MISSION
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
          Uniting communities through the love of soccer. Whether you’re an experienced player or new to the game, our leagues welcome everyone. Soccer has the unique power to connect people, and we’re committed to fostering a friendly environment where players can enjoy the sport and build lasting connections.
        </p>
      </section>

      {/* What Sets Us Apart */}
      <section className="mb-16">
        <h2 className="text-4xl font-semibold text-center text-gray-800 mb-10 dark:text-white">
          UNLOCK YOUR SOCCER SKILLS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center">
            <FaUsers className="text-6xl text-[#ED2939] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Diverse Leagues</h3>
            <p className="text-gray-700 dark:text-white">
              From recreational to competitive, co-ed to gender-specific, our leagues cater to
              various preferences and playing styles.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center">
            <FaMapMarkerAlt className="text-6xl text-[#ED2939] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Top-Notch Facilities</h3>
            <p className="text-gray-700 dark:text-white">
              We meticulously select premier playing fields to ensure a quality experience for all participants.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center">
            <FaFutbol className="text-6xl text-[#ED2939] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Passionate Community</h3>
            <p className="text-gray-700 dark:text-white">
              Become part of a tight-knit community of soccer enthusiasts who share your love for the game.
            </p>
          </div>
          {/* Feature 4 */}
          <div className="flex flex-col items-center text-center">
            <FaHandshake className="text-6xl text-[#ED2939] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Professionalism</h3>
            <p className="text-gray-700 dark:text-white">
              With organized schedules, experienced referees, and transparent communication, we deliver a professional soccer experience.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="text-center bg-[#FAD4D8] p-8 rounded-lg shadow-md">
        <h2 className="text-4xl font-semibold text-gray-900 mb-6">HOW IT WORKS</h2>
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8">
          Signing up is easy! Simply head to our registration page, choose your preferred league,
          and follow the prompts to secure your spot on the field. Whether you’re joining as an
          individual or a team, we’ll make sure you’re ready to hit the ground running.
        </p>
        {/* <button className="px-6 py-3 bg-[#ED2939] text-white font-bold rounded-lg hover:bg-[#C62631]">
          Register Now
        </button> */}
        <a
          href="/login" //this will lead to a join the league page
          rel="noopener"
          className="px-6 py-3 bg-[#ED2939] text-white font-bold rounded-lg hover:bg-[#C62631]">
          Register Now
        </a>
      </section>
    </Container>
  );
}
