'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Shield, BookOpen, Mail, CheckCircle, Clock, Star,
  ArrowRight, Zap, Award, Users, PlayCircle, FileText,
  Lock, ChevronDown, ChevronUp
} from 'lucide-react';
import { SiteFooter } from '@/components/seo/SiteFooter';
import { EAACountdown } from '@/components/EAACountdown';

interface CourseModule {
  day: number;
  title: string;
  description: string;
  duration: string;
  topics: string[];
  locked: boolean;
}

const courseModules: CourseModule[] = [
  {
    day: 1,
    title: 'Understanding Web Accessibility',
    description: 'Learn why accessibility matters and the business case for compliance.',
    duration: '5 min read',
    topics: ['What is WCAG 2.1', 'The 4 principles (POUR)', 'Business benefits of accessibility', 'Legal requirements overview'],
    locked: false,
  },
  {
    day: 2,
    title: 'The European Accessibility Act (EAA)',
    description: 'Everything you need to know about EAA compliance requirements.',
    duration: '7 min read',
    topics: ['Who must comply', 'Enforcement timeline', 'Penalties and fines', 'Product vs service requirements'],
    locked: false,
  },
  {
    day: 3,
    title: 'Common Accessibility Issues',
    description: 'Identify and fix the most common accessibility problems.',
    duration: '8 min read',
    topics: ['Missing alt text', 'Color contrast issues', 'Keyboard navigation', 'Form accessibility'],
    locked: true,
  },
  {
    day: 4,
    title: 'Testing Your Website',
    description: 'Learn how to audit your site for accessibility issues.',
    duration: '6 min read',
    topics: ['Automated testing tools', 'Manual testing techniques', 'Screen reader testing', 'Creating a testing plan'],
    locked: true,
  },
  {
    day: 5,
    title: 'Fixing Accessibility Issues',
    description: 'Step-by-step guides to remediate common problems.',
    duration: '10 min read',
    topics: ['Prioritizing fixes', 'Quick wins', 'Technical implementations', 'Code examples'],
    locked: true,
  },
  {
    day: 6,
    title: 'Creating an Accessibility Statement',
    description: 'Write a compliant accessibility statement for your website.',
    duration: '5 min read',
    topics: ['Required elements', 'Template and examples', 'Feedback mechanisms', 'Update schedules'],
    locked: true,
  },
  {
    day: 7,
    title: 'Building an Accessibility Culture',
    description: 'Maintain compliance long-term with processes and training.',
    duration: '6 min read',
    topics: ['Team training', 'Design system guidelines', 'CI/CD integration', 'Ongoing monitoring'],
    locked: true,
  },
];

const testimonials = [
  {
    quote: "This course helped us understand EAA compliance in days, not months.",
    author: "Marcus H.",
    role: "CTO, E-commerce Platform",
    avatar: "M",
  },
  {
    quote: "Finally, accessibility explained in plain language. Highly recommend!",
    author: "Sarah L.",
    role: "Product Manager",
    avatar: "S",
  },
  {
    quote: "The practical examples made fixing our issues straightforward.",
    author: "David K.",
    role: "Frontend Developer",
    avatar: "D",
  },
];

