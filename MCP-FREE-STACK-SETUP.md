# Free MCP Stack - Plug and Play Setup

## Quick Install Commands

Run these in your terminal:

```bash
# 1. Agent Twitter Client (Twitter without API)
npx -y @anthropic-ai/mcp add agent-twitter-client -- npx -y agent-twitter-client-mcp

# 2. Reddit (no API for basic use)
npx -y @anthropic-ai/mcp add reddit-buddy -- npx -y @pinkpixel/reddit-buddy-mcp

# 3. Search Scrape (free web search, local)
npx -y @anthropic-ai/mcp add search-scrape -- npx -y search-scrape-mcp

# 4. Open Web Search (multi-engine, no auth)
npx -y @anthropic-ai/mcp add open-web-search -- npx -y open-web-search-mcp

# 5. Fetch Browser (headless browser)
npx -y @anthropic-ai/mcp add fetch-browser -- npx -y @anthropic-ai/mcp-fetch-browser
```

---

## Manual Config (add to ~/.claude/claude_desktop_config.json or .mcp.json)

```json
{
  "mcpServers": {
    "agent-twitter-client": {
      "command": "npx",
      "args": ["-y", "agent-twitter-client-mcp"],
      "env": {
        "TWITTER_USERNAME": "your_username",
        "TWITTER_PASSWORD": "your_password"
      }
    },
    "reddit-buddy": {
      "command": "npx",
      "args": ["-y", "@pinkpixel/reddit-buddy-mcp"]
    },
    "search-scrape": {
      "command": "npx",
      "args": ["-y", "search-scrape-mcp"]
    },
    "open-web-search": {
      "command": "npx",
      "args": ["-y", "open-web-search-mcp"]
    },
    "fetch-browser": {
      "command": "npx",
      "args": ["-y", "mcp-fetch-browser"]
    },
    "perplexity-local": {
      "command": "npx",
      "args": ["-y", "perplexity-mcp"]
    }
  }
}
```

---

## Twitter Setup (Cookie Method - No API)

If the password method doesn't work, use cookies:

### Step 1: Get your Twitter cookies
1. Log into Twitter in Chrome
2. Open DevTools (F12) → Application → Cookies → twitter.com
3. Copy these cookie values:
   - `auth_token`
   - `ct0`

### Step 2: Update config
```json
{
  "agent-twitter-client": {
    "command": "npx",
    "args": ["-y", "agent-twitter-client-mcp"],
    "env": {
      "TWITTER_AUTH_TOKEN": "your_auth_token_here",
      "TWITTER_CT0": "your_ct0_here"
    }
  }
}
```

---

## LinkedIn Setup (Cookie Method)

### Step 1: Get LinkedIn cookie
1. Log into LinkedIn in Chrome
2. DevTools → Application → Cookies → linkedin.com
3. Copy the `li_at` cookie value

### Step 2: Config
```json
{
  "linkedin": {
    "command": "npx",
    "args": ["-y", "linkedin-mcp"],
    "env": {
      "LINKEDIN_COOKIE": "your_li_at_cookie_here"
    }
  }
}
```

---

## Verify Installation

After adding to config, restart Claude Code and run:

```
/mcp
```

You should see your new servers listed as "connected".

---

## Usage Examples

### Search the web (free)
```
"Search for EU e-commerce sites that need accessibility help"
```

### Monitor Reddit
```
"Find recent posts in r/webdev about accessibility"
```

### Post to Twitter
```
"Post a tweet about the EAA deadline"
```

### Scrape a website
```
"Use fetch-browser to get the content of example.com"
```

---

## Troubleshooting

### "MCP not connecting"
- Restart Claude Code completely
- Check the package name is correct
- Run `npx -y <package-name>` manually to see errors

### "Twitter login failed"
- Use cookie method instead of password
- Make sure 2FA is handled or disabled temporarily
- Try logging into Twitter in browser first

### "Rate limited"
- These use browser automation, so go slower
- Add delays between actions
- Don't spam 100 requests/minute

---

## The Free Stack Summary

| Tool | Purpose | Cost |
|------|---------|------|
| agent-twitter-client | Twitter automation | $0 |
| reddit-buddy | Reddit monitoring | $0 |
| search-scrape | Web search | $0 |
| open-web-search | Multi-engine search | $0 |
| fetch-browser | Headless browsing | $0 |
| linkedin (cookie) | LinkedIn automation | $0 |

**Total: $0/month**

---

## Next Steps

1. Copy the JSON config above
2. Add your Twitter/LinkedIn cookies
3. Restart Claude Code
4. Run `/mcp` to verify
5. Start automating your outreach

Good luck! 🚀
