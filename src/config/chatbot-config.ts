/**
 * Inclusiv Chatbot Configuration
 *
 * This file contains the configuration for a future chatbot implementation.
 * It includes common questions, responses, and conversation flows to provide
 * instant support to users regarding accessibility compliance and Inclusiv features.
 */

export interface ChatbotResponse {
  id: string;
  keywords: string[];
  question: string;
  answer: string;
  followUp?: string[];
  links?: { text: string; href: string }[];
  category: 'eaa' | 'wcag' | 'scanner' | 'pricing' | 'support' | 'technical' | 'general';
  priority: 'high' | 'medium' | 'low';
}

export interface ChatbotConfig {
  welcomeMessage: string;
  fallbackMessage: string;
  transferMessage: string;
  businessHours: {
    start: string;
    end: string;
    timezone: string;
    days: string[];
  };
  responses: ChatbotResponse[];
}

export const chatbotConfig: ChatbotConfig = {
  welcomeMessage: "Hi! I'm the Inclusiv assistant. I can help you with questions about web accessibility, the EAA deadline, and using our scanner. What would you like to know?",

  fallbackMessage: "I'm not sure I understand your question. Would you like to speak with a human support agent, or can I help you with one of these topics: EAA compliance, using the scanner, understanding your results, or pricing?",

  transferMessage: "I'll connect you with a human support agent. Please note our response time is typically within 24 hours (4 hours for Professional plans). In the meantime, you can check our Help Center at /help for immediate answers.",

  businessHours: {
    start: "09:00",
    end: "18:00",
    timezone: "CET",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },

  responses: [
    // EAA & Regulations
    {
      id: "eaa-deadline",
      keywords: ["eaa", "deadline", "june 28", "2025", "when", "european accessibility act"],
      question: "When is the EAA deadline?",
      answer: "The European Accessibility Act (EAA) deadline is June 28, 2025. After this date, businesses selling to EU consumers must ensure their websites and apps meet accessibility requirements. This includes e-commerce sites, banking services, and more.",
      followUp: ["What happens if I miss the deadline?", "How do I become compliant?"],
      links: [
        { text: "Learn more about EAA", href: "/faq#eaa-deadline" },
        { text: "Start a free scan", href: "/" },
      ],
      category: "eaa",
      priority: "high",
    },
    {
      id: "eaa-penalties",
      keywords: ["penalty", "fine", "miss deadline", "non-compliance", "violation", "consequence"],
      question: "What happens if I miss the EAA deadline?",
      answer: "Penalties for EAA non-compliance vary by EU member state but can include fines, orders to make products accessible, removal from market, and reputational damage. Some countries have fines up to €100,000 or more. Additionally, users can file complaints and seek legal remedies.",
      followUp: ["How do I become compliant?", "How long does it take to fix issues?"],
      links: [
        { text: "Start compliance scan", href: "/" },
        { text: "View pricing plans", href: "/pricing" },
      ],
      category: "eaa",
      priority: "high",
    },
    {
      id: "eaa-applies-to-me",
      keywords: ["apply", "applies", "affected", "who", "business", "company", "ecommerce", "shop"],
      question: "Does the EAA apply to my business?",
      answer: "The EAA applies if you: sell products or services to EU consumers online, have an e-commerce website, offer banking or financial services digitally, provide digital booking systems, or have mobile apps. Micro-enterprises (fewer than 10 employees AND annual turnover under €2 million) may be exempt, but most businesses selling to EU customers need to comply.",
      followUp: ["What do I need to do to comply?", "How do I check my website?"],
      links: [
        { text: "Read full EAA FAQ", href: "/faq" },
        { text: "Check your website free", href: "/" },
      ],
      category: "eaa",
      priority: "high",
    },

    // WCAG & Standards
    {
      id: "wcag-explained",
      keywords: ["wcag", "what is wcag", "web content", "accessibility guidelines", "standard"],
      question: "What is WCAG?",
      answer: "WCAG (Web Content Accessibility Guidelines) is the international standard for web accessibility. The EAA requires compliance with WCAG 2.1 Level AA, which covers four principles: Perceivable (content can be perceived), Operable (UI components work), Understandable (content is readable), and Robust (works with assistive tech).",
      followUp: ["What's the difference between A, AA, and AAA?", "How do I achieve WCAG compliance?"],
      links: [
        { text: "Understanding WCAG", href: "/help/understanding-results" },
        { text: "Fixing common issues", href: "/help/fixing-issues" },
      ],
      category: "wcag",
      priority: "medium",
    },
    {
      id: "wcag-levels",
      keywords: ["level a", "level aa", "level aaa", "difference", "levels", "conformance"],
      question: "What's the difference between WCAG levels A, AA, and AAA?",
      answer: "WCAG has three conformance levels: Level A (minimum, basic accessibility), Level AA (mid-range, the legal standard for most regulations including EAA), and Level AAA (highest, enhanced accessibility). The EAA requires Level AA compliance. AAA is not typically required but provides the best user experience.",
      followUp: ["Does Inclusiv check for Level AA?", "How do I fix AA issues?"],
      links: [{ text: "View WCAG criteria", href: "/help/understanding-results" }],
      category: "wcag",
      priority: "medium",
    },

    // Scanner & Using Inclusiv
    {
      id: "how-to-scan",
      keywords: ["scan", "check", "test", "how to use", "run scan", "start"],
      question: "How do I scan my website?",
      answer: "Scanning is easy! Just go to our homepage, enter your website URL, and click 'Check Compliance Now'. The scan takes 30-60 seconds. You'll get an instant compliance score. Enter your email to receive a detailed report with specific issues and fix recommendations.",
      followUp: ["Is the scan free?", "What does the score mean?"],
      links: [
        { text: "Start scanning now", href: "/" },
        { text: "Getting started guide", href: "/help/getting-started" },
      ],
      category: "scanner",
      priority: "high",
    },
    {
      id: "scan-free",
      keywords: ["free", "cost", "price", "pay", "trial"],
      question: "Is the scan free?",
      answer: "Yes! Your first scan is completely free with no signup required. You get an instant compliance score and a summary of issues. For detailed reports with code-level fixes, platform-specific guidance, and ongoing monitoring, check out our paid plans starting at €29/month.",
      followUp: ["What do paid plans include?", "How do I upgrade?"],
      links: [
        { text: "Start free scan", href: "/" },
        { text: "View pricing", href: "/pricing" },
      ],
      category: "pricing",
      priority: "high",
    },
    {
      id: "score-meaning",
      keywords: ["score", "percentage", "number", "what does", "mean", "result"],
      question: "What does my compliance score mean?",
      answer: "Your score (0-100) indicates WCAG 2.1 AA compliance level. 90-100 is excellent (minimal issues), 70-89 is good (some work needed), 50-69 needs significant work, and below 50 is critical (major accessibility barriers). Aim for 95+ for full compliance confidence.",
      followUp: ["How do I improve my score?", "What issues affect my score most?"],
      links: [
        { text: "Understanding scores", href: "/help/understanding-results" },
        { text: "Fixing issues", href: "/help/fixing-issues" },
      ],
      category: "scanner",
      priority: "high",
    },
    {
      id: "scan-accuracy",
      keywords: ["accurate", "accuracy", "reliable", "miss", "false positive", "automated"],
      question: "How accurate is the automated scan?",
      answer: "Automated scans like Inclusiv can detect approximately 50-60% of accessibility issues. This includes all programmatically testable criteria. Some issues require manual testing (like content quality, keyboard flow logic). For complete compliance, we recommend combining automated scanning with manual testing. Our Professional plan includes guidance on comprehensive testing.",
      followUp: ["What can't automated testing find?", "Do you offer manual audits?"],
      links: [
        { text: "Testing limitations", href: "/help/getting-started" },
        { text: "Professional plans", href: "/pricing" },
      ],
      category: "scanner",
      priority: "medium",
    },

    // Fixing Issues
    {
      id: "fix-alt-text",
      keywords: ["alt text", "alt", "image", "missing alt", "alternative text"],
      question: "How do I fix missing alt text?",
      answer: "Alt text describes images for screen reader users. For meaningful images, add descriptive alt text. For decorative images, use empty alt (alt=\"\"). In HTML: <img src='photo.jpg' alt='Description'>. In Shopify: Edit product, click image, add alt text. In WordPress: Edit image in Media Library, fill 'Alt Text' field.",
      followUp: ["What makes good alt text?", "How about complex images?"],
      links: [{ text: "Alt text guide", href: "/help/fixing-issues#alt-text" }],
      category: "technical",
      priority: "high",
    },
    {
      id: "fix-contrast",
      keywords: ["contrast", "color", "text color", "background", "hard to read"],
      question: "How do I fix color contrast issues?",
      answer: "WCAG requires 4.5:1 contrast ratio for normal text and 3:1 for large text (18px+ or 14px+ bold). Use a contrast checker to test combinations. Common fixes: darken light text, lighten dark backgrounds, or choose new color pairs. Avoid light gray text on white backgrounds.",
      followUp: ["What tools check contrast?", "How do I update my CSS?"],
      links: [{ text: "Contrast fix guide", href: "/help/fixing-issues#color-contrast" }],
      category: "technical",
      priority: "high",
    },
    {
      id: "fix-forms",
      keywords: ["form", "label", "input", "field", "form label", "accessible form"],
      question: "How do I make forms accessible?",
      answer: "Every form input needs a visible label connected via 'for' attribute. Add clear error messages, use fieldset/legend for groups, and ensure keyboard navigation works. Example: <label for='email'>Email:</label><input type='email' id='email' name='email'>",
      followUp: ["What about error messages?", "How do I group related fields?"],
      links: [{ text: "Form accessibility guide", href: "/help/fixing-issues#form-labels" }],
      category: "technical",
      priority: "medium",
    },
    {
      id: "how-long-to-fix",
      keywords: ["how long", "time", "fix", "remediate", "duration"],
      question: "How long does it take to fix accessibility issues?",
      answer: "Timing varies by issue count and complexity. Simple fixes (alt text, labels) take minutes each. Design changes (contrast) may need 1-2 days. Major structural issues could take weeks. For a typical small business site with 20-30 issues, expect 1-2 weeks of focused work. Our reports prioritize by impact to help you tackle critical issues first.",
      followUp: ["What should I fix first?", "Can you help me fix issues?"],
      links: [
        { text: "Prioritization guide", href: "/help/understanding-results" },
        { text: "Fix guides", href: "/help/fixing-issues" },
      ],
      category: "support",
      priority: "medium",
    },

    // Pricing & Plans
    {
      id: "pricing-plans",
      keywords: ["pricing", "plan", "cost", "subscription", "monthly", "annual"],
      question: "What are your pricing plans?",
      answer: "We offer three plans: Starter (€29/month) for small sites with basic scanning and reports, Professional (€79/month) for growing businesses with priority support and API access, and Enterprise (custom pricing) for large organizations with dedicated support and SLA. All paid plans include unlimited rescans.",
      followUp: ["What's included in each plan?", "Is there a free trial?"],
      links: [{ text: "View full pricing", href: "/pricing" }],
      category: "pricing",
      priority: "high",
    },
    {
      id: "compliance-certificate",
      keywords: ["certificate", "certification", "proof", "badge", "compliant"],
      question: "Can I get a compliance certificate?",
      answer: "Yes! Our Professional and Enterprise plans include an accessibility compliance certificate after you reach a score of 95+. This certificate confirms your WCAG 2.1 AA compliance status at the time of scanning. Note: this is a scanning certificate, not a legal guarantee. For official certification, consider third-party auditors.",
      followUp: ["How do I get to 95+ score?", "Is this legally recognized?"],
      links: [
        { text: "Professional plan", href: "/pricing" },
        { text: "Improving your score", href: "/help/fixing-issues" },
      ],
      category: "pricing",
      priority: "medium",
    },

    // Support
    {
      id: "contact-support",
      keywords: ["contact", "support", "help", "human", "speak", "talk", "email"],
      question: "How do I contact support?",
      answer: "You can reach us at support@tryinclusiv.com. For general inquiries, we respond within 24 hours. Professional plan users get priority support with 4-hour response times. Enterprise users have dedicated support with 1-hour response times. You can also use our contact form at /contact.",
      followUp: ["What are your business hours?", "Do you offer phone support?"],
      links: [{ text: "Contact us", href: "/contact" }],
      category: "support",
      priority: "high",
    },
    {
      id: "business-hours",
      keywords: ["hours", "business hours", "available", "open", "timezone"],
      question: "What are your support hours?",
      answer: "Our support team is available Monday through Friday, 9:00 AM to 6:00 PM CET. Emails outside these hours are answered the next business day. Enterprise customers have access to extended support hours and emergency assistance.",
      followUp: ["What if I have an urgent issue?", "Do you offer phone support?"],
      links: [{ text: "Contact page", href: "/contact" }],
      category: "support",
      priority: "low",
    },

    // Platform-Specific
    {
      id: "shopify-support",
      keywords: ["shopify", "shopify store", "shopify theme"],
      question: "Does Inclusiv work with Shopify?",
      answer: "Yes! Inclusiv fully supports Shopify stores. Our scanner detects Shopify and provides platform-specific fix guidance. Common Shopify issues include missing alt text on product images, theme contrast issues, and form accessibility. Our fix guides include step-by-step Shopify admin instructions.",
      followUp: ["How do I fix Shopify images?", "Any recommended Shopify apps?"],
      links: [
        { text: "Scan your Shopify store", href: "/" },
        { text: "Shopify fix guides", href: "/help/fixing-issues#shopify" },
      ],
      category: "technical",
      priority: "medium",
    },
    {
      id: "wordpress-support",
      keywords: ["wordpress", "wp", "wordpress site", "wordpress theme"],
      question: "Does Inclusiv work with WordPress?",
      answer: "Absolutely! WordPress sites are fully supported. Our scanner provides WordPress-specific recommendations including plugin suggestions and theme customization tips. Common issues include theme accessibility, plugin conflicts, and content structure. We guide you through fixes in the WordPress admin.",
      followUp: ["What accessibility plugins do you recommend?", "How do I fix my theme?"],
      links: [
        { text: "Scan your WordPress site", href: "/" },
        { text: "WordPress fix guides", href: "/help/fixing-issues#wordpress" },
      ],
      category: "technical",
      priority: "medium",
    },

    // General
    {
      id: "getting-started",
      keywords: ["start", "begin", "new", "first time", "getting started"],
      question: "I'm new to accessibility. Where do I start?",
      answer: "Welcome! Here's your quick start path: 1) Run a free scan of your homepage to see your current score. 2) Review your results to understand the issues. 3) Focus on critical issues first (they impact users most). 4) Use our fix guides for step-by-step solutions. 5) Rescan to verify improvements. Our Getting Started guide walks through everything.",
      followUp: ["What issues should I fix first?", "How do I run my first scan?"],
      links: [
        { text: "Getting started guide", href: "/help/getting-started" },
        { text: "Start free scan", href: "/" },
      ],
      category: "general",
      priority: "high",
    },
  ],
};

