"use client";

import Link from 'next/link';
import { Shield, Clock, ArrowRight, BookOpen, Calendar, Tag, TrendingUp, FileText, Search } from 'lucide-react';
import { useState } from 'react';

// Calculate days until EAA deadline
const getDeadlineInfo = () => {
  const deadline = new Date("2025-06-28");
  const today = new Date();
  const diffTime = deadline.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return { days: diffDays, deadline };
};

const blogPosts = [
  {
    slug: 'eaa-compliance-guide-2025',
    title: 'The Complete Guide to EAA Compliance for E-commerce in 2025',
    excerpt: 'Everything you need to know about the European Accessibility Act requirements, deadlines, penalties, and step-by-step compliance strategies for your online store.',
    category: 'Compliance Guide',
    readTime: '15 min read',
    date: 'January 2025',
    featured: true,
    tags: ['EAA', 'Compliance', 'E-commerce', 'WCAG'],
  },
  {
    slug: 'eu-ecommerce-accessibility-study',
    title: 'We Scanned 500 EU E-commerce Sites: Here\'s What We Found',
    excerpt: 'Our comprehensive study reveals the current state of accessibility across European online stores. Discover the most common violations, industry benchmarks, and what top performers do differently.',
    category: 'Research',
    readTime: '12 min read',
    date: 'January 2025',
    featured: true,
    tags: ['Research', 'Data', 'EU', 'E-commerce'],
  },
  {
    slug: 'shopify-wcag-violations',
    title: '10 Most Common WCAG Violations in Shopify Stores (And How to Fix Them)',
    excerpt: 'A practical guide to identifying and fixing the accessibility issues we see most often in Shopify stores. Includes code examples and step-by-step solutions.',
    category: 'Tutorials',
    readTime: '10 min read',
    date: 'January 2025',
    featured: false,
    tags: ['Shopify', 'WCAG', 'Tutorial', 'Code'],
  },
  {
    slug: 'eaa-vs-ada-comparison',
    title: 'EAA vs ADA: Understanding Accessibility Laws for Global E-commerce',
    excerpt: 'A comprehensive comparison of the European Accessibility Act and Americans with Disabilities Act. Learn how to navigate both regulations for your international online business.',
    category: 'Legal',
    readTime: '11 min read',
    date: 'January 2025',
    featured: false,
    tags: ['EAA', 'ADA', 'Legal', 'Global'],
  },
  {
    slug: 'accessibility-statement-guide',
    title: 'How to Create an Accessibility Statement That Actually Protects Your Business',
    excerpt: 'Learn how to write an accessibility statement that meets legal requirements, builds user trust, and provides genuine protection for your business. Includes templates and examples.',
    category: 'Legal',
    readTime: '9 min read',
    date: 'January 2025',
    featured: false,
    tags: ['Legal', 'Template', 'Best Practices'],
  },
];

const categories = [
  { name: 'All Posts', count: 5 },
  { name: 'Compliance Guide', count: 1 },
  { name: 'Research', count: 1 },
  { name: 'Tutorials', count: 1 },
  { name: 'Legal', count: 2 },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All Posts');
  const [searchQuery, setSearchQuery] = useState('');
  const deadlineInfo = getDeadlineInfo();

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'All Posts' || post.category === activeCategory;
    const matchesSearch = searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-indigo-500" />
            <span className="text-xl font-bold text-white">Inclusiv</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/blog" className="text-indigo-400 font-medium text-sm">
              Blog
            </Link>
            <Link href="/pricing" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">
              Pricing
            </Link>
            <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 rounded-full text-sm text-red-400">
              <Clock className="w-4 h-4" />
              <span className="font-semibold">{deadlineInfo.days} days until EAA deadline</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-sm mb-6">
            <BookOpen className="w-4 h-4" />
            Web Accessibility Insights
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Inclusiv <span className="bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">Blog</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Expert guides, research, and tutorials on web accessibility, EAA compliance,
            and WCAG best practices for e-commerce businesses.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-12 pr-4 py-4 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        {/* Featured Posts */}
        {searchQuery === '' && activeCategory === 'All Posts' && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-indigo-500" />
              Featured Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 rounded-2xl p-8 hover:border-indigo-500/50 transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                    <span className="text-zinc-500 text-sm">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-zinc-400 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-indigo-400 font-medium">
                    Read article
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.name
                  ? 'bg-indigo-600 text-white'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* All Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-zinc-800 text-zinc-400 text-xs font-semibold rounded-full">
                  {post.category}
                </span>
                <span className="text-zinc-600 text-sm flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-zinc-400 text-sm mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-xs text-zinc-500">
                      #{tag}
                    </span>
                  ))}
                </div>
                <span className="text-zinc-500 text-sm">{post.readTime}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No articles found</h3>
            <p className="text-zinc-400">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Stay Updated on Accessibility</h2>
          <p className="text-indigo-100 mb-6 max-w-xl mx-auto">
            Get the latest insights on EAA compliance, WCAG updates, and accessibility
            best practices delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-indigo-200 focus:outline-none focus:border-white/40"
            />
            <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        {/* Scanner CTA */}
        <div className="mt-12 bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Check Your Site's Accessibility</h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Get an instant compliance score and actionable fixes for your website.
            Free scan, no signup required.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors"
          >
            <Shield className="w-5 h-5" />
            Free Accessibility Scan
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-24">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-zinc-500 text-sm">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            <span>Inclusiv 2025</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <Link href="/eaa-guide" className="hover:text-white transition-colors">EAA Guide</Link>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
          </div>
          <div>
            Powered by axe-core - WCAG 2.1 AA
          </div>
        </div>
      </footer>
    </div>
  );
}
