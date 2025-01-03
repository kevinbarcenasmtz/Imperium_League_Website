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
        <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto px-2 sm:px-4">
          Join us for the Empire Cash Prize V1 Tournament! Compete for glory, cash prizes, and more.
          This two-day event will feature the best teams from the region. Are you ready?
        </p>
      </div>

      {/* Image container */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 mb-8 md:mb-12">
        {/* First image */}
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

        {/* Second image */}
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
          <p className="mt-3 text-xs sm:text-sm text-gray-600">
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