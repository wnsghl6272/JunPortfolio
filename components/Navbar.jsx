'use client';
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleScroll = (id) => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setIsOpen(false);
    };
  
    return (
      <>
      <header className="xl:hidden pb-2 sticky top-0 z-50 w-full h-20 bg-light border-b border-b-gray-400 xl:border-b-0
      flex justify-between items-center bg-white">
        {/* logo/name */}
        <div className="relative group flex items-center w-fit mt-2">
          <img src="navLogo.png" className="w-50 h-20 group-hover:opacity-0 transition-opacity duration-300" alt="Logo" />
          <div className="absolute text-[30px] font-bold text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Dennis</div>
        </div>
        {/* hamburger menu */}
        <div className="xl:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 dark:text-gray-200">
                {isOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
            </button>
        </div>
        {isOpen && (
        <nav className="w-full py-4 px-1 bg-white dark:bg-dark border-b border-gray-400 dark:border-gray-700 
        absolute top-[calc(100%_+_1px)] overflow-hidden transition-opacity duration-300">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap3 md:gap-4">
              <p className="text-lg md:text-xl font-semibold text-foreground">Contents</p>
              <a className="grid grid-cols-[32px_auto] no-underline" href="#About">
                    <p className="text-sm md:text-base font-semibold">01</p>
                    <p className="text-sm md:text-base font-normal">About Me</p>
                </a>
                <a className="grid grid-cols-[32px_auto] no-underline" href="#Exp">
                    <p className="text-sm md:text-base font-semibold">02</p>
                    <p className="text-sm md:text-base font-normal">Experience</p>
                </a>
                <a className="grid grid-cols-[32px_auto] no-underline" href="#Project">
                    <p className="text-sm md:text-base font-semibold">03</p>
                    <p className="text-sm md:text-base font-normal">Project</p>
                </a>
                <a className="grid grid-cols-[32px_auto] no-underline" href="#Blog">
                    <p className="text-sm md:text-base font-semibold">04</p>
                    <p classNAme="text-sm md:text-base font-normal">Blog</p>
                </a>
                <a className="grid grid-cols-[32px_auto] no-underline" href="#Skill">
                    <p className="text-sm md:text-base font-semibold">05</p>
                    <p className="text-sm md:text-base font-normal">Skill</p>
                </a>
                <a className="grid grid-cols-[32px_auto] no-underline" href="#Education">
                    <p className="text-sm md:text-base font-semibold">06</p>
                    <p className="text-sm md:text-base font-normal">Education</p>
                </a>
            </div>
            <div class="controller flex gap-3 justify-end"></div>
          </div>
        </nav>
      )}
      </header>
      </>

    );
  };

  export default Navbar;