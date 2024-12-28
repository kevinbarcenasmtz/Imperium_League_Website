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
    <Container className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-[#ED2939] mb-4">
          Empire Cash Prize V1 Tournament
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
          Join us for the Empire Cash Prize V1 Tournament! Compete for glory, cash prizes, and more.
          This two-day event will feature the best teams from the region. Are you ready?
        </p>
      </div>

      <div className="flex justify-center items-center gap-8 mb-12">
        <Image 
          src="/img/IMG_3877.jpg"
          alt="Tournament Banner 1"
          className="rounded-lg shadow-md"
          width={400}
          height={400}
        />
        <Image 
          src="/img/8CF8F643-7272-4EE1-912D-3CBD73D9DBF5.jpg"
          alt="Tournament Banner 2"
          className="rounded-lg shadow-md"
          width={350}
          height={400}
        />
      </div>

      <div className="text-center">
        <button
          onClick={handleRegisterClick}
          className="px-6 py-3 bg-[#ED2939] text-white font-semibold rounded-md hover:bg-[#C62631] transition duration-200"
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