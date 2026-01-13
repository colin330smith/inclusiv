#!/bin/bash
# Slow-drip scanner - respects 10/min rate limit
OUTPUT="/Users/colinsmith/inclusiv/marketing/MASTER-LEADS.csv"
API="https://tryinclusiv.com/api/scan"

# Initialize or append
if [ ! -f "$OUTPUT" ]; then
    echo "url,score,totalIssues,criticalIssues,platform,scannedAt" > "$OUTPUT"
fi

sites=(
"amazon.com" "walmart.com" "target.com" "bestbuy.com" "homedepot.com"
"lowes.com" "costco.com" "samsclub.com" "kohls.com" "macys.com"
"nordstrom.com" "jcpenney.com" "dillards.com" "belk.com" "bloomingdales.com"
"neimanmarcus.com" "saksfifthavenue.com" "bergdorfgoodman.com" "barneys.com"
"nike.com" "adidas.com" "underarmour.com" "puma.com" "reebok.com"
"newbalance.com" "asics.com" "brooks.com" "saucony.com" "hoka.com"
)

for site in "${sites[@]}"; do
    echo "$(date): Scanning $site"
    result=$(curl -s -X POST "$API" -H "Content-Type: application/json" -d "{\"url\": \"$site\"}" --max-time 60 2>/dev/null)
    if echo "$result" | grep -q '"score"'; then
        score=$(echo "$result" | grep -o '"score":[0-9]*' | cut -d':' -f2)
        total=$(echo "$result" | grep -o '"totalIssues":[0-9]*' | cut -d':' -f2)
        critical=$(echo "$result" | grep -o '"criticalIssues":[0-9]*' | cut -d':' -f2)
        platform=$(echo "$result" | grep -o '"platform":"[^"]*"' | cut -d'"' -f4)
        timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
        echo "$site,$score,$total,$critical,$platform,$timestamp" >> "$OUTPUT"
        echo "  ✓ Score: $score | Issues: $total | Critical: $critical"
    else
        echo "  ✗ Failed or rate limited - sleeping 60s"
        sleep 60
    fi
    # 7 second delay = ~8 scans/min (under 10 limit)
    sleep 7
done
