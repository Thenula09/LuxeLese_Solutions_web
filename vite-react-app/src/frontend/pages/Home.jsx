const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-10 bg-white shadow-lg py-4 px-6 sm:px-10 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        {/* A simple text-based logo. */}
        <span className="text-xl sm:text-2xl font-bold text-gray-800">My App</span>
      </div>
      <ul className="flex items-center space-x-4 sm:space-x-6">
        {/* Navigation links. The href="#" links to the top of the page. */}
        <li>
          <a href="#" className="text-gray-600 hover:text-blue-600 transition duration-300 ease-in-out font-medium text-sm sm:text-base">Home</a>
        </li>
        {/* These links would typically be used for scrolling to different sections on a single-page app. */}
        <li>
          <a href="#about" className="text-gray-600 hover:text-blue-600 transition duration-300 ease-in-out font-medium text-sm sm:text-base">About</a>
        </li>
        <li>
          <a href="#contact" className="text-gray-600 hover:text-blue-600 transition duration-300 ease-in-out font-medium text-sm sm:text-base">Contact</a>
        </li>
      </ul>
    </nav>
  );
};
// --- End of Navbar Component ---

// --- Start of Home Component ---
// This component displays the content for the home page.
const Home = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-10 text-center">
      {/* Hero section with a title and description. */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 animate-fade-in">
        Welcome to Our Awesome Project!
      </h1>
      <p className="text-base sm:text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
        This is a beautiful and responsive landing page built with React and Tailwind CSS.
        It's a great starting point for your next project.
      </p>

      {/* Hero Image section. */}
      <div className="mb-12 rounded-lg overflow-hidden shadow-xl">
        {/* Placeholder image that you can replace with your own. */}
        <img
          src="https://placehold.co/1200x600/60a5fa/ffffff?text=Your+Project+Hero"
          alt="Project Hero"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Feature Cards section using a grid layout. */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Reusable card component for features. */}
        <FeatureCard
          title="Feature One"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
        <FeatureCard
          title="Feature Two"
          description="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        />
        <FeatureCard
          title="Feature Three"
          description="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        />
      </div>

      {/* Call to Action (CTA) section. */}
      <div className="mt-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-4">Ready to Get Started?</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-colors duration-300 transform hover:-translate-y-1">
          Learn More
        </button>
      </div>
    </div>
  );
};

// A reusable functional component for the feature cards.
const FeatureCard = ({ title, description }) => {
  return (
    <div className="bg-blue-50 rounded-xl p-6 text-left shadow-md border-b-4 border-blue-500 transform hover:scale-105 transition-transform duration-300">
      <h3 className="text-xl font-bold text-blue-700 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};
// --- End of Home Component ---

// Export the main App component as the default.
export default App;
