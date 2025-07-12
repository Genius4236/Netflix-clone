import React, { useState, useEffect } from 'react';
import './App.css';
import { 
  Navbar, 
  HeroBanner, 
  ContentRow, 
  VideoModal,
  SearchModal,
  ProfileModal
} from './components';

// TMDB API configuration
const TMDB_API_KEY = 'c8dea14dc917687ac631a52620e4f7ad';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

function App() {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [popularTVShows, setPopularTVShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchAllContent();
  }, []);

  const fetchAllContent = async () => {
    try {
      const [trending, popular, topRated, upcoming, tvShows] = await Promise.all([
        fetch(`${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`).then(res => res.json()),
        fetch(`${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`).then(res => res.json()),
        fetch(`${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}`).then(res => res.json()),
        fetch(`${TMDB_BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}`).then(res => res.json()),
        fetch(`${TMDB_BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}`).then(res => res.json())
      ]);

      setTrendingMovies(trending.results || []);
      setPopularMovies(popular.results || []);
      setTopRatedMovies(topRated.results || []);
      setUpcomingMovies(upcoming.results || []);
      setPopularTVShows(tvShows.results || []);
      
      // Set featured movie as first trending movie
      if (trending.results && trending.results.length > 0) {
        setFeaturedMovie(trending.results[0]);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching content:', error);
      // Fallback to mock data
      setMockData();
      setLoading(false);
    }
  };

  const setMockData = () => {
    const mockMovies = [
      {
        id: 1,
        title: "Stranger Things",
        overview: "A group of friends uncover supernatural mysteries in their small town.",
        backdrop_path: "/path1.jpg",
        poster_path: "/poster1.jpg",
        vote_average: 8.7
      },
      {
        id: 2,
        title: "The Crown",
        overview: "A biographical story about the reign of Queen Elizabeth II.",
        backdrop_path: "/path2.jpg",
        poster_path: "/poster2.jpg",
        vote_average: 8.5
      }
    ];
    
    setTrendingMovies(mockMovies);
    setPopularMovies(mockMovies);
    setTopRatedMovies(mockMovies);
    setUpcomingMovies(mockMovies);
    setPopularTVShows(mockMovies);
    setFeaturedMovie(mockMovies[0]);
  };

  const handlePlay = async (movie) => {
    try {
      const response = await fetch(`${TMDB_BASE_URL}/movie/${movie.id}/videos?api_key=${TMDB_API_KEY}`);
      const data = await response.json();
      const trailer = data.results?.find(video => video.type === 'Trailer' && video.site === 'YouTube');
      
      if (trailer) {
        setSelectedVideo({
          ...movie,
          videoId: trailer.key
        });
      } else {
        // Fallback: search YouTube for trailer
        const searchQuery = `${movie.title || movie.name} trailer`;
        const mockVideoId = 'dQw4w9WgXcQ'; // Rick Roll as fallback
        setSelectedVideo({
          ...movie,
          videoId: mockVideoId
        });
      }
    } catch (error) {
      console.error('Error fetching trailer:', error);
    }
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(`${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`);
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error('Error searching:', error);
      setSearchResults([]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Loading Netflix...</div>
      </div>
    );
  }

  return (
    <div className="App bg-black min-h-screen text-white overflow-x-hidden">
      <Navbar 
        onSearch={() => setShowSearch(true)}
        onProfile={() => setShowProfile(true)}
      />
      
      {featuredMovie && (
        <HeroBanner 
          movie={featuredMovie}
          onPlay={() => handlePlay(featuredMovie)}
          imageBaseUrl={IMAGE_BASE_URL}
        />
      )}

      <div className="relative z-10 -mt-32">
        <ContentRow 
          title="Trending Now" 
          movies={trendingMovies} 
          onMovieClick={handlePlay}
          imageBaseUrl={IMAGE_BASE_URL}
        />
        <ContentRow 
          title="Popular Movies" 
          movies={popularMovies} 
          onMovieClick={handlePlay}
          imageBaseUrl={IMAGE_BASE_URL}
        />
        <ContentRow 
          title="Top Rated" 
          movies={topRatedMovies} 
          onMovieClick={handlePlay}
          imageBaseUrl={IMAGE_BASE_URL}
        />
        <ContentRow 
          title="Coming Soon" 
          movies={upcomingMovies} 
          onMovieClick={handlePlay}
          imageBaseUrl={IMAGE_BASE_URL}
        />
        <ContentRow 
          title="Popular TV Shows" 
          movies={popularTVShows} 
          onMovieClick={handlePlay}
          imageBaseUrl={IMAGE_BASE_URL}
        />
      </div>

      {selectedVideo && (
        <VideoModal 
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}

      {showSearch && (
        <SearchModal
          onClose={() => setShowSearch(false)}
          onSearch={handleSearch}
          results={searchResults}
          onMovieClick={handlePlay}
          imageBaseUrl={IMAGE_BASE_URL}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      )}

      {showProfile && (
        <ProfileModal
          onClose={() => setShowProfile(false)}
        />
      )}
    </div>
  );
}

export default App;