import { useState } from 'react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
  featured?: boolean;
}

const BlogSection = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [visiblePosts, setVisiblePosts] = useState<number>(6);

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Northwood Students Achieve Record AP Scores",
      excerpt: "Advanced Placement exam results show exceptional performance, with 92% scoring 3 or higher across all subjects.",
      content: "Full content about AP achievements...",
      author: "Dr. Michael Chen",
      authorRole: "Director of Academic Affairs",
      date: "March 15, 2024",
      category: "academics",
      image: "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      readTime: "4 min",
      featured: true
    },
    {
      id: 2,
      title: "STEM Symposium Showcases Student Innovation",
      excerpt: "Students present cutting-edge research projects in mathematics and engineering, demonstrating advanced problem-solving skills.",
      content: "Full content about STEM symposium...",
      author: "Ms. Patricia Roberts",
      authorRole: "Math Department Chair",
      date: "March 12, 2024",
      category: "academics",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      readTime: "3 min"
    },
    {
      id: 3,
      title: "Debate Team Qualifies for National Tournament",
      excerpt: "After rigorous competition, our debate team secured first place in regional championships, advancing to national level.",
      content: "Full content about debate team...",
      author: "Mr. James Wilson",
      authorRole: "Debate Team Coach",
      date: "March 10, 2024",
      category: "academics",
      image: "https://images.unsplash.com/photo-1584697964358-3e14ca57658b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      readTime: "5 min"
    },
    {
      id: 4,
      title: "Class of 2024 College Acceptance Results",
      excerpt: "Seniors receive acceptances from 95 colleges with scholarship offers exceeding $8.5 million.",
      content: "Full content about college acceptances...",
      author: "Ms. Emily Watson",
      authorRole: "College Counseling Director",
      date: "March 8, 2024",
      category: "college",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      readTime: "6 min"
    },
    {
      id: 5,
      title: "Science Olympiad Advances to State Competition",
      excerpt: "Students earn top honors in regional Science Olympiad with exceptional knowledge in biology, chemistry, and physics.",
      content: "Full content about Science Olympiad...",
      author: "Dr. Robert Kim",
      authorRole: "Science Department Chair",
      date: "March 5, 2024",
      category: "academics",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      readTime: "4 min"
    },
    {
      id: 6,
      title: "Literary Magazine Receives National Recognition",
      excerpt: "Student-run publication earns three national awards for excellence in creative writing and design.",
      content: "Full content about literary magazine...",
      author: "Ms. Jennifer Lee",
      authorRole: "English Department Chair",
      date: "March 3, 2024",
      category: "arts",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      readTime: "3 min"
    },
    {
      id: 7,
      title: "Student Government Organizes Annual Food Drive",
      excerpt: "Northwood students collect 2,000 pounds of food for local community shelters.",
      content: "Full content about community service...",
      author: "Mr. David Park",
      authorRole: "Student Activities Director",
      date: "February 28, 2024",
      category: "community",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      readTime: "3 min"
    },
    {
      id: 8,
      title: "Robotics Team Wins Innovation Award",
      excerpt: "Team Hawkbotics demonstrates engineering excellence with autonomous robot design at regional competition.",
      content: "Full content about robotics team...",
      author: "Dr. Robert Kim",
      authorRole: "STEM Coordinator",
      date: "February 25, 2024",
      category: "academics",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      readTime: "4 min"
    }
  ];

  const categories = [
    { id: 'all', label: 'All News' },
    { id: 'academics', label: 'Academics' },
    { id: 'athletics', label: 'Athletics' },
    { id: 'arts', label: 'Arts' },
    { id: 'community', label: 'Community' },
    { id: 'college', label: 'College' }
  ];

  const featuredPost = blogPosts.find(post => post.featured);
  const filteredPosts = activeCategory === 'all' 
    ? blogPosts.filter(post => !post.featured)
    : blogPosts.filter(post => post.category === activeCategory && !post.featured);

  const displayedPosts = filteredPosts.slice(0, visiblePosts);

  const loadMore = () => {
    setVisiblePosts(prev => prev + 3);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full mb-4">
            <div className="w-2 h-2 bg-[#37368b] rounded-full"></div>
            <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">School News</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Latest Updates
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay informed about the latest achievements, events, and announcements from Northwood
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id);
                setVisiblePosts(6);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-[#37368b] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Featured Post - Modern Design */}
        {featuredPost && activeCategory === 'all' && (
          <div className="mb-16">
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#37368b] text-white px-3 py-1.5 rounded-full text-xs font-medium">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-6 lg:p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-medium text-[#37368b] bg-[#37368b]/10 px-2 py-1 rounded">
                      {featuredPost.category}
                    </span>
                    <span className="text-sm text-gray-500">{featuredPost.readTime}</span>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="font-medium text-gray-900">{featuredPost.author}</p>
                      <p className="text-sm text-gray-500">{featuredPost.authorRole}</p>
                    </div>
                    <button className="text-[#37368b] hover:text-[#2a2970] font-medium text-sm flex items-center gap-1 transition-colors">
                      <span>Read More</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayedPosts.map((post) => (
            <article
              key={post.id}
              className="group border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="text-xs font-medium text-[#37368b] bg-white/90 backdrop-blur-sm px-2 py-1 rounded">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-500">{formatDate(post.date)}</span>
                  <span className="text-xs text-gray-500">{post.readTime}</span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{post.author}</p>
                    <p className="text-xs text-gray-500">{post.authorRole}</p>
                  </div>
                  <button className="text-sm text-[#37368b] hover:text-[#2a2970] font-medium transition-colors">
                    Read →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        {visiblePosts < filteredPosts.length && (
          <div className="text-center">
            <button
              onClick={loadMore}
              className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors"
            >
              Load More Stories
            </button>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 lg:p-10">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Stay Connected
              </h3>
              <p className="text-gray-600 mb-6">
                Subscribe to receive school announcements, event updates, and important information
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#37368b] focus:border-transparent"
                />
                <button className="px-6 py-3 bg-[#37368b] text-white font-medium rounded-lg hover:bg-[#2a2970] transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;