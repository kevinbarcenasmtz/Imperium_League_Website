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
    image: "/pickup_photos/IMG_2471.jpg", // Replace with actual image path
    slug: "the-future-of-football-leagues",
  },
  {
    id: 2,
    title: "Why Football Teams Should Invest in Youth Development",
    summary:
      "Youth development is key to building a strong future for your football club...",
    image: "/pickup_photos/IMG_2596.jpg", // Replace with actual image path
    slug: "why-football-teams-should-invest-in-youth-development",
  },
  {
    id: 3,
    title: "Top 5 Football Matches to Watch This Season",
    summary:
      "Looking for exciting matches to watch? Check out our top picks for this season...",
    image: "/pickup_photos/IMG_2487.jpg", // Replace with actual image path
    slug: "top-5-football-matches-to-watch-this-season",
  },
];

export default function BlogPage() {
  return (
    <Container className="py-12">
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
            {/* Blog Image */}
            <Image
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
              width={800} // Replace with your actual image width
              height={600} // Replace with your actual image height
            />
            {/* Blog Content */}
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
    </Container>
  );
}
