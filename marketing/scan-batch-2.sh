#!/bin/bash
OUTPUT="/Users/colinsmith/inclusiv/marketing/leads-batch2.csv"
API="https://tryinclusiv.com/api/scan"
echo "url,score,totalIssues,criticalIssues,platform" > "$OUTPUT"

for site in colourpop.com morphe.com tatcha.com supergoop.com tula.com olehenriksen.com peterthomasroth.com mariobadescu.com theordinary.com laroche-posay.com; do
    result=$(curl -s -X POST "$API" -H "Content-Type: application/json" -d "{\"url\": \"$site\"}" --max-time 45 2>/dev/null)
    if echo "$result" | grep -q '"score"'; then
        score=$(echo "$result" | grep -o '"score":[0-9]*' | cut -d':' -f2)
        total=$(echo "$result" | grep -o '"totalIssues":[0-9]*' | cut -d':' -f2)
        critical=$(echo "$result" | grep -o '"criticalIssues":[0-9]*' | cut -d':' -f2)
        platform=$(echo "$result" | grep -o '"platform":"[^"]*"' | cut -d'"' -f4)
        echo "$site,$score,$total,$critical,$platform" >> "$OUTPUT"
        echo "✓ $site: Score $score, $total issues"
    else
        echo "✗ $site: Failed"
    fi
    sleep 1
done
echo "Batch 2 complete: $OUTPUT"