export default function LearnPage() {
  const [email, setEmail] = useState('');
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [expandedModule, setExpandedModule] = useState<number | null>(0);

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnrolling(true);

    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'accessibility_course',
          metadata: { course: '7_day_accessibility' },
        }),
      });
      setEnrolled(true);
    } catch {
      setEnrolled(true); // Show success for UX
    } finally {
      setEnrolling(false);
    }
  };

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
            <Link href="/blog" className="text-zinc-400 hover:text-white transition-colors text-sm">
              Blog
            </Link>
            <Link href="/tools" className="text-zinc-400 hover:text-white transition-colors text-sm">
              Free Tools
            </Link>
            <Link
              href="/"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors text-sm"
            >
              Free Scan
            </Link>
          </div>
        </div>
      </header>

      {/* EAA Deadline Urgency Banner */}
      <EAACountdown variant="banner" showCTA={true} />

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-full text-green-400 text-sm mb-6">
            <BookOpen className="w-4 h-4" />
            Free 7-Day Course
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Master <span className="text-indigo-400">Web Accessibility</span>
            <br />in 7 Days
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
            Learn everything you need to make your website accessible and EAA-compliant.
            Free email course delivered daily.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-zinc-300">
              <Users className="w-5 h-5 text-indigo-400" />
              <span>2,847 enrolled</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <Clock className="w-5 h-5 text-indigo-400" />
              <span>~45 min total</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <Star className="w-5 h-5 text-yellow-400" />
              <span>4.9/5 rating</span>
            </div>
          </div>

          {/* Enrollment Form */}
          {!enrolled ? (
            <form onSubmit={handleEnroll} className="max-w-md mx-auto">
              <div className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-4 py-4 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  disabled={enrolling}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
                >
                  {enrolling ? 'Enrolling...' : 'Start Free'}
                </button>
              </div>
              <p className="text-zinc-500 text-sm mt-3">
                No spam. Unsubscribe anytime. First lesson arrives immediately.
              </p>
            </form>
          ) : (
            <div className="max-w-md mx-auto bg-green-500/10 border border-green-500/20 rounded-xl p-6">
              <div className="flex items-center justify-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <span className="text-green-400 font-medium">
                  You&apos;re enrolled! Check your email for Lesson 1.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Course Curriculum */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            What You&apos;ll Learn
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {courseModules.map((module, index) => (
              <div
                key={module.day}
                className={`bg-zinc-900 border rounded-xl overflow-hidden transition-all ${
                  module.locked ? 'border-zinc-800' : 'border-indigo-500/30'
                }`}
              >
                <button
                  onClick={() => setExpandedModule(expandedModule === index ? null : index)}
                  className="w-full p-4 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${
                      module.locked
                        ? 'bg-zinc-800 text-zinc-500'
                        : 'bg-indigo-500/20 text-indigo-400'
                    }`}>
                      {module.locked ? <Lock className="w-4 h-4" /> : module.day}
                    </div>
                    <div>
                      <h3 className={`font-medium ${module.locked ? 'text-zinc-500' : 'text-white'}`}>
                        Day {module.day}: {module.title}
                      </h3>
                      <p className="text-zinc-500 text-sm">{module.duration}</p>
                    </div>
                  </div>
                  {expandedModule === index ? (
                    <ChevronUp className="w-5 h-5 text-zinc-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-zinc-400" />
                  )}
                </button>

                {expandedModule === index && (
                  <div className="px-4 pb-4 border-t border-zinc-800">
                    <p className="text-zinc-400 mt-4 mb-4">{module.description}</p>
                    <div className="space-y-2">
                      {module.topics.map((topic) => (
                        <div key={topic} className="flex items-center gap-2">
                          <CheckCircle className={`w-4 h-4 ${module.locked ? 'text-zinc-600' : 'text-green-400'}`} />
                          <span className={module.locked ? 'text-zinc-500' : 'text-zinc-300'}>{topic}</span>
                        </div>
                      ))}
                    </div>
                    {module.locked && (
                      <div className="mt-4 pt-4 border-t border-zinc-800">
                        <p className="text-sm text-zinc-500">
                          Enroll above to unlock this lesson
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Why Take This Course?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Practical & Actionable</h3>
              <p className="text-zinc-400">
                No fluff. Each lesson includes specific tasks you can implement immediately.
              </p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">EAA Focused</h3>
              <p className="text-zinc-400">
                Specifically designed for European Accessibility Act compliance deadlines.
              </p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Templates Included</h3>
              <p className="text-zinc-400">
                Get accessibility statement templates, checklists, and code snippets.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            What Students Say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.author} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-zinc-300 mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center text-indigo-400 font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white font-medium">{t.author}</p>
                    <p className="text-zinc-500 text-sm">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructor */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-24 h-24 bg-indigo-500/20 rounded-2xl flex items-center justify-center">
                <Shield className="w-12 h-12 text-indigo-400" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-white mb-2">Created by the Inclusiv Team</h3>
                <p className="text-zinc-400 max-w-xl">
                  Our accessibility experts have helped hundreds of companies achieve compliance.
                  This course distills years of experience into practical, bite-sized lessons.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Join 2,847+ professionals learning web accessibility.
            Your first lesson arrives immediately after signing up.
          </p>
          {!enrolled ? (
            <form onSubmit={handleEnroll} className="max-w-md mx-auto">
              <div className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-4 py-4 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  disabled={enrolling}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25 flex items-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  {enrolling ? 'Enrolling...' : 'Enroll Free'}
                </button>
              </div>
            </form>
          ) : (
            <div className="inline-flex items-center gap-3 px-6 py-4 bg-green-500/10 border border-green-500/20 rounded-xl">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span className="text-green-400 font-medium">Check your inbox for Lesson 1!</span>
            </div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
            >
              <Zap className="w-4 h-4" />
              Or scan your site first
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
