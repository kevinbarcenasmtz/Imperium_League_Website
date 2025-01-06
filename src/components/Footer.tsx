import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Container } from "@/components/Container";

export function Footer() {
  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Calendar", href: "/calendar" },
    { name: "Contact", href: "/contact" },
  ];
  const legal = ["Terms of Service", "Privacy Policy", "Rules"];

  return (
    <div className="relative bg-gray-100 dark:bg-gray-900">
      <Container>
        <div className="grid max-w-screen-xl grid-cols-1 gap-10 pt-10 mx-auto mt-5 border-t border-gray-200 dark:border-gray-700 sm:grid-cols-2 lg:grid-cols-5">
          {/* Logo and About Section */}
          <div className="lg:col-span-2">
            <div>
              <Link
                href="/"
                className="flex items-center space-x-2 text-2xl font-medium text-[#ED2939] dark:text-gray-100"
              >
                <Image
                  src="/img/empire_logo.png"
                  alt="Empire League Logo"
                  width="32"
                  height="32"
                  className="w-8"
                />
                <span>Empire Football League</span>
              </Link>
            </div>
            <p className="max-w-md mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              Empire Football League is your go-to destination for community soccer.
              Enjoy competitive, organized, and fun soccer leagues with no
              hidden fees or hassle—just pure love for the game.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Navigation
            </h4>
            <ul className="flex flex-col mt-4 space-y-3">
              {navigation.map((menu, index) => (
                <li key={index}>
                  <Link
                    href={menu.href}
                    className="inline-block text-sm font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-[#ED2939] focus:text-[#ED2939] focus:bg-[#FAD4D8] focus:outline-none dark:focus:bg-[#4D1216] px-2 py-1"
                  >
                    {menu.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Legal
            </h4>
            <ul className="flex flex-col mt-4 space-y-3">
              {legal.map((item, index) => (
                <li key={index}>
                  <Link
                    href="/"
                    className="inline-block text-sm font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-[#ED2939] focus:text-[#ED2939] focus:bg-[#FAD4D8] focus:outline-none dark:focus:bg-[#4D1216] px-2 py-1"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Follow Us
            </h4>
            <div className="flex mt-5 space-x-4">
              <a
                href="https://www.instagram.com/empirefutsalatx/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#ED2939] dark:text-gray-400"
              >
                <span className="sr-only">Instagram</span>
                <Instagram />
              </a>
              {/* Add more social media icons here if needed */}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="py-6 mt-10 text-sm text-center text-gray-600 dark:text-gray-400">
          Copyright © {new Date().getFullYear()}. Built with ♥ by Kevin Barcenas-Martinez.
          For inquiries contact: kevinbarcenas2022@gmail.com
          All rights reserved.
        </div>
      </Container>
    </div>
  );
}

const Instagram = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M16.98 0a6.9 6.9 0 0 1 5.08 1.98A6.94 6.94 0 0 1 24 7.02v9.96c0 2.08-.68 3.87-1.98 5.13A7.14 7.14 0 0 1 16.94 24H7.06a7.06 7.06 0 0 1-5.03-1.89A6.96 6.96 0 0 1 0 16.94V7.02C0 2.8 2.8 0 7.02 0h9.96zm.05 2.23H7.06c-1.45 0-2.7.43-3.53 1.25a4.82 4.82 0 0 0-1.3 3.54v9.92c0 1.5.43 2.7 1.3 3.58a5 5 0 0 0 3.53 1.25h9.88a5 5 0 0 0 3.53-1.25 4.73 4.73 0 0 0 1.4-3.54V7.02a5 5 0 0 0-1.3-3.49 4.82 4.82 0 0 0-3.54-1.3zM12 5.76c3.39 0 6.2 2.8 6.2 6.2a6.2 6.2 0 0 1-12.4 0 6.2 6.2 0 0 1 6.2-6.2zm0 2.22a3.99 3.99 0 0 0-3.97 3.97A3.99 3.99 0 0 0 12 15.92a3.99 3.99 0 0 0 3.97-3.97A3.99 3.99 0 0 0 12 7.98zm6.44-3.77a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z" />
  </svg>
);
