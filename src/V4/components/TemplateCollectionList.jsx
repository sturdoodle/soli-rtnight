import { useState } from 'react';
import LivePreview from './templates/LivePreview';
import PrintableLeaflive from './templates/Leaflive';
import Template1 from './assets/Template1.png'
import Template2 from './assets/Template2.png'
import Coming_Soon from './assets/Coming_Soon.png'

// --- Mock Data (Replace with your actual API data) ---
const blogPosts = [
  {
    id: 1,
    title: "Template 1",
    category: "Resume",
    image: Template1,
  },
  {
    id: 2,
    title: "Template 2",
    category: "Resume",
    image: Template2,
  },
  {
    id: null,
    title: "Soon...",
    category: "+",
    image: Coming_Soon,
  }
];

// --- Card Component (Modified to accept an onClick handler) ---
const BlogPostCard = ({ post, onPostClick }) => {
  return (
    // The main card container
    <div className="card-container relative bg-white shadow-lg overflow-hidden group ">

      {/* 1. Image and Overlay */}
      <div className="h-[250px] w-full overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition duration-300 transform group-hover:scale-110"
        />
        {/* Dark Overlay to mimic the low light/moody image appearance */}
        <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-20 transition duration-300"></div>
      </div>
      
      {/* 2. Category Tag (Top Right) */}
      <div className="absolute top-4 right-4">
        <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-indigo-700 rounded-lg shadow-md">
          {post.category}
        </span>
      </div>

      {/* Action layer made clickable, calling the passed handler */}
      <div
        className="absolute inset-0 cursor-pointer"
        // Call the prop function, passing the post ID
        onClick={() => onPostClick(post.id)}
      />
      
      {/* 3. Title (Bottom Left - Added for completeness/UX, though not in original request) */}
       <div className="absolute bottom-4 left-4 p-2 bg-black bg-opacity-50 backdrop-blur-sm rounded-md max-w-[80%]">
          <h3 className="text-sm  text-white">
            {post.title}
          </h3>
       </div>
    </div>
  );
};


// --- Placeholder Component for the new UI ---
const AbcCompo = ({ postId, onBack, formData}) => {
  if (postId===1){
    return (
      <div className="card-container min-h-[500px] flex flex-col items-center justify-center">
        <LivePreview formData={formData} back={onBack}/>
      </div>
    )
  }
  else if(postId===2){
    return (
      <div className="card-container min-h-[500px] flex flex-col items-center justify-center">
        <PrintableLeaflive data={formData} back={onBack}/>
      </div>
    )
  }
  // return (
  //   // <div className="bg-gray-100 p-8 min-h-[500px] flex flex-col items-center justify-center">
  //   <div className="card-container min-h-[500px] flex flex-col items-center justify-center">
  //     <h2 className="text-3xl font-bold text-indigo-700 mb-4">
  //       Details for Post ID: {postId}
  //     </h2>

      
  //     <LivePreview formData={formData}/>
  //     <div className='p-4'>
  //     <button
  //       onClick={onBack}
  //       className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition duration-150"
  //     >
  //       ← Back to Template 
  //     </button>
  //     </div>
  //   </div>
  // );
};


// --- Main Section Component (Modified to use state for conditional rendering) ---
const TemplateCollectionList = (props) => {
  // State to track which post is currently selected (null means show grid)
  const [selectedPostId, setSelectedPostId] = useState(null);

  // Function to handle card click: sets the state to the clicked post's ID
  const handlePostClick = (postId) => {
    setSelectedPostId(postId);
    // console.log(`Post ID selected: ${postId}`);
  };

  // Function to handle back button click in the new component: resets the state to null
  const handleBack = () => {
    setSelectedPostId(null);
  };

  // Conditional Rendering Logic:
  if (selectedPostId !== null) {
    // If a post is selected, render the detail component
    return <AbcCompo postId={selectedPostId} onBack={handleBack} formData={props?.formData}/>;
  }

  // Otherwise, render the main blog post grid section
  return (
    <div className="card-container">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 bg-white">

        {/* Header Section: "COOKING BLOG" and "See All" */}
        <header className="flex justify-between items-end border-b border-gray-200 pb-3 mb-8">

          {/* Title and Icon */}
          <div className="flex flex-col">
            <div className="flex items-center">
              <h1 className="text-sm font-semibold text-gray-800 uppercase tracking-widest">
                Resume Template
              </h1>
            </div>
            {/* Blue underline matching the image */}
            <div className="w-24 h-0.5 bg-indigo-600 mt-2"></div>
          </div>
        </header>

        {/* Blog Posts Grid */}
        <main>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map(post => (
              <BlogPostCard
                key={post.id}
                post={post}
                onPostClick={handlePostClick} // Pass the handler to the card
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TemplateCollectionList;