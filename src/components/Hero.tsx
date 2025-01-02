import Image from "next/image";
import { Container } from "@/components/Container";
import heroImg from "../../public/pickup_photos/img_3955.jpg";

export const Hero = () => {
  return (
    <Container className="flex flex-wrap items-center justify-center lg:justify-between px-4 py-8 lg:py-16">
      {/* Left Section */}
      <div className="flex flex-col items-center w-full lg:w-1/2 lg:items-start">
        <h1 className="text-3xl font-bold leading-snug tracking-tight text-center text-gray-800 lg:text-left lg:text-4xl xl:text-6xl dark:text-white">
          Welcome to Empire Football League!
        </h1>
        <p className="py-5 text-lg leading-relaxed text-center text-gray-500 lg:text-left lg:text-xl xl:text-2xl dark:text-gray-300">
          Join Austin’s most exciting and inclusive soccer community! Our
          midweek adult league is designed for players of all skill levels
          who are passionate about the beautiful game. Whether you&apos;re a
          seasoned player or just looking to stay active and have fun, our
          league is a great place for you.
        </p>

        <div className="flex flex-col items-center w-full gap-4 sm:flex-row lg:justify-start">
          <a
            href="/login"
            rel="noopener"
            className="px-8 py-4 text-lg font-medium text-center text-white bg-[#ED2939] hover:bg-[#C62631] rounded-md"
          >
            Join the League
          </a>
          <a
            href="/about"
            rel="noopener"
            className="px-8 py-4 text-lg font-medium text-center text-white bg-[#ED2939] rounded-md hover:bg-[#C62631]"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-center w-full mt-8 lg:w-1/2 lg:mt-0">
        <div className="w-full max-w-md lg:max-w-none">
          <Image
            src={heroImg}
            layout="responsive"
            width={616} // Specify width explicitly
            height={617} // Specify height explicitly
            className="rounded-md object-cover"
            alt="Hero Illustration"
            loading="eager"
            placeholder="blur"
          />
        </div>
      </div>
    </Container>
  );
};
