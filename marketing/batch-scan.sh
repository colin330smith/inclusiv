#!/bin/bash
# Mass Accessibility Scanner - Volume Strategy
# Scans sites and outputs results to CSV for lead database

OUTPUT_FILE="/Users/colinsmith/inclusiv/marketing/SCAN-RESULTS-$(date +%Y%m%d-%H%M%S).csv"
API_URL="https://tryinclusiv.com/api/scan"

echo "url,score,totalIssues,criticalIssues,platform,scannedAt" > "$OUTPUT_FILE"

scan_site() {
    local url=$1
    echo "Scanning: $url"

    result=$(curl -s -X POST "$API_URL" \
        -H "Content-Type: application/json" \
        -d "{\"url\": \"$url\"}" \
        --max-time 60)

    if echo "$result" | grep -q '"score"'; then
        score=$(echo "$result" | grep -o '"score":[0-9]*' | cut -d':' -f2)
        totalIssues=$(echo "$result" | grep -o '"totalIssues":[0-9]*' | cut -d':' -f2)
        criticalIssues=$(echo "$result" | grep -o '"criticalIssues":[0-9]*' | cut -d':' -f2)
        platform=$(echo "$result" | grep -o '"platform":"[^"]*"' | cut -d'"' -f4)
        scannedAt=$(echo "$result" | grep -o '"scannedAt":"[^"]*"' | cut -d'"' -f4)

        echo "$url,$score,$totalIssues,$criticalIssues,$platform,$scannedAt" >> "$OUTPUT_FILE"
        echo "  ✓ Score: $score | Issues: $totalIssues | Critical: $criticalIssues"
    else
        echo "  ✗ Failed to scan"
    fi

    # Rate limit - 2 second delay between scans
    sleep 2
}

# D2C Fashion
sites=(
"allbirds.com"
"everlane.com"
"cuyana.com"
"mejuri.com"
"aritzia.com"
"revolve.com"
"showpo.com"
"princess-polly.com"
"bohme.com"
"vici.com"
"petal-and-pup.com"
"hello-molly.com"
"windsor.com"
"lulus.com"
"tobi.com"
)

echo "=== BATCH ACCESSIBILITY SCAN ==="
echo "Output: $OUTPUT_FILE"
echo "Starting scan of ${#sites[@]} sites..."
echo ""

for site in "${sites[@]}"; do
    scan_site "$site"
done

echo ""
echo "=== SCAN COMPLETE ==="
echo "Results saved to: $OUTPUT_FILE"
