'use client';
import React from 'react'
import Navbar from './Navbar'

const Sidenav = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <nav className="hidden xl:flex w-full h-screen sticky top-0 flex-col xl:col-span-1 xl:w-72">
                {/* logo/name */}
                <div className="h-20 flex items-center font-black">
                    <div 
                        className="group w-fit mt-2 cursor-pointer" 
                        onClick={scrollToTop}
                    >
                        <img src="navLogo.png" className="absolute top-0 left-0 xl:w-50 xl:h-20 group-hover:opacity-0 transition-opacity duration-300"/>
                        <div className="xl:text-3xl opacity-0 text-gray-500 group-hover:opacity-100 transition-opacity duration-300">Dennis</div>
                    </div>
                </div>

                <div className="flex flex-col text-s gap-3 pt-4 mb-12 text-foreground/80 
                border-t border-t-black/25 dark:border-t-white/25">
                    <p className="text-md font-extrabold text-gray-500">Contents</p>
                    <a className="grid grid-cols-[32px_auto] no-underline" href="#About">
                        <p className="font-semibold text-gray-500">01</p>
                        <p className="font-normal">About Me</p>
                    </a>
                    <a className="grid grid-cols-[32px_auto] no-underline" href="#Exp">
                        <p className="font-semibold text-gray-500">02</p>
                        <p className="font-normal">Experience</p>
                    </a>
                    <a className="grid grid-cols-[32px_auto] no-underline" href="#Project">
                        <p className="font-semibold text-gray-500">03</p>
                        <p className="font-normal">Project</p>
                    </a>
                    <a className="grid grid-cols-[32px_auto] no-underline" href="#Blog">
                        <p className="font-semibold text-gray-500">04</p>
                        <p className="font-normal">Blog</p>
                    </a>
                    <a className="grid grid-cols-[32px_auto] no-underline" href="#Education">
                        <p className="font-semibold text-gray-500">05</p>
                        <p className="font-normal">Education</p>
                    </a>
                </div>

                <div className="grid grid-cols-[60px_auto] text-s gap-3 pt-4 text-foreground/80 border-t border-t-black/25 dark:border-t-white/25">
                    <a href="#Contact" className="col-span-2 text-md font-extrabold text-gray-500 no-underline cursor-pointer">Contact</a>
                    <p className="font-semibold text-gray-500">Phone</p>
                    <p className="font-normal">0413361775</p>
                    <p className="font-semibold text-gray-500">Email</p>
                    <p className="font-normal">cjun1775@gmail.com</p>
                    <p className="font-semibold text-gray-500">Github</p>
                    <a target="_blank" href="https://github.com/wnsghl6272" rel="noopener noreferrer">
                        <p className="font-normal">@wnsghl6272</p>
                    </a>
                    <p className="font-semibold text-gray-500">Medium Blog</p>
                    <a target="_blank" href="https://medium.com/@cjun1775" rel="noopener noreferrer">
                        <p className="font-normal">@cjun1775</p>
                    </a>
                </div>
            </nav>
            <div>
                <Navbar/>
            </div>
        </>
    );
};

export default Sidenav;