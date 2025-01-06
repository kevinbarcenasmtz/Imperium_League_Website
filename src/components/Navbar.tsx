"use client";
import Link from "next/link";
import Image from "next/image";
import { Disclosure } from "@headlessui/react";
import { useSession, signOut } from "next-auth/react";

type AuthButtonsProps = {
  onClose?: () => void;
};

export const Navbar = () => {
  const { data: session, status } = useSession();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Leagues", href: "/league" },
    { name: "Standings", href: "/standings" },
    { name: "Calendar", href: "/calendar" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
  ];

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  const AuthButtons = ({ onClose }: AuthButtonsProps) => {
    if (status === "loading") {
      return null;
    }

    if (session) {
      return (
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 transition duration-200"
            aria-label="Profile"
            onClick={onClose}
          >
            <Image
              src={"/img/user.png"}
              alt="Profile"
              width={24}
              height={24}
              className="w-6 h-6 rounded-full"
            />
          </Link>
          <button
            onClick={() => {
              handleLogout();
              if (onClose) onClose();
            }}
            className="px-6 py-2 text-white rounded-md bg-[#ED2939] hover:bg-[#C62631]"
          >
            Logout
          </button>
        </div>
      );
    }

    return (
      <Link
        href="/login"
        onClick={onClose}
        className="px-6 py-2 text-white rounded-md bg-[#ED2939] hover:bg-[#C62631]"
      >
        Login
      </Link>
    );
  };

  return (
    <div className="w-full sticky top-0 z-50 bg-white shadow-md dark:bg-gray-900 shadow-gray-200/50 dark:shadow-black/20">
    {/* <div className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-700"> */}
      <nav className="container flex items-center justify-between px-6 py-4 mx-auto lg:px-8 xl:px-16 max-w-screen-xl">
        {/* Logo */}
        <div className="flex items-center space-x-2 flex-grow lg:flex-grow-0">
          <Image
            src="/img/team_logo.jpg"
            width={24}
            height={24}
            alt="Team Logo"
            className="w-6 sm:w-8"
          />
        <span>Empire Football League</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-center flex-1 list-none lg:flex">
            {navigation.map((menu, index) => (
              <li className="mr-3 nav__item" key={index}>
                <Link
                  href={menu.href}
                  className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-[#ED2939] focus:text-[#ED2939] focus:bg-[#FAD4D8] focus:outline-none dark:focus:bg-[#4D1216] lg:text-sm"
                >
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="hidden lg:flex">
          <AuthButtons />
        </div>

        {/* Mobile Menu */}
        <Disclosure>
          {({ open, close }) => (
            <>
              {/* Hamburger Button */}
              <Disclosure.Button
                aria-label="Toggle Menu"
                className="absolute top-4 right-4 px-2 py-1 text-gray-500 rounded-md lg:hidden hover:text-[#ED2939] focus:text-[#ED2939] focus:bg-[#FAD4D8] focus:outline-none dark:text-gray-300 dark:focus:bg-[#4D1216]"
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

              {/* Fullscreen Menu */}
              <Disclosure.Panel className="fixed inset-0 z-[100] bg-[#D78A91] dark:bg-gray-700 lg:hidden">
                <div className="flex flex-col items-start justify-start w-full h-full p-4">
                  {/* Close Button */}
                  <button
                    aria-label="Close Menu"
                    onClick={() => close()}
                    className="self-end mb-6 text-gray-500 rounded-md hover:text-[#ED2939] focus:text-[#ED2939] focus:bg-[#FAD4D8] focus:outline-none dark:text-gray-300 dark:focus:bg-[#4D1216]"
                  >
                    <svg
                      className="w-6 h-6 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                      />
                    </svg>
                  </button>

                  {/* Menu Items */}
                  <div className="flex flex-col items-start justify-start w-full max-h-[50%]">
                    {navigation.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        onClick={() => close()}
                        className="w-full px-2 py-2 text-md text-gray-700 border-b dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {item.name}
                      </Link>
                    ))}
                    <div className="w-full px-4 py-2 mt-4">
                      <AuthButtons onClose={() => close()} />
                    </div>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </nav>
    </div>
  );
};