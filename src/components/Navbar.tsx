"use client";
import Link from "next/link";
import Image from "next/image";
import { Disclosure } from "@headlessui/react";

export const Navbar = () => {
  const navigation = [
    { name: "Home", href: "/"},
    { name: "About Us", href: "/about" },
    { name: "Leagues", href: "/league"},
    { name: "Standings", href: "/standings"},
    { name: "Calendar", href: "/calendar"},
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog"},
  ];


  return (
    <div className="w-full">
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-1">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2 text-2xl font-medium text-black dark:text-gray-100"
        >
          <Image
            src="/img/team_logo.jpg"
            width="32"
            height="32"
            alt="Team Logo"
            className="w-8"
          />
          <span>Empire Football League</span>
        </Link>

        {/* Get Started */}
        <div className="gap-3 nav__item mr-2 lg:flex ml-auto lg:ml-0 lg:order-2">
          {/* for now gonna delete dark mode not really nec. */}
          {/* <ThemeChanger />  */}
          <div className="hidden mr-3 lg:flex nav__item">
            <Link
              href="/login" //this will lead to log in page
              className="px-6 py-2 text-white rounded-md md:ml-5 bg-[#ED2939] hover:bg-[#C62631]"
            >
              Log In
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}

        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button
                aria-label="Toggle Menu"
                className="px-2 py-1 text-gray-500 rounded-md lg:hidden hover:text-[#ED2939] focus:text-[#ED2939] focus:bg-[#FAD4D8] focus:outline-none dark:text-gray-300 dark:focus:bg-[#4D1216]"
              >
                <svg
                  className="w-6 h-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  {open ? (
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                    />
                  ) : (
                    <path
                      fillRule="evenodd"
                      d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2z"
                    />
                  )}
                </svg>
              </Disclosure.Button>

              <Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden">
                {navigation.map((item, index) => (
                  <Disclosure.Button
                    key={index}
                    as={Link}
                    href={item.href}
                    className="w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-300 hover:text-[#ED2939] focus:text-[#ED2939] focus:bg-[#FAD4D8] dark:focus:bg-[#4D1216] focus:outline-none"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
                <Disclosure.Button
                  as={Link}
                  href="/login"
                  className="w-full px-6 py-2 mt-3 text-center text-white bg-[#ED2939] rounded-md lg:ml-5 hover:bg-[#C62631] transition duration-200"
                >
                  Login
                </Disclosure.Button>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* Desktop Menu */}
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {navigation.map((menu, index) => (
              <li className="mr-3 nav__item" key={index}>
                <Link
                  href={menu.href}
                  className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-[#ED2939] focus:text-[#ED2939] focus:bg-[#FAD4D8] focus:outline-none dark:focus:bg-[#4D1216]"
                >
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </nav>
    </div>
  );
};
