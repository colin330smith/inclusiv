#!/bin/bash
# Scan high-value Shopify targets
OUTPUT="/Users/colinsmith/inclusiv/marketing/SHOPIFY-LEADS.csv"
API="https://tryinclusiv.com/api/scan"

# Initialize
echo "url,score,totalIssues,criticalIssues,platform,scannedAt" > "$OUTPUT"

# Priority targets: Fashion/Beauty Shopify stores (highest lawsuit categories)
sites=(
"gymshark.com"
"fashionnova.com"
"aloyoga.com"
"outdoorvoices.com"
"goodamerican.com"
"wearfigs.com"
"bombas.com"
"chubbiesshorts.com"
"knix.com"
"pangaia.com"
"kyliecosmetics.com"
"jeffreestarcosmetics.com"
"colourpop.com"
"rarebeauty.com"
"hismileteeth.com"
"skims.com"
"allbirds.com"
"stevemadden.com"
"rebeccaminkoff.com"
"ruggable.com"
"bulletproof.com"
"deathwishcoffee.com"
"rayconglobal.com"
)

echo "=== SHOPIFY TARGET SCAN ==="
echo "Targets: ${#sites[@]}"

for site in "${sites[@]}"; do
    echo "$(date +%H:%M:%S): $site"
    result=$(curl -s -X POST "$API" -H "Content-Type: application/json" -d "{\"url\": \"$site\"}" --max-time 60 2>/dev/null)
    if echo "$result" | grep -q '"score"'; then
        score=$(echo "$result" | grep -o '"score":[0-9]*' | cut -d':' -f2)
        total=$(echo "$result" | grep -o '"totalIssues":[0-9]*' | cut -d':' -f2)
        critical=$(echo "$result" | grep -o '"criticalIssues":[0-9]*' | cut -d':' -f2)
        platform=$(echo "$result" | grep -o '"platform":"[^"]*"' | cut -d'"' -f4)
        timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
        echo "$site,$score,$total,$critical,$platform,$timestamp" >> "$OUTPUT"
        echo "  → Score: $score | Issues: $total | Critical: $critical"
        
        # Flag hot leads (score < 70)
        if [ "$score" -lt 70 ]; then
            echo "  🔥 HOT LEAD! Score under 70"
        fi
    else
        echo "  ✗ Rate limited - waiting 65s"
        sleep 65
        # Retry once
        result=$(curl -s -X POST "$API" -H "Content-Type: application/json" -d "{\"url\": \"$site\"}" --max-time 60 2>/dev/null)
        if echo "$result" | grep -q '"score"'; then
            score=$(echo "$result" | grep -o '"score":[0-9]*' | cut -d':' -f2)
            total=$(echo "$result" | grep -o '"totalIssues":[0-9]*' | cut -d':' -f2)
            critical=$(echo "$result" | grep -o '"criticalIssues":[0-9]*' | cut -d':' -f2)
            platform=$(echo "$result" | grep -o '"platform":"[^"]*"' | cut -d'"' -f4)
            timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
            echo "$site,$score,$total,$critical,$platform,$timestamp" >> "$OUTPUT"
            echo "  → Score: $score | Issues: $total | Critical: $critical"
        fi
    fi
    # 7 second delay between scans
    sleep 7
done

echo ""
echo "=== SCAN COMPLETE ==="
echo "Results: $OUTPUT"
echo ""
echo "=== HOT LEADS (Score < 70) ==="
awk -F',' 'NR>1 && $2<70 {print $1": Score "$2", "$3" issues"}' "$OUTPUT"
