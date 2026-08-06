
export function AboutHeroSection() {
  return (
    <div className="bg-[#fbfaf7] font-sans antialiased">
      {/* HERO SECTION */}
      <section className="relative min-h-[600px] bg-[#1a1a1a] overflow-hidden">
        {/* Background Building Image with Gradient Fade */}
        <div 
          className="absolute inset-0 z-0 opacity-100"
          style={{
            backgroundImage: `linear-gradient(to right, #1a1a1a 0%, #1a1a1a 35%, rgba(26,26,26,0.8) 45%, rgba(26,26,26,0) 70%), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')`,
            backgroundPosition: 'right center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-20 pt-24 pb-48">
          <div className="max-w-2xl">
            {/* Top Kicker */}
            <div className="flex items-center gap-4 mb-14">
              <div className="h-[1.5px] w-12 bg-[#b28e5e]"></div>
              <span className="text-[11px] font-bold tracking-[0.25em] text-[#888]">ABOUT</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif-elegant text-white text-[64px] md:text-[84px] leading-[0.92] tracking-[-0.04em] mb-12">
              Where the AEC <br />
              Community <br />
              <span className="italic text-[#b28e5e] font-normal">Connects</span>
            </h1>

            {/* Sub-paragraph */}
            <p className="text-[#999] text-lg leading-[1.6] max-w-[540px]">
              Architecture Events was created with one simple goal: to make it easier for professionals 
              across the Architecture, Engineering, and Construction (AEC) industry to discover 
              meaningful events, build valuable relationships, and stay connected to what's 
              happening in their local community.
            </p>
          </div>
        </div>
      </section>

      {/* OVERLAPPING CARD SECTION */}
      <section className="relative z-20 px-8 lg:px-20">
        <div className="max-w-[1320px] mx-auto ">
          <div className="relative -mt-28 bg-white rounded-[32px] p-10 md:p-16 lg:p-20 shadow-[0_35px_70px_-15px_rgba(0,0,0,0.12)] border border-gray-100">
            <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 items-start">
              
              {/* Left Side: Card Heading */}
              <h2 className="font-serif-elegant text-[#1a1a1a] text-[40px] md:text-[52px] leading-[1.05] tracking-tight">
                Architecture Events brings everything together in one place.
              </h2>

              {/* Right Side: Card Body Text */}
              <div className="space-y-8 text-[#6f6f6f] text-[17px] md:text-[18px] leading-[1.75]">
                <p>
                  For years, industry events have been scattered across association websites, 
                  LinkedIn posts, newsletters, and word of mouth. Finding the right networking 
                  event, product showcase, conference, or educational program often meant 
                  searching multiple sources and hoping you didn't miss something important.
                </p>
                <p>
                  Whether you're an architect, designer, engineer, contractor, developer, 
                  manufacturer, consultant, or student, our platform helps you discover 
                  opportunities to learn, connect, and grow your network.
                </p>
              </div>
              
            </div>
          </div>
        </div>
        
        {/* Bottom Spacing */}
        <div className="h-32 "></div>
      </section>
    </div>
  );
}
