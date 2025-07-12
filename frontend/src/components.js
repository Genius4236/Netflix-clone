import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import YouTube from 'react-youtube';
import { 
  Search, 
  Bell, 
  User, 
  Play, 
  Info, 
  Plus, 
  ThumbsUp, 
  ChevronDown,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// High-quality images for Netflix clone
const HERO_IMAGES = [
  'https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg',
  'https://images.unsplash.com/photo-1540224871915-bc8ffb782bdf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxuZXRmbGl4JTIwYmFubmVyfGVufDB8fHxibGFja3wxNzQ5NzA0MDQ5fDA&ixlib=rb-4.1.0&q=85'
];

const POSTER_IMAGES = [
  'https://images.unsplash.com/photo-1575919220112-0d5a2dc6a4b6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxhY3Rpb24lMjBtb3ZpZXxlbnwwfHx8YmxhY2t8MTc0OTcwNDA2N3ww&ixlib=rb-4.1.0&q=85',
  'https://images.pexels.com/photos/9944844/pexels-photo-9944844.jpeg',
  'https://images.unsplash.com/photo-1634190969752-e269a0a9e1c2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwxfHxob3Jyb3IlMjBmaWxtfGVufDB8fHxibGFja3wxNzQ5NzA0MDcyfDA&ixlib=rb-4.1.0&q=85',
  'https://images.unsplash.com/photo-1702314968442-6fb052ae9201?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwyfHxob3Jyb3IlMjBmaWxtfGVufDB8fHxibGFja3wxNzQ5NzA0MDcyfDA&ixlib=rb-4.1.0&q=85',
  'https://images.unsplash.com/photo-1590562177087-ca6af9bb82ea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwxfHxzY2ktZmklMjBtb3ZpZXxlbnwwfHx8YmxhY2t8MTc0OTcwNDA3N3ww&ixlib=rb-4.1.0&q=85',
  'https://images.unsplash.com/photo-1655006852875-7912caa28e8e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwyfHxzY2ktZmklMjBtb3ZpZXxlbnwwfHx8YmxhY2t8MTc0OTcwNDA3N3ww&ixlib=rb-4.1.0&q=85',
  'https://images.pexels.com/photos/11565707/pexels-photo-11565707.jpeg',
  'https://images.pexels.com/photos/6659571/pexels-photo-6659571.jpeg',
  'https://images.pexels.com/photos/7451932/pexels-photo-7451932.jpeg',
  'https://images.unsplash.com/photo-1714319017469-1a6750ab2f1c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwzfHxmYW50YXN5JTIwc2VyaWVzfGVufDB8fHxibGFja3wxNzQ5NzA0MDg4fDA&ixlib=rb-4.1.0&q=85',
  'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHBvc3RlcnxlbnwwfHx8YmxhY2t8MTc0OTcwNDA2MHww&ixlib=rb-4.1.0&q=85',
  'https://images.unsplash.com/photo-1590179068383-b9c69aacebd3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwyfHxtb3ZpZSUyMHBvc3RlcnxlbnwwfHx8YmxhY2t8MTc0OTcwNDA2MHww&ixlib=rb-4.1.0&q=85'
];

// Navbar Component
export const Navbar = ({ onSearch, onProfile }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between px-4 md:px-16 py-4">
        <div className="flex items-center space-x-8">
          <motion.h1 
            className="text-red-600 text-2xl md:text-3xl font-bold cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            NETFLIX
          </motion.h1>
          <div className="hidden md:flex space-x-6">
            <NavLink href="#" text="Home" active />
            <NavLink href="#" text="TV Shows" />
            <NavLink href="#" text="Movies" />
            <NavLink href="#" text="New & Popular" />
            <NavLink href="#" text="My List" />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={onSearch}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Search className="w-5 h-5" />
          </motion.button>
          <motion.button
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Bell className="w-5 h-5" />
          </motion.button>
          <motion.button
            onClick={onProfile}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <User className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

const NavLink = ({ href, text, active = false }) => (
  <motion.a
    href={href}
    className={`text-sm font-medium transition-colors ${
      active ? 'text-white' : 'text-gray-300 hover:text-white'
    }`}
    whileHover={{ scale: 1.05 }}
  >
    {text}
  </motion.a>
);

// Hero Banner Component
export const HeroBanner = ({ movie, onPlay, imageBaseUrl }) => {
  const backdropUrl = movie.backdrop_path 
    ? `${imageBaseUrl.replace('w500', 'original')}${movie.backdrop_path}`
    : HERO_IMAGES[0];

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>
      
      <div className="relative z-10 flex items-center h-full px-4 md:px-16">
        <motion.div 
          className="max-w-lg md:max-w-2xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1 
            className="text-3xl md:text-6xl font-bold mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {movie.title || movie.name}
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl mb-8 text-gray-200 leading-relaxed max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            {movie.overview}
          </motion.p>
          
          <motion.div 
            className="flex space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <motion.button
              onClick={onPlay}
              className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded text-lg font-semibold hover:bg-gray-200 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-6 h-6" fill="currentColor" />
              <span>Play</span>
            </motion.button>
            
            <motion.button
              className="flex items-center space-x-2 bg-gray-600 bg-opacity-70 text-white px-8 py-3 rounded text-lg font-semibold hover:bg-gray-500 hover:bg-opacity-70 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Info className="w-6 h-6" />
              <span>More Info</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// Content Row Component
export const ContentRow = ({ title, movies, onMovieClick, imageBaseUrl }) => {
  const scrollRef = useRef(null);
  const [hoveredMovie, setHoveredMovie] = useState(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="px-4 md:px-16 py-8">
      <h2 className="text-xl md:text-2xl font-bold mb-4">{title}</h2>
      
      <div className="relative group">
        <motion.button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll('left')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
        
        <motion.button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll('right')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
        
        <div 
          ref={scrollRef}
          className="flex space-x-2 overflow-x-scroll scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map((movie, index) => (
            <MovieCard
              key={movie.id || index}
              movie={movie}
              imageBaseUrl={imageBaseUrl}
              onClick={() => onMovieClick(movie)}
              fallbackImage={POSTER_IMAGES[index % POSTER_IMAGES.length]}
              onHover={() => setHoveredMovie(movie.id)}
              onLeave={() => setHoveredMovie(null)}
              isHovered={hoveredMovie === movie.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Movie Card Component
const MovieCard = ({ movie, imageBaseUrl, onClick, fallbackImage, onHover, onLeave, isHovered }) => {
  const posterUrl = movie.poster_path 
    ? `${imageBaseUrl}${movie.poster_path}`
    : fallbackImage;

  return (
    <motion.div
      className="flex-shrink-0 w-48 cursor-pointer relative"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative rounded overflow-hidden">
        <img
          src={posterUrl}
          alt={movie.title || movie.name}
          className="w-full h-72 object-cover"
          loading="lazy"
        />
        
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-center">
                <motion.button
                  onClick={onClick}
                  className="bg-white text-black p-3 rounded-full mb-2 hover:bg-gray-200 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Play className="w-6 h-6" fill="currentColor" />
                </motion.button>
                
                <div className="flex justify-center space-x-2">
                  <motion.button
                    className="bg-gray-600 bg-opacity-70 p-2 rounded-full hover:bg-gray-500 transition-colors"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    className="bg-gray-600 bg-opacity-70 p-2 rounded-full hover:bg-gray-500 transition-colors"
                    whileHover={{ scale: 1.1 }}
                  >
                    <ThumbsUp className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    className="bg-gray-600 bg-opacity-70 p-2 rounded-full hover:bg-gray-500 transition-colors"
                    whileHover={{ scale: 1.1 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.button>
                </div>
                
                <div className="mt-2 text-sm">
                  <div className="text-green-400 font-semibold">
                    {Math.round(movie.vote_average * 10)}% Match
                  </div>
                  <div className="text-gray-300 text-xs mt-1">
                    {movie.title || movie.name}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Video Modal Component
export const VideoModal = ({ video, onClose }) => {
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 1,
      rel: 0,
      showinfo: 0,
      modestbranding: 1
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <motion.button
            className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full transition-colors"
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-6 h-6" />
          </motion.button>
          
          <YouTube
            videoId={video.videoId}
            opts={opts}
            className="w-full h-full"
          />
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
            <h3 className="text-xl font-bold mb-2">{video.title || video.name}</h3>
            <p className="text-gray-300 text-sm max-w-2xl">{video.overview}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Search Modal Component
export const SearchModal = ({ onClose, onSearch, results, onMovieClick, imageBaseUrl, searchQuery, setSearchQuery }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-95 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="p-4 md:p-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4 flex-1">
              <Search className="w-6 h-6" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for movies, TV shows..."
                className="bg-transparent text-white text-xl placeholder-gray-400 flex-1 outline-none"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <motion.button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6" />
            </motion.button>
          </div>

          {results.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {results.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="cursor-pointer"
                  onClick={() => onMovieClick(item)}
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <img
                    src={item.poster_path 
                      ? `${imageBaseUrl}${item.poster_path}`
                      : POSTER_IMAGES[index % POSTER_IMAGES.length]
                    }
                    alt={item.title || item.name}
                    className="w-full h-64 object-cover rounded"
                  />
                  <p className="text-sm mt-2 text-center truncate">{item.title || item.name}</p>
                </motion.div>
              ))}
            </div>
          )}

          {searchQuery && results.length === 0 && (
            <div className="text-center text-gray-400 mt-16">
              <p className="text-xl">No results found for "{searchQuery}"</p>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// Profile Modal Component
export const ProfileModal = ({ onClose }) => {
  const profiles = [
    { name: 'John', avatar: '👤' },
    { name: 'Jane', avatar: '👤' },
    { name: 'Kids', avatar: '👶' }
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="text-center"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-4xl font-light mb-8">Who's watching?</h2>
          
          <div className="flex space-x-8 justify-center">
            {profiles.map((profile, index) => (
              <motion.div
                key={profile.name}
                className="text-center cursor-pointer group"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded flex items-center justify-center text-4xl mb-4 group-hover:ring-4 group-hover:ring-white transition-all">
                  {profile.avatar}
                </div>
                <p className="text-gray-400 group-hover:text-white transition-colors">
                  {profile.name}
                </p>
              </motion.div>
            ))}
          </div>
          
          <motion.button
            className="mt-8 bg-gray-600 hover:bg-gray-500 px-6 py-2 rounded transition-colors"
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Manage Profiles
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};