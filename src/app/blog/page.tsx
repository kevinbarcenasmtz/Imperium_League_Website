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
    <Container className="py-12 relative min-h-[70vh]">
      {/* Coming Soon Overlay */}
      <div className="absolute inset-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#ED2939] mb-6 animate-pulse">
          Coming Soon
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          We're working hard to bring you exciting football news and insights. Stay tuned!
        </p>
        <Link 
          href="/"
          className="px-6 py-3 bg-[#ED2939] text-white font-semibold rounded-md hover:bg-[#C62631] transition duration-200"
        >
          Return Home
        </Link>
      </div>

      {/* Original Content (hidden but preserved) */}
      <div className="opacity-0">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-[#ED2939] mb-4">Blog</h1>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Explore insights, stories, and updates from the world of football. Stay informed and inspired!
          </p>
        </div>
        {/* Blog Post List */}
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
            >
              <Image
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
                width={800}
                height={600}
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
                <p className="mt-4 text-gray-600">{post.summary}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-block text-[#ED2939] hover:text-[#C62631] font-medium"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}