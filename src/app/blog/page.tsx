// /src/app/blog/page.tsx
import Link from 'next/link';
import { Container } from '@/components/Container';

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
    title: 'The Future of Football Leagues',
    summary: 'Football leagues are constantly evolving. Here we explore the next big trends...',
    image: '/img/blog1.jpg', // Replace with actual image path
    slug: 'the-future-of-football-leagues',
  },
  {
    id: 2,
    title: 'Why Football Teams Should Invest in Youth Development',
    summary: 'Youth development is key to building a strong future for your football club...',
    image: '/img/blog2.jpg', // Replace with actual image path
    slug: 'why-football-teams-should-invest-in-youth-development',
  },
  {
    id: 3,
    title: 'Top 5 Football Matches to Watch This Season',
    summary: 'Looking for exciting matches to watch? Check out our top picks for this season...',
    image: '/img/blog3.jpg', // Replace with actual image path
    slug: 'top-5-football-matches-to-watch-this-season',
  },
];

export default function BlogPage() {
  return (
    <Container className="flex flex-wrap">
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Blog</h1>
      
      {/* Blog Post List */}
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white border rounded-lg shadow-md overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover object-center"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
              <p className="mt-2 text-gray-600">{post.summary}</p>
              <Link href={`/blog/${post.slug}`}
                className="mt-4 inline-block text-indigo-600 hover:text-indigo-800"
                >
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    </Container>
  );
}
