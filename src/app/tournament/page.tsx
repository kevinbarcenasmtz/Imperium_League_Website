"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/Container";
import Image from 'next/image';

const TournamentInfoPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleRegisterClick = () => {
    if (!session) {
      const returnUrl = encodeURIComponent('/tournament/register');
      router.push(`/login?callbackUrl=${returnUrl}`);
    } else {
      router.push('/tournament/register');
    }
  };

  return (
    <Container className="py-6 md:py-12 px-4 md:px-6">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#ED2939] mb-3 md:mb-4">
          Empire Cash Prize V1 Tournament
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto px-2 sm:px-4 dark:text-white">
          Join us for the first ever Empire Cash Prize V1 Tournament in South Austin! Compete for glory, cash prizes, and the prestigious Empire trophy.
          This exciting event will showcase the best teams from the region competing for a $700 cash prize.
        </p>
      </div>

      {/* Tournament Details Section */}
      <div className="max-w-3xl mx-auto mb-8 md:mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center dark:text-white">
          Tournament Format & Details
        </h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-[#ED2939] mb-2">Format</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 10 teams total</li>
                <li>• Two groups (5 teams per group)</li>
                <li>• 5v5 format (including keeper)</li>
                <li>• 10 player limit per team</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[#ED2939] mb-2">Location & Prizes</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Venue: Onion Creek Metropolitan Park</li>
                <li>• First Place: $700 cash prize</li>
                <li>• Exclusive Empire Trophy for winners</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Game Rules Section */}
      <div className="max-w-3xl mx-auto mb-8 md:mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center dark:text-white">
          Official Game Rules
        </h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-[#ED2939] mb-2">Match Rules</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Kick-ins for all play resets</li>
                <li>• Corners and goal kicks are valid</li>
                <li>• No slide tackles allowed</li>
                <li>• Direct free kicks for fouls</li>
                <li>• 5-minute break between halves</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[#ED2939] mb-2">Substitution Rules</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Unlimited substitutions allowed</li>
                <li>• Substitutions only when ball is out of play</li>
                <li>• Must notify referee before substituting</li>
                <li>• Players must enter/exit at halfway line</li>
              </ul>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold text-[#ED2939] mb-2">Additional Regulations</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• All players must wear shin guards</li>
              <li>• No metal cleats allowed</li>
              <li>• Teams must wear matching uniforms</li>
              <li>• Minimum 3 players needed to start match</li>
              <li>• Yellow card = 2-minute suspension</li>
              <li>• Red card = player ejection and one-game suspension</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Image container */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 mb-8 md:mb-12">
        <div className="w-full sm:w-auto max-w-[400px]">
          <Image
            src="/img/IMG_3877.jpg"
            alt="Tournament Banner 1"
            width={400}
            height={400}
            priority
            className="rounded-lg shadow-md w-full h-auto object-cover"
          />
        </div>
        <div className="w-full sm:w-auto max-w-[350px]">
          <Image
            src="/img/8CF8F643-7272-4EE1-912D-3CBD73D9DBF5.jpg"
            alt="Tournament Banner 2"
            width={350}
            height={400}
            className="rounded-lg shadow-md w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Registration section */}
      <div className="text-center px-2 sm:px-4">
        <button
          onClick={handleRegisterClick}
          className="w-full sm:w-auto px-6 py-3 bg-[#ED2939] text-white font-semibold rounded-md hover:bg-[#C62631] transition duration-200 text-sm sm:text-base"
        >
          Register Your Team
        </button>
        {!session && status !== "loading" && (
          <p className="mt-3 text-xs sm:text-sm text-gray-600 dark:text-white">
            You need to be logged in to register your team.
          </p>
        )}
        {status === "loading" && (
          <p className="mt-3 text-xs sm:text-sm text-gray-600">
            Loading...
          </p>
        )}
      </div>
    </Container>
  );
};

export default TournamentInfoPage;