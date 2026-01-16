import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { blogPosts, categories, BlogCategory } from '@/lib/blog-data';
import { ArrowLeft, ArrowRight, Clock, Tag, BookOpen, Zap } from 'lucide-react';

interface PageProps {
  params: Promise<{ tag: string }>;
}

// Get all unique tags from blog posts
function getAllTags(): string[] {
  const tags = new Set<string>();
  blogPosts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag.toLowerCase()));
  });
  return Array.from(tags);
}

// Get posts by tag
function getPostsByTag(tag: string) {
  return blogPosts.filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

// Format tag for display
function formatTag(tag: string): string {
  return tag
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);

  if (posts.length === 0) {
    return { title: 'Not Found' };
  }

  const formattedTag = formatTag(decodedTag);
  const title = `${formattedTag} Articles | Accessibility Blog | Inclusiv`;
  const description = `Browse ${posts.length} articles about ${formattedTag.toLowerCase()}. Expert guides and insights on web accessibility and WCAG compliance.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://inclusiv.dev/blog/tag/${tag}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://inclusiv.dev/blog/tag/${tag}`,
    },
  };
}

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export default async function BlogTagPage({ params }: PageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);

  if (posts.length === 0) {
    notFound();
  }

  const formattedTag = formatTag(decodedTag);
  const allTags = getAllTags();

  // Get related tags (tags that appear in the same posts)
  const relatedTags = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((t) => {
      if (t.toLowerCase() !== decodedTag.toLowerCase()) {
        relatedTags.add(t.toLowerCase());
      }
    });
  });
  const relatedTagsArray = Array.from(relatedTags).slice(0, 8);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${formattedTag} - Inclusiv Blog`,
    description: `Articles about ${formattedTag.toLowerCase()} on the Inclusiv accessibility blog.`,
    url: `https://inclusiv.dev/blog/tag/${tag}`,
    isPartOf: {
      '@type': 'Blog',
      name: 'Inclusiv Accessibility Blog',
      url: 'https://inclusiv.dev/blog',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Inclusiv',
      url: 'https://inclusiv.dev',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-zinc-950">
        {/* Breadcrumb */}
        <div className="border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <nav className="flex items-center gap-2 text-sm text-zinc-500">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
              <span>/</span>
              <span className="text-zinc-300">#{formattedTag}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-zinc-800">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-indigo-500/10" />
          <div className="relative max-w-6xl mx-auto px-4 py-16 sm:py-20">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center">
                <Tag className="w-7 h-7 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-500 uppercase tracking-wider">Tag</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">#{formattedTag}</h1>
              </div>
            </div>
            <p className="text-xl text-zinc-400 max-w-2xl">
              {posts.length} article{posts.length !== 1 ? 's' : ''} tagged with {formattedTag.toLowerCase()}
            </p>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => {
                const category = categories[post.category as BlogCategory];
                return (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                    <article className="h-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                          {category?.name || post.category}
                        </span>
                      </div>
                      <h2 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors mb-2 line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-zinc-400 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-zinc-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readingTime} min read
                        </span>
                        <span>
                          {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Related Tags */}
        {relatedTagsArray.length > 0 && (
          <section className="py-16 border-t border-zinc-800">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-2xl font-bold text-white mb-8">Related Tags</h2>
              <div className="flex flex-wrap gap-3">
                {relatedTagsArray.map((relatedTag) => {
                  const count = getPostsByTag(relatedTag).length;
                  return (
                    <Link
                      key={relatedTag}
                      href={`/blog/tag/${relatedTag}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-lg hover:border-zinc-700 hover:bg-zinc-800/50 transition-colors group"
                    >
                      <Tag className="w-4 h-4 text-zinc-500 group-hover:text-purple-400 transition-colors" />
                      <span className="text-zinc-300 group-hover:text-white transition-colors">
                        {formatTag(relatedTag)}
                      </span>
                      <span className="text-xs text-zinc-600">{count}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* All Tags */}
        <section className="py-16 border-t border-zinc-800">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-white mb-8">Browse All Tags</h2>
            <div className="flex flex-wrap gap-2">
              {allTags.map((t) => {
                const count = getPostsByTag(t).length;
                const isActive = t.toLowerCase() === decodedTag.toLowerCase();
                return (
                  <Link
                    key={t}
                    href={`/blog/tag/${t}`}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-colors ${
                      isActive
                        ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                        : 'bg-zinc-800/50 text-zinc-400 border border-zinc-700/50 hover:bg-zinc-700/50 hover:text-white'
                    }`}
                  >
                    #{formatTag(t)}
                    <span className="text-xs opacity-60">({count})</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 border-t border-zinc-800">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to improve your website&apos;s accessibility?
            </h2>
            <p className="text-zinc-400 mb-8">
              Get an instant accessibility audit with actionable fixes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/#scanner"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors"
              >
                <Zap className="w-5 h-5" />
                Free Accessibility Scan
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-lg transition-colors border border-zinc-700"
              >
                Browse All Articles
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
