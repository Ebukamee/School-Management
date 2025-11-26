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
      title: "Academic Excellence: Northwood Students Achieve Record AP Scores",
      excerpt: "This year's Advanced Placement exam results showcase our students' exceptional performance, with 92% scoring 3 or higher across all subjects.",
      content: "Full content about AP achievements...",
      author: "Dr. Michael Chen",
      authorRole: "Director of Academic Affairs",
      date: "March 15, 2024",
      category: "academics",
      image: "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      readTime: "4 min read",
      featured: true
    },
    {
      id: 2,
      title: "Mathematics Department Hosts Annual STEM Symposium",
      excerpt: "Students presented innovative research projects in mathematics and engineering, demonstrating advanced problem-solving skills.",
      content: "Full content about STEM symposium...",
      author: "Ms. Patricia Roberts",
      authorRole: "Mathematics Department Chair",
      date: "March 12, 2024",
      category: "academics",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      readTime: "3 min read"
    },
    {
      id: 3,
      title: "Northwood Debate Team Qualifies for National Tournament",
      excerpt: "After rigorous competition, our debate team secured first place in regional championships, advancing to national level.",
      content: "Full content about debate team...",
      author: "Mr. James Wilson",
      authorRole: "Debate Team Coach",
      date: "March 10, 2024",
      category: "academics",
      image: "https://images.unsplash.com/photo-1584697964358-3e14ca57658b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      readTime: "5 min read"
    },
    {
      id: 4,
      title: "College Counseling: Class of 2024 Acceptance Results",
      excerpt: "Our seniors have received acceptances from 95 different colleges and universities, with scholarship offers exceeding $8.5 million.",
      content: "Full content about college acceptances...",
      author: "Ms. Emily Watson",
      authorRole: "College Counseling Director",
      date: "March 8, 2024",
      category: "college",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      readTime: "6 min read"
    },
    {
      id: 5,
      title: "Science Olympiad Team Advances to State Competition",
      excerpt: "Students demonstrated exceptional knowledge in biology, chemistry, and physics, earning top honors in regional Science Olympiad.",
      content: "Full content about Science Olympiad...",
      author: "Dr. Robert Kim",
      authorRole: "Science Department Chair",
      date: "March 5, 2024",
      category: "academics",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      readTime: "4 min read"
    },
    {
      id: 6,
      title: "Literary Magazine Receives National Recognition",
      excerpt: "Northwood's student-run literary publication earned three national awards for excellence in creative writing and design.",
      content: "Full content about literary magazine...",
      author: "Ms. Jennifer Lee",
      authorRole: "English Department Chair",
      date: "March 3, 2024",
      category: "arts",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      readTime: "3 min read"
    },
    {
      id: 7,
      title: "Student Government Organizes Annual Food Drive",
      excerpt: "Northwood students collected over 2,000 pounds of food for local community shelters, demonstrating civic responsibility.",
      content: "Full content about community service...",
      author: "Mr. David Park",
      authorRole: "Student Activities Director",
      date: "February 28, 2024",
      category: "community",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      readTime: "3 min read"
    },
    {
      id: 8,
      title: "Robotics Team Wins Innovation Award at Regional Competition",
      excerpt: "Team Hawkbotics demonstrated engineering excellence with their autonomous robot design, earning the prestigious Innovation Award.",
      content: "Full content about robotics team...",
      author: "Dr. Robert Kim",
      authorRole: "STEM Coordinator",
      date: "February 25, 2024",
      category: "academics",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      readTime: "4 min read"
    },
    {
      id: 9,
      title: "Foreign Language Department Hosts Cultural Festival",
      excerpt: "Students celebrated linguistic diversity through performances, cuisine, and presentations representing 15 different cultures.",
      content: "Full content about cultural festival...",
      author: "Ms. Maria Rodriguez",
      authorRole: "Foreign Language Department Chair",
      date: "February 22, 2024",
      category: "academics",
      image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      readTime: "3 min read"
    },
    {
      id: 10,
      title: "Athletic Department Announces Spring Sports Tryouts",
      excerpt: "Information session scheduled for students interested in baseball, track and field, tennis, and lacrosse teams.",
      content: "Full content about spring sports...",
      author: "Coach Rodriguez",
      authorRole: "Athletic Director",
      date: "February 20, 2024",
      category: "athletics",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      readTime: "2 min read"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Announcements' },
    { id: 'academics', label: 'Academic News' },
    { id: 'athletics', label: 'Athletics' },
    { id: 'arts', label: 'Arts & Culture' },
    { id: 'community', label: 'Community Service' },
    { id: 'college', label: 'College Planning' }
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
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 mb-4">
            <div className="w-2 h-2 bg-[#dc2626] rounded-full mr-2"></div>
            <span className="text-sm font-semibold text-gray-600">SCHOOL ANNOUNCEMENTS</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e40af] mb-4">
            Northwood School News
          </h2>
          <div className="w-24 h-1 bg-[#dc2626] mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Official announcements, academic achievements, and important updates from Northwood High School administration.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id);
                setVisiblePosts(6);
              }}
              className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 border ${
                activeCategory === category.id
                  ? 'bg-[#1e40af] text-white border-[#1e40af] shadow-lg'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-[#1e40af] hover:text-[#1e40af]'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {featuredPost && activeCategory === 'all' && (
          <div className="mb-16 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative h-64 lg:h-auto">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#dc2626] text-white px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide">
                    Featured Announcement
                  </span>
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center border-l-0 lg:border-l border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-blue-100 text-[#1e40af] px-3 py-1 rounded-full text-sm font-semibold capitalize">
                    {featuredPost.category}
                  </span>
                  <span className="text-gray-500 text-sm">{featuredPost.readTime}</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {featuredPost.title}
                </h3>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <p className="font-semibold text-gray-900">{featuredPost.author}</p>
                    <p className="text-gray-500 text-sm">{featuredPost.authorRole}</p>
                    <p className="text-gray-400 text-xs mt-1">{formatDate(featuredPost.date)}</p>
                  </div>
                  <button className="bg-[#1e40af] hover:bg-[#1e3a8a] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Read Full Announcement
                  </button>
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
              className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 group"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-[#1e40af] text-white px-2.5 py-1 rounded-full text-xs font-semibold capitalize">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-500 text-xs font-medium">{formatDate(post.date)}</span>
                  <span className="text-gray-500 text-xs">{post.readTime}</span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 leading-snug group-hover:text-[#1e40af] transition-colors duration-300">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="pt-4 border-t border-gray-100">
                  <p className="font-semibold text-gray-700 text-sm">{post.author}</p>
                  <p className="text-gray-500 text-xs">{post.authorRole}</p>
                  <button className="mt-3 text-[#1e40af] hover:text-[#1e3a8a] font-semibold text-sm flex items-center space-x-1 transition-colors duration-300">
                    <span>View Details</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
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
              className="bg-white border-2 border-[#1e40af] text-[#1e40af] hover:bg-[#1e40af] hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              Load More Announcements
            </button>
          </div>
        )}

        {/* Official Communication CTA */}
        <div className="mt-16 bg-white rounded-2xl p-8 lg:p-12 text-center border-2 border-[#1e40af] shadow-lg">
          <div className="w-16 h-16 bg-[#1e40af] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-[#1e40af] mb-4">
            Official School Communications
          </h3>
          <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
            Subscribe to receive official school announcements, emergency notifications, and important academic updates directly from Northwood High School administration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Parent/Guardian email address"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent"
            />
            <button className="bg-[#dc2626] hover:bg-[#b91c1c] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap shadow-lg">
              Subscribe to Updates
            </button>
          </div>
          <p className="text-gray-500 text-sm mt-4">
            Official communications only. We respect your privacy and will not share your information.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;