import Link from "next/link";
import { Container } from "@/components/Container";
import Image from "next/image";

interface Post {
  id: number;
  title: string;
  summary: string;
  image: string;
  slug: string;
}

const blogPosts: Post[] = [
  {
    id: 1,
    title: "The Future of Football Leagues",
    summary:
      "Football leagues are constantly evolving. Here we explore the next big trends...",
    image: "/pickup_photos/blog1.jpg",
    slug: "the-future-of-football-leagues",
  },
  {
    id: 2,
    title: "Why Football Teams Should Invest in Youth Development",
    summary:
      "Youth development is key to building a strong future for your football club...",
    image: "/pickup_photos/blog2.jpg",
    slug: "why-football-teams-should-invest-in-youth-development",
  },
  {
    id: 3,
    title: "Top 5 Football Matches to Watch This Season",
    summary:
      "Looking for exciting matches to watch? Check out our top picks for this season...",
    image: "/pickup_photos/blog3.jpg",
    slug: "top-5-football-matches-to-watch-this-season",
  },
];

export default function BlogPage() {
  return (
    <Container className="py-12 relative min-h-[50vh]">
      {/* Coming Soon Overlay */}
      <div className="absolute inset-0 overflow-hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm z-10 flex flex-col items-center justify-start pt-20 sm:justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#ED2939] mb-6 animate-pulse">
          Coming Soon
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          We&apos;re working hard to bring you exciting football news and insights. Stay tuned!
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-[#ED2939] text-white font-semibold rounded-md hover:bg-[#C62631] transition duration-200"
        >
          Return Home
        </Link>
      </div>
    </Container>
  );
}