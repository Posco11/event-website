import React, { useEffect, useRef, useState } from 'react';
import './event.css';

const eventsData = {
  Music: [{ title: "Chennai Music Fest", city: "Chennai", state: "Tamil Nadu" }],
  Tech: [{ title: "TechSpark Expo", city: "Hyderabad", state: "Telangana" }],
  Art: [{ title: "Bangalore Art Expo", city: "Bangalore", state: "Karnataka" }],
  Business: [{ title: "Startup Summit", city: "Bangalore", state: "Karnataka" }],
  Sports: [{ title: "Mumbai Cricket Carnival", city: "Mumbai", state: "Maharashtra" }],
  Education: [{ title: "EduCon 2025", city: "Chennai", state: "Tamil Nadu" }],
  Fashion: [{ title: "Mumbai Fashion Week", city: "Mumbai", state: "Maharashtra" }],
};

const eventContent = {
  Music: `<h2>🎵 Music Events</h2><p>Discover concerts, live shows, and music festivals near you.</p>`,
  Tech: `<h2>💻 Tech Events</h2><p>Explore hackathons, tech talks, and innovation expos happening soon.</p>`,
  Art: `<h2>🎨 Art Exhibitions</h2><p>Visit galleries, installations, and visual art events curated just for you.</p>`,
  Business: `<h2>📈 Business Meets</h2><p>Attend seminars, networking events, and leadership summits.</p>`,
  Sports: `<h2>🏆 Sports Events</h2><p>Catch up on marathons, tournaments, and local matches live!</p>`,
  Education: `<h2>📚 Education Fairs</h2><p>Participate in workshops, seminars, and academic conferences.</p>`,
  Fashion: `<h2>👗 Fashion Shows</h2><p>Glimpse runway shows and the latest fashion trends.</p>`,
};

const images = [
  { category: 'Music', src: 'https://png.pngtree.com/background/20230610/original/pngtree-abstract-music-design-wallpaper-and-background-music-background-images-picture-image_3108923.jpg' },
  { category: 'Tech', src: 'https://varioproductions.com/wp-content/uploads/2020/02/5-Event-Tech-Trends-to-Watch-Out-For-in-2020-scaled-1-1024x683.jpg' },
  { category: 'Art', src: 'https://img.budgettravel.com/ARTECHOUSE.jpg' },
  { category: 'Business', src: 'https://kongres-magazine.eu/wp-content/uploads/2020/11/dubai_business_events-1.png' },
  { category: 'Sports', src: 'https://cdn.roadtrips.com/wp-content/uploads/2020/07/90055584_10156947845472621_6458710405987434496_o.jpg' },
  { category: 'Education', src: 'https://www.totaldigitalsecurity.com/hubfs/workshop%20people%20white%20board%20rx.jpg' },
  { category: 'Fashion', src: 'https://www.optionstheedge.com/sites/default/files/field/featured-image/2023/dior_designer_of_dreams_-_tokyo_japan_c_daici_ano4.jpg' },
];

function EventCarousel() {
  const [currentIndex, setCurrentIndex] = useState(3);
  const [isAnimating, setIsAnimating] = useState(false);
  const [userLocation, setUserLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const touchStartX = useRef(0);
  const autoScroll = useRef(null);

  const totalCards = images.length;

  const moveCarousel = (dir) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((idx) => (idx + dir + totalCards) % totalCards);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const getClass = (idx) => {
    const pos = (idx - currentIndex + totalCards) % totalCards;
    return ['left3','left2','left1','center','right1','right2','right3'][pos] || 'hidden';
  };

  const getLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const { latitude, longitude } = coords;
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
      const data = await res.json();
      const loc = data.address.state || data.address.city || 'Unknown';
      setUserLocation(loc);
    });
  };

  const startAuto = () => {
    autoScroll.current = setInterval(() => moveCarousel(1), 3000);
  };

  const stopAuto = () => clearInterval(autoScroll.current);

  useEffect(() => {
    getLocation();
    startAuto();
    return () => stopAuto();
  }, []);

  const handleTouchStart = (e) => touchStartX.current = e.changedTouches[0].screenX;
  const handleTouchEnd = (e) => {
    const diff = e.changedTouches[0].screenX - touchStartX.current;
    if (Math.abs(diff) > 50) moveCarousel(diff < 0 ? 1 : -1);
  };

  const renderDetails = () => {
    if (!selectedCategory) return null;
    const contentHTML = eventContent[selectedCategory];
    const nearby = (eventsData[selectedCategory] || [])
      .filter(e => e.city === userLocation || e.state === userLocation);

    return (
      <div className="event-container">
        <div dangerouslySetInnerHTML={{ __html: contentHTML }} />
        {nearby.length > 0
          ? <ul>{nearby.map((ev,i)=><li key={i}>{ev.title} – {ev.city}</li>)}</ul>
          : <p>No local events found near you.</p>}
      </div>
    );
  };

  return (
    <div className="event-carousel">
      <h1>Event Categories</h1>

      <div
        className="carousel-wrapper"
        onMouseEnter={stopAuto}
        onMouseLeave={startAuto}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="carousel">
          {images.map((img, idx) => (
            <div
              key={img.category}
              className={`card ${getClass(idx)}`}
              onClick={() => setSelectedCategory(img.category)}
            >
              <img src={img.src} alt={img.category} />
              <span>{img.category}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="controls">
        <button onClick={() => moveCarousel(-1)}>&lt; Prev</button>
        <button onClick={() => moveCarousel(1)}>Next &gt;</button>
      </div>

      <p id="status">
        {userLocation ? `Location detected: ${userLocation}` : 'Detecting your location...'}
      </p>

      {renderDetails()}
    </div>
  );
}

export default EventCarousel;
