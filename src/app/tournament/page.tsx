"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/Container";
import Image from 'next/image'

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
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#ED2939] mb-4">
          Empire Cash Prize V1 Tournament
        </h1>
        <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto px-4">
          Join us for the Empire Cash Prize V1 Tournament! Compete for glory, cash prizes, and more.
          This two-day event will feature the best teams from the region. Are you ready?
        </p>
      </div>

      {/* Image container with responsive flex direction */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 mb-8 md:mb-12">
        {/* First image with responsive sizing */}
        <div className="w-full md:w-auto">
          <Image
            src="/img/IMG_3877.jpg"
            alt="Tournament Banner 1"
            className="rounded-lg shadow-md w-full"
            width={400}
            height={400}
            priority
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
        
        {/* Second image with responsive sizing */}
        <div className="w-full md:w-auto">
          <Image
            src="/img/8CF8F643-7272-4EE1-912D-3CBD73D9DBF5.jpg"
            alt="Tournament Banner 2"
            className="rounded-lg shadow-md w-full"
            width={350}
            height={400}
            sizes="(max-width: 768px) 100vw, 350px"
          />
        </div>
      </div>

      {/* Registration section */}
      <div className="text-center px-4">
        <button
          onClick={handleRegisterClick}
          className="w-full md:w-auto px-6 py-3 bg-[#ED2939] text-white font-semibold rounded-md hover:bg-[#C62631] transition duration-200"
        >
          Register Your Team
        </button>
       
        {!session && status !== "loading" && (
          <p className="mt-4 text-sm text-gray-600">
            You need to be logged in to register your team.
          </p>
        )}
       
        {status === "loading" && (
          <p className="mt-4 text-sm text-gray-600">
            Loading...
          </p>
        )}
      </div>
    </Container>
  );
};

export default TournamentInfoPage;