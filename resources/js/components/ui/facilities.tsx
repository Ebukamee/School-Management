import { useState, useEffect } from 'react';

const Facilities = () => {
  const facilities = [
    {
      image: "lab.png",
      title: "Science Labs",
      description: "Modern laboratories equipped with the latest technology for hands-on learning in biology, chemistry, and physics."
    },
    {
      image: "https://images.unsplash.com/photo-1497636577773-f1231844b336?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "Technology Center",
      description: "Cutting-edge computer labs and innovation spaces with 3D printers and robotics equipment."
    },
    {
      image: "https://images.unsplash.com/photo-1571624436279-b272aff752b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "Sports Complex",
      description: "Comprehensive athletic facilities including swimming pool, courts, and fitness center."
    },
    {
      image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "Arts & Performance",
      description: "Professional auditorium with advanced lighting and sound systems for creative expression."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextFacility = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % facilities.length);
  };

  const prevFacility = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + facilities.length) % facilities.length);
  };

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Large Background Image */}
      <div className="absolute inset-0 transition-all duration-500 ease-in-out">
        <img
          src={facilities[currentIndex].image}
          alt={facilities[currentIndex].title}
          className="w-full h-full object-cover"
        />
        {/* Overlay that turns yellow during transition */}
        <div 
          className={`absolute inset-0 transition-all duration-300 ${
            isTransitioning ? 'bg-yellow-500/80' : 'bg-black/40'
          }`}
        />
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevFacility}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-[#37368b] p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-50"
        disabled={isTransitioning}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextFacility}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-[#37368b] p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-50"
        disabled={isTransitioning}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Facility Indicator */}
            <div className="flex justify-center space-x-2 mb-8">
              {facilities.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isTransitioning) {
                      setIsTransitioning(true);
                      setCurrentIndex(index);
                    }
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-yellow-500 scale-125' 
                      : 'bg-white/60 hover:bg-white'
                  } ${isTransitioning ? 'pointer-events-none' : ''}`}
                />
              ))}
            </div>

            {/* Current Facility Content */}
            <div className={`transform transition-all duration-500 ${
              isTransitioning ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
            }`}>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                {facilities[currentIndex].title}
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
                {facilities[currentIndex].description}
              </p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Facilities;