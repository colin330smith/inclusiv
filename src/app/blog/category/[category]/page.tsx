import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  blogPosts,
  categories,
  getBlogPostsByCategory,
  BlogCategory,
} from '@/lib/blog-data';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  BookOpen,
  Shield,
  TrendingUp,
  Zap,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ category: string }>;
}

function isCategory(slug: string): slug is BlogCategory {
  return slug in categories;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params;

  if (!isCategory(slug)) {
    return { title: 'Not Found' };
  }

  const category = categories[slug];
  const title = `${category.name} | Accessibility Blog | Inclusiv`;
  const description = `${category.description}. Expert guides and articles about web accessibility.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://inclusiv.dev/blog/category/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://inclusiv.dev/blog/category/${slug}`,
    },
  };
}

export function generateStaticParams() {
  return Object.keys(categories).map((category) => ({ category }));
}

const categoryIcons: Record<BlogCategory, typeof BookOpen> = {
  guides: BookOpen,
  compliance: Shield,
  wcag: TrendingUp,
  'case-studies': Zap,
  news: Calendar,
  tools: Clock,
};

export default async function BlogCategoryPage({ params }: PageProps) {
  const { category: slug } = await params;

  if (!isCategory(slug)) {
    notFound();
  }

  const category = categories[slug];
  const posts = getBlogPostsByCategory(slug);
  const Icon = categoryIcons[slug];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.name} - Inclusiv Blog`,
    description: category.description,
    url: `https://inclusiv.dev/blog/category/${slug}`,
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
              <span className="text-zinc-300">{category.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-zinc-800">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10" />
          <div className="relative max-w-6xl mx-auto px-4 py-16 sm:py-20">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                <Icon className="w-7 h-7 text-indigo-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-500 uppercase tracking-wider">Category</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">{category.name}</h1>
              </div>
            </div>
            <p className="text-xl text-zinc-400 max-w-2xl">{category.description}</p>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            {posts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                    <article className="h-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                          {category.name}
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
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <BookOpen className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-white mb-2">No articles yet</h2>
                <p className="text-zinc-400 mb-6">
                  We are working on new content for this category.
                </p>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  View All Articles
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Other Categories */}
        <section className="py-16 border-t border-zinc-800">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-white mb-8">Explore Other Categories</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(Object.entries(categories) as [BlogCategory, { name: string; description: string }][])
                .filter(([key]) => key !== slug)
                .map(([key, cat]) => {
                  const CategoryIcon = categoryIcons[key];
                  const postCount = getBlogPostsByCategory(key).length;
                  return (
                    <Link
                      key={key}
                      href={`/blog/category/${key}`}
                      className="flex items-center gap-4 p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center group-hover:bg-indigo-500/10 transition-colors">
                        <CategoryIcon className="w-5 h-5 text-zinc-400 group-hover:text-indigo-400 transition-colors" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-medium group-hover:text-indigo-400 transition-colors">
                          {cat.name}
                        </h3>
                        <p className="text-xs text-zinc-500">{postCount} articles</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-indigo-400 transition-colors" />
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
