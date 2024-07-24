'use client';

import { useEffect, useState } from 'react';

const Contents = () => {
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [sectionsVisible, setSectionsVisible] = useState({
    Exp: false,
    Project: false,
    Blog: false,
    Skill: false,
    Education: false,
    Contact: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Handle About section visibility
      if (scrollPosition > 200) {
        setIsAboutVisible(true);
      } 
      // else {
      //   setIsAboutVisible(false);
      // }

      // Handle visibility of other sections
      setSectionsVisible((prev) => {
        const newVisibility = { ...prev };
        Object.keys(newVisibility).forEach((section) => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            const isInViewport = rect.top < window.innerHeight && rect.bottom >= 0;
            newVisibility[section] = isInViewport;
          }
        });
        return newVisibility;
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="w-full xl:pt-10">
      <div id="Main" className="pt-12">
        <h1 className="text-5xl">
          Junior Software Developer <p className="text-gray-500 font-bold text-6xl pt-2">Dennis Cha</p>
        </h1>
        <div className="flex flex-row">
          <img className="w-24 h-24 lg:w-40 lg:h-40" src="/main1.svg" alt="Main Icon 1" />
          <img className="w-24 h-24 lg:w-40 lg:h-40" src="/main2.svg" alt="Main Icon 2" />
          <img className="w-24 h-24 lg:w-40 lg:h-40" src="/main3.svg" alt="Main Icon 3" />
        </div>
      </div>

      <section
        id="About"
        className={`min-h-screen pt-20 transition-opacity duration-700 ease-in-out ${
          isAboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div>
          <h1 className="text-4xl text-gray-500 font-bold">About Me</h1>
          <p className="section-title text-2xl pt-5 pb-5">
            Hi, this is Dennis.<br />
            I'm a Junior software developer with a strong foundation in coding and problem-solving, eager to contribute to innovative projects and grow professionally.
          </p>
          <div className="flex space-x-4">
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-sm font-semibold">WHAT</p>
              <p className="text-sm font-normal leading-normal">blah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blah blah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blah</p>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-sm font-semibold">HOW</p>
              <p className="text-sm font-normal leading-normal">blah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blah blah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blah</p>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-sm font-semibold">GROWTH</p>
              <p className="text-sm font-normal leading-normal">blah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blah blah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blah</p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="Exp"
        className={`min-h-screen pt-12 transition-opacity duration-700 ease-in-out ${
          sectionsVisible.Exp ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h1 className="text-4xl text-gray-500 font-bold">Experience</h1>
        <p className="section-title text-2xl pt-5 pb-5">
          I'm willing to learn quickly.
        </p>
        <p className="font-semibold">2022 - Current</p>
        <p className="text-xl">IT Officer at <em>BlahBlah</em></p>
        <ul className="list-disc list-inside -indent-5 pl-6">
          <li>BlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlah</li>
          <li>BlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlah</li>
          <li>BlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlah</li>
          <li>BlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlah</li>
          <li>BlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlah</li>
        </ul>
        <p className="font-semibold">2019 - 2022</p>
        <p className="text-xl">IT Officer at <em>BlahBlah</em></p>
        <ul className="list-disc list-inside -indent-5 pl-6">
          <li>BlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlah</li>
          <li>BlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlah</li>
          <li>BlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlah</li>
          <li>BlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlah</li>
          <li>BlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlah</li>
        </ul>
        <p className="font-semibold">2022 - Current</p>
        <p className="text-xl">IT Officer at <em>BlahBlah</em></p>
        <ul className="list-disc list-inside -indent-5 pl-6">
          <li>BlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlah</li>
          <li>BlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlah</li>
          <li>BlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlah</li>
          <li>BlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlah</li>
          <li>BlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlah</li>
        </ul>
      </section>

      <section
        id="Project"
        className={`min-h-screen pt-12 transition-opacity duration-700 ease-in-out ${
          sectionsVisible.Project ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h1 className="text-4xl text-gray-500 font-bold">Project</h1>
        <p className="section-title text-2xl pt-5 pb-5">
          List of projects 
        </p>
        <div className="cards grid md:grid-cols-2 lg:grid-cols3 gap-6 md:gap-8">
          <a className="no-underline" href="#">
            <div className="w-full h-fit md:h-72 xl:h-80 p-5 md:p-6 bg-background border border-black/15 hover:border-black/o 
            rounded-md md:rounded-lg flex md:flex-col justify-between items-end md:items-start group hover:bg-gray"></div>
          </a>
          <a className="no-underline" href="#">
            <div className="w-full h-fit md:h-72 xl:h-80 p-5 md:p-6 bg-background border border-black/15 hover:border-black/o 
            rounded-md md:rounded-lg flex md:flex-col justify-between items-end md:items-start group hover:bg-gray"></div>
          </a>
          <a className="no-underline" href="#">
          <div className="w-full h-fit md:h-72 xl:h-80 p-5 md:p-6 bg-background border border-black/15 hover:border-black/o 
          rounded-md md:rounded-lg flex md:flex-col justify-between items-end md:items-start group hover:bg-gray"></div>
          </a>
          <a className="no-underline" href="#">
          <div className="w-full h-fit md:h-72 xl:h-80 p-5 md:p-6 bg-background border border-black/15 hover:border-black/o 
          rounded-md md:rounded-lg flex md:flex-col justify-between items-end md:items-start group hover:bg-gray"></div>
          </a>
        </div>
      </section>

      <section
        id="Blog"
        className={`min-h-screen pt-12 transition-opacity duration-700 ease-in-out ${
          sectionsVisible.Blog ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h1 className="text-4xl text-gray-500 font-bold">Blog</h1>
        <p className="section-title text-2xl pt-5 pb-5">
          I recorded my problem-solving journals here 
        </p>
        <div className="cards grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <a className="no-underline" href="https://brunch.co.kr/@sicle-official/35">
            <div className="card bg-gray-200 p-4">
              <h2 className="text-xl font-bold">Card Title 2</h2>
              <p>Description of the card.</p>
            </div>
          </a>
          <a className="no-underline" href="https://brunch.co.kr/@sicle-official/35">
            <div className="card bg-gray-200 p-4">
              <h2 className="text-xl font-bold">Card Title 2</h2>
              <p>Description of the card.</p>
            </div>
          </a>
          <a className="no-underline" href="https://brunch.co.kr/@sicle-official/35">
            <div className="card bg-gray-200 p-4">
              <h2 className="text-xl font-bold">Card Title 2</h2>
              <p>Description of the card.</p>
            </div>
          </a>
        </div>
      </section>

      <section
        id="Skill"
        className={`min-h-screen pt-12 transition-opacity duration-700 ease-in-out ${
          sectionsVisible.Skill ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h1 className="text-4xl text-gray-500 font-bold">Skill</h1>
        <p className="section-title text-2xl pt-5 pb-5">
          List of stacks I used for my projects. 
        </p>
        <div className="cards flex flex-col gap-8 md:gap-10">
          <div className="w-full flex flex-col gap-4 md:grid md:grid-cols-[128px_auto] md:items-start">
            <div className="flex items-center gap-2">image FrontEnd</div>
            <ul className="list-disc list-inside -indent-5 pl-6">
              <li className="text-sm md:text-base font-normal mb-1 last:mb-0"></li>
              <li className="text-sm md:text-base font-normal mb-1 last:mb-0"></li>
              <li className="text-sm md:text-base font-normal mb-1 last:mb-0"></li>
            </ul>
          </div>
          <div className="w-full flex flex-col gap-4 md:grid md:grid-cols-[128px_auto] md:items-start">
          <div className="flex items-center gap-2">image BackEnd</div>
            <ul className="list-disc list-inside -indent-5 pl-6">
              <li className="text-sm md:text-base font-normal mb-1 last:mb-0"></li>
              <li className="text-sm md:text-base font-normal mb-1 last:mb-0"></li>
              <li className="text-sm md:text-base font-normal mb-1 last:mb-0"></li>
            </ul>
          </div>
          <div className="w-full flex flex-col gap-4 md:grid md:grid-cols-[128px_auto] md:items-start">
          <div className="flex items-center gap-2">image Graphic</div>
            <ul className="list-disc list-inside -indent-5 pl-6">
              <li className="text-sm md:text-base font-normal mb-1 last:mb-0"></li>
              <li className="text-sm md:text-base font-normal mb-1 last:mb-0"></li>
              <li className="text-sm md:text-base font-normal mb-1 last:mb-0"></li>
            </ul>
          </div>
          <div className="w-full flex flex-col gap-4 md:grid md:grid-cols-[128px_auto] md:items-start">
          <div className="flex items-center gap-2">image ETC</div>
            <ul className="list-disc list-inside -indent-5 pl-6">
              <li className="text-sm md:text-base font-normal mb-1 last:mb-0"></li>
              <li className="text-sm md:text-base font-normal mb-1 last:mb-0"></li>
              <li className="text-sm md:text-base font-normal mb-1 last:mb-0"></li>
            </ul>
          </div>
        </div>
      </section>

      <section
        id="Education"
        className={`min-h-screen pt-12 transition-opacity duration-700 ease-in-out ${
          sectionsVisible.Education ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h1 className="text-4xl text-gray-500 font-bold">Education</h1>
        <p className="section-title text-2xl pt-5 pb-5">
          Educational Background 
        </p>
        <div className="cards flex flex-col gap-12 md:gap-16">
            <div className="card text-sm md:text-base flex flex-col gap-3 md:grid md:grid-cols[128px_auto] md:items-start">
              <div className="flex items-center gap-2">image years</div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-base md:text-lg font-semibold">University of Technology Sydney</p>
                  <p className="font-normal">Bachelor of Information Techonology a& Bachelor of Business</p>
                </div>
              </div>
            </div>
          </div>
      </section>
      <section
        id="Contact"
        className={`min-h-screen pt-12 transition-opacity duration-700 ease-in-out ${
          sectionsVisible.Contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h1 className="text-4xl text-gray-500 font-bold">Contact</h1>
        <p>Content for the section...</p>
      </section>
    </div>
  );
};

export default Contents;
