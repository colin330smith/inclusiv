import { blogPosts } from '@/lib/blog-data';

export async function GET() {
  const baseUrl = 'https://tryinclusiv.com';

  // Sort posts by date, most recent first
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const jsonFeed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'Inclusiv Accessibility Blog',
    home_page_url: `${baseUrl}/blog`,
    feed_url: `${baseUrl}/blog/feed.json`,
    description:
      'Expert guides, research, and tutorials on web accessibility, EAA compliance, and WCAG best practices for e-commerce businesses.',
    icon: `${baseUrl}/icon-512.png`,
    favicon: `${baseUrl}/favicon.ico`,
    language: 'en-US',
    authors: [
      {
        name: 'Inclusiv Team',
        url: baseUrl,
      },
    ],
    items: sortedPosts.map((post) => ({
      id: `${baseUrl}/blog/${post.slug}`,
      url: `${baseUrl}/blog/${post.slug}`,
      title: post.title,
      summary: post.excerpt,
      content_text: post.description,
      date_published: new Date(post.publishedAt).toISOString(),
      date_modified: post.updatedAt
        ? new Date(post.updatedAt).toISOString()
        : new Date(post.publishedAt).toISOString(),
      authors: [
        {
          name: post.author.name,
          url: baseUrl,
        },
      ],
      tags: post.tags,
    })),
  };

  return new Response(JSON.stringify(jsonFeed, null, 2), {
    headers: {
      'Content-Type': 'application/feed+json',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