// Quick reply suggestions based on context
export const quickReplies = {
  initial: [
    "What is the EAA deadline?",
    "How do I scan my website?",
    "What do I need to comply?",
    "View pricing plans",
  ],
  afterScore: [
    "How do I improve my score?",
    "What should I fix first?",
    "Get a detailed report",
    "Contact support",
  ],
  afterFixGuide: [
    "How do I fix another issue?",
    "Rescan my website",
    "Need more help",
    "View all fix guides",
  ],
  pricing: [
    "What's included in Professional?",
    "Is there a free trial?",
    "Can I get a certificate?",
    "Contact sales",
  ],
};

// Intent detection patterns for routing
export const intentPatterns = {
  urgency: ["urgent", "emergency", "immediately", "asap", "critical", "help"],
  frustration: ["not working", "broken", "frustrated", "angry", "terrible", "awful"],
  compliment: ["great", "amazing", "helpful", "thank you", "thanks", "excellent"],
  goodbye: ["bye", "goodbye", "thanks bye", "that's all", "nothing else"],
  human: ["human", "person", "real person", "agent", "speak to someone", "talk to"],
};

// Escalation triggers
export const escalationTriggers = [
  "I want a refund",
  "legal",
  "lawsuit",
  "complaint",
  "not satisfied",
  "cancel subscription",
  "speak to manager",
  "your scanner is wrong",
];

export default chatbotConfig;
