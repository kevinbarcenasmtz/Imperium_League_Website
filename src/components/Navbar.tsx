"use client";
import Link from "next/link";
import Image from "next/image";
import { Disclosure } from "@headlessui/react";
import { useSession, signOut } from "next-auth/react";
import { FaUser, FaSignOutAlt } from 'react-icons/fa'; // Add icons

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
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300"
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
            <span className="text-gray-700 dark:text-gray-300 font-medium hidden lg:inline">
              {session.user?.name?.split(' ')[0]}
            </span>
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault();
              if (onClose) onClose();
              handleLogout();
            }}
            className="flex items-center gap-2 px-4 py-2 text-white rounded-full bg-[#ED2939] hover:bg-[#C62631] transition-all duration-300"
          >
            <FaSignOutAlt className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      );
    }

    return (
      <Link
        href="/login"
        onClick={onClose}
        className="flex items-center gap-2 px-6 py-2 text-white rounded-full bg-[#ED2939] hover:bg-[#C62631] shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <FaUser className="w-4 h-4" />
        <span>Login</span>
      </Link>
    );
  };

  return (
    <div className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-700">
      <nav className="container flex items-center justify-between px-6 py-4 mx-auto lg:px-8 xl:px-16 max-w-screen-xl">
        {/* Logo */}
        <div className="flex items-center space-x-2 flex-grow lg:flex-grow-0">
          <Image
            src="/img/team_logo.jpg"
            width={24}
            height={24}
            alt="Team Logo"
            className="w-6 sm:w-8 hover:scale-110 transition-transform duration-300"
          />
          <span>Empire Football League</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-center flex-1 list-none lg:flex lg:space-x-1">
            {navigation.map((menu, index) => (
              <li className="nav__item" key={index}>
                <Link
                  href={menu.href}
                  className="inline-block px-4 py-2 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#ED2939] transition-all duration-300"
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

        {/* Mobile Menu Button */}
        <Disclosure>
          {({ open, close }) => (
            <>
              <Disclosure.Button
                aria-label="Toggle Menu"
                className="absolute top-4 right-4 p-2 text-gray-500 rounded-full lg:hidden hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
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

              {/* Mobile Menu Panel */}
              <Disclosure.Panel className="fixed inset-0 z-50 bg-white/95 backdrop-blur-lg dark:bg-gray-900/95 lg:hidden">
                <div className="flex flex-col items-center justify-start w-full h-full p-6">
                  <button
                    aria-label="Close Menu"
                    onClick={() => close()}
                    className="self-end p-2 text-gray-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
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

                  <div className="flex flex-col items-center justify-start w-full mt-10 space-y-6">
                    {navigation.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        onClick={() => close()}
                        className="w-full text-center px-4 py-3 text-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-300"
                      >
                        {item.name}
                      </Link>
                    ))}
                    <div className="w-full flex justify-center pt-6">
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