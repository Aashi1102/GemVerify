#!/usr/bin/env python3
"""
CLI runner for CPPP and GeM tender scrapers.
Outputs JSON for integration with Node.js backend or standalone processing.
"""
import sys
import json
import argparse
from datetime import datetime

def custom_serializer(obj):
    if isinstance(obj, datetime):
        return obj.isoformat()
    if hasattr(obj, '__float__'):
        return float(obj)
    return str(obj)

def main():
    parser = argparse.ArgumentParser(description="Fetch tenders from CPPP and GeM")
    parser.add_argument("--source", choices=["cppp", "gem", "all"], default="all", help="Source to scrape")
    parser.add_argument("--limit", type=int, default=10, help="Max tenders to fetch per source")
    args = parser.parse_args()

    results = {"cppp": [], "gem": [], "timestamp": datetime.utcnow().isoformat(), "errors": []}

    try:
        if args.source in ("cppp", "all"):
            try:
                from scrapers.cppp_scraper import CPPPScraper
                scraper = CPPPScraper()
                results["cppp"] = scraper.scrape(limit=args.limit)
            except Exception as e:
                results["errors"].append(f"CPPP Error: {str(e)}")

        if args.source in ("gem", "all"):
            try:
                from scrapers.gem_scraper import GeMScraper
                scraper = GeMScraper()
                results["gem"] = scraper.scrape(limit=args.limit)
            except Exception as e:
                results["errors"].append(f"GeM Error: {str(e)}")

    except Exception as e:
        results["errors"].append(f"Fatal error: {str(e)}")

    print(json.dumps(results, default=custom_serializer, indent=2))

if __name__ == "__main__":
    main()
