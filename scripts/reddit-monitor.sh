#!/bin/bash
# Reddit Monitor - Check for new comments every 60 seconds

LOG_FILE="/tmp/reddit-monitor.log"
ALERT_FILE="/tmp/reddit-alerts.txt"

echo "$(date): Reddit monitor started" >> "$LOG_FILE"
echo "" > "$ALERT_FILE"

# Check the r/accessibility post for new comments
check_reddit() {
    echo "$(date): Checking Reddit for new comments..." >> "$LOG_FILE"
    
    # Use curl to fetch the post (we'll parse for comment count)
    # The post URL from our submission
    POST_URL="https://old.reddit.com/r/accessibility/comments/1i08iw0/"
    
    RESPONSE=$(curl -s -A "Mozilla/5.0" "$POST_URL" 2>/dev/null)
    
    # Count comments (look for "comments" text)
    COMMENT_COUNT=$(echo "$RESPONSE" | grep -oP '\d+(?= comments)' | head -1)
    
    if [ -n "$COMMENT_COUNT" ]; then
        echo "$(date): Found $COMMENT_COUNT comments on post" >> "$LOG_FILE"
        
        # Check if we've seen this count before
        LAST_COUNT=$(cat /tmp/reddit-last-count.txt 2>/dev/null || echo "0")
        
        if [ "$COMMENT_COUNT" -gt "$LAST_COUNT" ]; then
            NEW_COMMENTS=$((COMMENT_COUNT - LAST_COUNT))
            echo "$(date): 🚨 NEW COMMENTS! $NEW_COMMENTS new comment(s) detected!" >> "$LOG_FILE"
            echo "🚨 REDDIT ALERT: $NEW_COMMENTS new comment(s) on r/accessibility post at $(date)" >> "$ALERT_FILE"
            echo "$COMMENT_COUNT" > /tmp/reddit-last-count.txt
        fi
    fi
}

# Run check every 60 seconds
while true; do
    check_reddit
    sleep 60
done
