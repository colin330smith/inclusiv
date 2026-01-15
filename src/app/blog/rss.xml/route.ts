import { blogPosts } from '@/lib/blog-data';

export async function GET() {
  const baseUrl = 'https://tryinclusiv.com';

  // Sort posts by date, most recent first
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const rssItems = sortedPosts
    .map((post) => {
      const pubDate = new Date(post.publishedAt).toUTCString();
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${pubDate}</pubDate>
      <category><![CDATA[${post.category}]]></category>
      <author>hello@inclusiv.dev (${post.author.name})</author>
    </item>`;
    })
    .join('');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Inclusiv Accessibility Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Expert guides, research, and tutorials on web accessibility, EAA compliance, and WCAG best practices for e-commerce businesses.</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/og-image.png</url>
      <title>Inclusiv Accessibility Blog</title>
      <link>${baseUrl}/blog</link>
    </image>
    <copyright>© ${new Date().getFullYear()} Inclusiv. All rights reserved.</copyright>
    <webMaster>hello@inclusiv.dev (Inclusiv Team)</webMaster>
    <managingEditor>hello@inclusiv.dev (Inclusiv Team)</managingEditor>
    <category>Web Accessibility</category>
    <category>WCAG Compliance</category>
    <category>European Accessibility Act</category>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
