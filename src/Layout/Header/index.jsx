"use client";
import { FaMoon, FaSun } from "react-icons/fa";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { getUserInfo } from "../../Global/Methods";
import { Link } from "react-router-dom";


const Header =() => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const User = getUserInfo();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <header className="bg-sky-600  dark:bg-darkColor-700 shadow-sm dark:shadow-none mb-0">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
      >
        <div className="flex lg:flex-1">
          
          <Link to="/" className="text-lg text-sky-200 font-bold">
            Friendbook
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5  text-sky-200"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12 ">
         

          <Link to={`/Profile/${User?.UserId}`} className="text-sky-200 text-sm font-semibold leading-6">
            Profile
            </Link>
          {/* ------------------------- */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-neutral-200 dark:bg-neutral-600 text-yellow-400  dark:text-yellow-300 transition-colors duration-300"
          >
            {darkMode ? <FaSun size={12} /> : <FaMoon size={12} />}
          </button>
          {/* ------------------------- */}
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link to="/Login" className="text-sm font-semibold leading-6 text-sky-200">
          Logout <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden "
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 bg-sky-600 dark:bg-darkColor-700">
          <div className="flex items-center justify-between ">
            <a href="#" className="-m-1.5 p-1.5">
              
              <Link to="/" className="text-lg text-sky-200 font-bold">
                Friendbook
              </Link>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-sky-200"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root ">
            <div className="-my-6 divide-y divide-gray-500/10 ">
              <div className="space-y-2 py-6 *:text-sky-200">
                
                <Link
                  Link to={`/Profile/${User?.UserId}`}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-darkColor-900"
                >
                  Profile
                </Link>
              </div>
              <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-neutral-200 dark:bg-neutral-600 text-yellow-400  dark:text-yellow-300 transition-colors duration-300"
          >
            {darkMode ? <FaSun size={12} /> : <FaMoon size={12} />}
          </button>
              <div className="py-6">
                <Link
                  to="/Login"
                  className="text-sky-200 -mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7  hover:bg-darkColor-900"
                >
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
export default React.memo(Header)