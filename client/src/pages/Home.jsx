import { useEffect, useState } from 'react';
import { Card, FormField, Loader, SkeletonLoader, ErrorMessage } from '../components';
import config from '../config';

const RenderCards = ({ data, title, loading }) => {
  if (loading) {
    return <SkeletonLoader />;
  }

  if (data?.length > 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.map((post) => <Card key={post._id} {...post} />)}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-gray-600 mb-2">{title}</h2>
      <p className="text-gray-500">No images found. Be the first to create one!</p>
    </div>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedResults, setSearchedResults] = useState([]);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${config.API_BASE_URL}/api/v1/post`, { method: 'GET' });

      if (response.ok) {
        const result = await response.json();
        setAllPosts(Array.isArray(result.data) ? result.data.reverse() : []);
      } else {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || `Failed to fetch posts (${response.status})`;
        setError(errorMessage);
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Unable to connect to the server. Please check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (value === '') {
      setSearchedResults([]);
      return;
    }

    const filteredResults = allPosts.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.prompt.toLowerCase().includes(value.toLowerCase())
    );

    setSearchedResults(filteredResults);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          AI Image Gallery
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Discover amazing AI-generated images created by our community. 
          Browse, search, and get inspired by the power of artificial intelligence.
        </p>
      </div>

      {/* Search Section */}
      <div className="mb-8">
        <div className="max-w-2xl mx-auto">
          <FormField
            labelName="Search Gallery"
            type="text"
            name="text"
            placeholder="Search by creator name or prompt..."
            value={searchText}
            handleChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Results Section */}
      <div className="mb-8">
        {searchText && (
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Search Results for <span className="text-blue-600 font-bold">"{searchText}"</span>
            </h2>
            <p className="text-gray-500">
              {searchedResults.length} {searchedResults.length === 1 ? 'result' : 'results'} found
            </p>
          </div>
        )}
      </div>

      {/* Gallery */}
      <div>
        {error ? (
          <ErrorMessage 
            message={error} 
            onRetry={fetchPosts}
          />
        ) : (
          <RenderCards
            data={searchText ? searchedResults : allPosts}
            title={searchText ? 'No Search Results Found' : 'No Images Yet'}
            loading={loading}
          />
        )}
      </div>
    </section>
  );
};

export default Home;

