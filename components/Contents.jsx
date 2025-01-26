'use client';

import { useEffect, useState } from 'react';
import ChatBot from './ChatBot';

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
    {/* Main Section */}
    <div id="Main" className="min-h-[60vh] flex flex-col justify-center pb-16">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-8">
        <div>
          <h1 className="text-5xl">
            Software Developer
          <p className="text-gray-500 font-bold text-6xl pt-2 flex items-center">
            Dennis Cha
          <span className="flex ml-4">
            <img className="w-16 h-16 lg:w-24 lg:h-24" src="/main1.svg" alt="Main Icon 1" />
            <img className="w-16 h-16 lg:w-24 lg:h-24" src="/main2.svg" alt="Main Icon 2" />
            <img className="w-16 h-16 lg:w-24 lg:h-24" src="/main3.svg" alt="Main Icon 3" />
          </span>
        </p>
      </h1>
    </div>
  </div>
        

        {/* Chat Interface */}
        <div className="mt-8 max-w-2xl w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
          {/* Chat Header */}
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <div className="flex flex-col">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="font-medium text-gray-700">Dennis Cha</span>
              </div>
            </div>
          </div>
          
          {/* Integrate ChatBot component with increased height */}
          <div className="h-[500px]">
            <ChatBot embedded={true} />
          </div>
        </div>
      </div>

      {/* About Section */}
      <section
        id="About"
        className={`min-h-[60vh] py-16 transition-opacity duration-700 ease-in-out ${
          isAboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div>
          <h1 className="text-4xl text-gray-500 font-bold">About Me</h1>
          <p className="section-title text-2xl pt-5 pb-5">
            I'm a junior developer who loves solving problems and making thoughtful decisions. I'm passionate about growing through challenges and sharing what I learn with others.
          </p>
          <div className="flex space-x-4">
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-sm font-semibold">WHAT</p>
              <p className="text-sm font-normal leading-normal">I build purposeful, clean code by analyzing problems and finding the best solutions.</p>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-sm font-semibold">HOW</p>
              <p className="text-sm font-normal leading-normal">I document my process, explore different approaches, and reflect on each challenge to continuously improve.</p>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-sm font-semibold">GROWTH</p>
              <p className="text-sm font-normal leading-normal">I tackle challenges, learn from experiences, and share insights to become a better developer every day.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="Exp"
        className={`min-h-[60vh] py-16 transition-opacity duration-700 ease-in-out ${
          sectionsVisible.Exp ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h1 className="text-4xl text-gray-500 font-bold">Experience</h1>
        <p className="section-title text-2xl pt-5 pb-5">
          I'm willing to learn quickly.
        </p>
        <p className="text-xl">IT Support at <em>AMOREPACIFIC PTY LTD
        (Melbourne, Australia)</em></p>
        <p className="font-semibold">2023 - Present</p>
        <p className="font-semibold">Responsible for coordinating, planning and leading information technology-related activities in an organization.</p>
        <ul className="list-disc list-inside -indent-5 pl-6">
          <li>Follow IT projects from Head Quarter and global organization including the design and deployment of new IT systems and services.</li>
          <li>Provided comprehensive technical support to end users, troubleshooting and resolving hardware, software and network issues to ensure smooth daily operations.</li>
          <li>Managed the procurement process for IT assets including laptops, desktops, POS machines, and printers, ensuring timely availability of equipment.</li>
          <li>Registered and updated IT asset information on the internal system for tracking purposes, ensuring accurate records for new purchases and changes of ownership.</li>
          <li>Oversaw the procurement and management of software licenses ensuring compliance and availability of necessary software tools.</li>
          <li>Managed and maintained office and store networks, including liaising with ISPs and vendor responsible for Cisco Meraki devices to resolve network issues.</li>
          <li>Set up accounts and provided support for new employees, ensuring seamless access to internal platforms and VPN.</li>
          <li>Conducted training sessions and developed manuals in Korean and English to guide employees on the use of company systems.</li>
          <li>Resolved tickets related to POS/SAP system, ensuring timely and efficient issue resolution for end users.</li>
        </ul>
      </section>

      {/* Project Section */}
      <section
        id="Project"
        className={`min-h-[60vh] py-16 transition-opacity duration-700 ease-in-out ${
          sectionsVisible.Project ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h1 className="text-4xl text-gray-500 font-bold">Project</h1>
        <p className="section-title text-2xl pt-5 pb-5">
          List of project 
        </p>

        <div className="cards grid md:grid-cols-2 gap-8">
  {/* First E-commerce Project Card */}
  <div className="flex flex-col gap-4">
    <a 
      className="no-underline relative group" 
      href="https://shop.my-portfolio-dennis.xyz/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="w-full h-[400px] p-5 md:p-6 bg-background border border-black/15 
        rounded-md md:rounded-lg flex md:flex-col justify-between items-end md:items-start 
        group hover:bg-gray-100 transition-all duration-300 relative overflow-hidden"
      >
        <img 
          src="/project1.png"
          alt="E-commerce marketplace preview" 
          className="w-full h-full object-cover absolute top-0 left-0"
        />
        
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 
          transition-opacity duration-300 flex items-center justify-center">
          <p className="text-white text-xl font-semibold">E-commerce marketplace</p>
        </div>
      </div>
    </a>
    
    {/* Tech Stack */}
    <div className="flex flex-wrap gap-2">
      {[
        'React',
        'TypeScript',
        'NextJS',
        'Tailwind',
        'Redux',
        'Stripe'
      ].map((tech, index) => (
        <span
          key={index}
          className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full
            hover:bg-gray-200 transition-colors duration-200"
        >
          {tech}
        </span>
      ))}
    </div>
  </div>

  {/* Second E-commerce Project Card */}
  <div className="flex flex-col gap-4">
    <a 
      className="no-underline relative group" 
      href="https://https://my-portfolio-dennis.xyz//"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="w-full h-[400px] p-5 md:p-6 bg-background border border-black/15 
        rounded-md md:rounded-lg flex md:flex-col justify-between items-end md:items-start 
        group hover:bg-gray-100 transition-all duration-300 relative overflow-hidden"
      >
        <img 
          src="/project2.png"
          alt="Portfolio website with Open Ai Chatbot" 
          className="w-full h-full object-cover absolute top-0 left-0"
        />
        
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 
          transition-opacity duration-300 flex items-center justify-center">
          <p className="text-white text-xl font-semibold">Open Ai Chatbot Portfolio</p>
        </div>
      </div>
    </a>
    
    {/* Tech Stack */}
    <div className="flex flex-wrap gap-2">
      {[
        'React',
        'NextJS',
        'Tailwind',
        'MongoDB',
        'OpenAI',
      ].map((tech, index) => (
        <span
          key={index}
          className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full
            hover:bg-gray-200 transition-colors duration-200"
        >
          {tech}
        </span>
      ))}
    </div>
  </div>
</div>
      </section>

      {/* Blog Section */}
      <section
        id="Blog"
        className={`min-h-[60vh] py-16 transition-opacity duration-700 ease-in-out ${
          sectionsVisible.Blog ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h1 className="text-4xl text-gray-500 font-bold">Blog</h1>
        <p className="section-title text-2xl pt-5 pb-5">
          I recorded my problem-solving journals here 
        </p>
        <div className="cards grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              title: "Enhancing Payment System Reliability",
              image: "/blogmedium.png",
              link: "https://medium.com/@cjun1775/enhancing-payment-system-reliability-through-logging-and-error-handling-1248a2a7bdd0"
            },
            {
              title: "Backend Price Validation in E-commerce",
              image: "/blogmedium.png",
              link: "https://medium.com/@cjun1775/the-importance-of-backend-price-validation-in-e-commerce-applications-850ac7f773c1"
            },
            {
              title: "Speed Optimizations for Frontend",
              image: "/blogmedium.png",
              link: "https://medium.com/@cjun1775/speed-optimizations-for-frontend-development-b4bad9730b69"
            },
            {
              title: "Handling Token Updates for Online Posting",
              image: "/blogmedium.png",
              link: "https://medium.com/@cjun1775/handling-token-updates-for-online-posting-ensuring-a-smooth-user-experience-11bd357d308a"
            },
            {
              title: "Handling Logout Function",
              image: "/blogmedium.png",
              link: "https://medium.com/@cjun1775/handling-logout-function-fb858a29d50a"
            },
            {
              title: "JWT Tokens: Local Storage vs HTTPOnly Cookies",
              image: "/blogmedium.png",
              link: "https://medium.com/@cjun1775/choosing-between-local-storage-and-httponly-cookies-for-storing-jwt-tokens-47f4ecbca6ee"
            }
          ].map((blog, index) => (
            <div key={index} className="flex flex-col">
              <a 
                className="no-underline relative group" 
                href={blog.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-full h-48 md:h-56 bg-background border border-black/15 
                  rounded-md md:rounded-lg relative overflow-hidden group
                  transition-all duration-300"
                >
                  {/* 블로그 이미지 */}
                  <img 
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover absolute top-0 left-0"
                  />
                  
                  {/* 호버 시 나타나는 오버레이와 제목 */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 
                    transition-opacity duration-300 flex items-center justify-center"
                  >
                    <div className="text-center px-4">
                      <p className="text-white text-lg font-semibold">{blog.title}</p>
                    </div>
                  </div>
                </div>
              </a>
              {/* 카드 아래 제목 */}
              <h3 className="mt-3 text-lg font-semibold text-gray-800 line-clamp-2 hover:text-gray-600">
                {blog.title}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section
        id="Education"
        className={`min-h-[60vh] py-16 transition-opacity duration-700 ease-in-out ${
          sectionsVisible.Education ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h1 className="text-4xl text-gray-500 font-bold">Education</h1>
        <p className="section-title text-2xl pt-5 pb-5">
          Educational Background 
        </p>
        <div className="cards flex flex-col gap-12 md:gap-16">
          <div className="card text-sm md:text-base flex flex-col gap-3 md:grid md:grid-cols[128px_auto] md:items-start">
            <div className="flex items-center gap-2"></div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-base md:text-lg font-semibold">University of Technology Sydney</p>
                <p className="font-bold">Bachelor of Science in Information Techonology & Bachelor of Business</p>
                <p className="font-normal">Major in Networking and Cybersecurity & Major in Finance</p>
                <p className="font-normal">(SYDNEY, AUSTRALIA - 2020)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="Contact"
        className={`min-h-[60vh] py-16 transition-opacity duration-700 ease-in-out ${
          sectionsVisible.Contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h1 className="text-4xl text-gray-500 font-bold">Contact</h1>
        
        {/* 메인 텍스트 */}
        <div className="mt-8 mb-12">
          <h2 className="text-6xl font-bold text-gray-800 transition-all duration-300 hover:text-gray-600">
            Let's get in touch
          </h2>
        </div>

        {/* 연락처 정보 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Email */}
          <a 
            href="mailto:cjun1775@gmail.com" 
            className="group p-6 bg-gray-50 rounded-xl transition-all duration-300 
              hover:bg-gray-100 hover:shadow-md"
          >
            <div className="flex flex-col gap-2">
              <span className="text-gray-500 text-sm font-medium">EMAIL</span>
              <span className="text-gray-800 text-lg font-semibold group-hover:text-gray-600">
                cjun1775@gmail.com
              </span>
            </div>
          </a>

          {/* GitHub */}
          <a 
            href="https://github.com/wnsghl6272" 
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 bg-gray-50 rounded-xl transition-all duration-300 
              hover:bg-gray-100 hover:shadow-md"
          >
            <div className="flex flex-col gap-2">
              <span className="text-gray-500 text-sm font-medium">GITHUB</span>
              <span className="text-gray-800 text-lg font-semibold group-hover:text-gray-600">
                github.com/wnsghl6272
              </span>
            </div>
          </a>

          {/* Phone */}
          <a 
            href="tel:+61413361775" 
            className="group p-6 bg-gray-50 rounded-xl transition-all duration-300 
              hover:bg-gray-100 hover:shadow-md"
          >
            <div className="flex flex-col gap-2">
              <span className="text-gray-500 text-sm font-medium">PHONE</span>
              <span className="text-gray-800 text-lg font-semibold group-hover:text-gray-600">
                +61 413361775
              </span>
            </div>
          </a>
        </div>

        {/* 추가 메시지 */}
        <p className="mt-12 text-gray-600 text-lg text-center">
          Feel free to reach out. I'm always open to discussing new projects and opportunities.
        </p>
      </section>
    </div>
  );
};

export default Contents;
