import React from "react";

const logos = [
  '/logos/google-rounded.svg',
  '/logos/microsoft-rounded.svg',
  '/logos/facebook-rounded.svg',
  '/logos/apple-rounded.svg',
  '/logos/linkedin-rounded.svg',
];

export const LogoCarousel: React.FC = () => {
  return (
    <section className="w-full flex flex-col items-center">
      <h3 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white tracking-tight text-center">
        Trusted by Leading Brands
      </h3>
      <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6 text-center max-w-2xl mx-auto">
        We’re proud to collaborate with some of the most recognized names in the industry. These partners trust EventBooker to deliver seamless event experiences and innovative solutions.
      </p>
      <div
        className="relative w-full max-w-5xl mx-auto rounded-3xl shadow-xl p-4 md:p-8 overflow-hidden"
        style={{ background: `url('/carousel-bg.jpg') center center / cover no-repeat` }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/60 rounded-3xl z-0" />
        <div className="absolute inset-0 pointer-events-none rounded-3xl border border-white/10 backdrop-blur-xl" />
        <div
          className="logo-carousel flex items-center gap-8 md:gap-14 animate-logo-scroll"
          style={{ height: 112 }} // h-28
          aria-label="Brand logos carousel"
        >
          {[...logos, ...logos].map((logo, idx) => (
            <div
              key={idx}
              className="group flex-shrink-0 flex flex-col items-center justify-center"
              style={{ width: 96 }} // w-24
            >
              <div
                className="bg-white/30 dark:bg-white/10 backdrop-blur-md rounded-full border border-white/30 shadow-md transition-transform duration-300 group-hover:scale-105 group-active:scale-95"
                style={{ width: 72, height: 72, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <img
                  src={logo}
                  alt="Brand logo"
                  className="w-12 h-12 object-contain grayscale group-hover:grayscale-0 transition duration-500"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>
        {/* Gradient mask left */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-gray-900 to-transparent z-10 rounded-l-3xl" />
        {/* Gradient mask right */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-gray-900 to-transparent z-10 rounded-r-3xl" />
      </div>
      {/* Carousel animation styles */}
      <style>{`
        @keyframes logo-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .logo-carousel {
          width: max-content;
          min-width: 100%;
          animation: logo-scroll 32s linear infinite;
        }
        .logo-carousel:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

