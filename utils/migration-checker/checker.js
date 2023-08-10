/* eslint-disable no-prototype-builtins */
/* eslint-disable no-console */
const axios = require("axios");
const cheerio = require("cheerio");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL || "https://fallback-default.com";
const PRODUCTION_BASE_URL = process.env.PRODUCTION_BASE_URL || "https://www.votebeat.org";

// Sample data structure. You can adjust this to fit your data.
const slugs = [
  {
    slug: "/2021/6/12/22640434/will-election-administrators-dreams-finally-come-true",
    originalUrl: "https://pennsylvania.votebeat.org",
  },
  // ... add more slugs and expectations as needed
];

async function fetchMetaTags(url, slug) {
  const response = await axios.get(url);

  if (response.status !== 200) {
    throw new Error(`[${slug}] Failed to fetch from ${url}. Status code: ${response.status}`);
  }

  const $ = cheerio.load(response.data);
  const metaTags = {};
  const ignoredMetaTags = [
    "brightspot.contentId",
    "brightspot-dataLayer",
    "viewport",
    "og:image:url",
    "og:image",
    "parsely-image-url",
    "og:url",
    "twitter:image",
    "ad-path",
  ];

  $("meta").each((index, element) => {
    const nameAttr = $(element).attr("name");
    //if metatag is in ignored list map, skip it
    if (ignoredMetaTags.includes(nameAttr)) {
      return;
    }

    const propertyAttr = $(element).attr("property");
    const content = $(element).attr("content");

    if (nameAttr) {
      metaTags[nameAttr] = content;
    } else if (propertyAttr) {
      metaTags[propertyAttr] = content;
    }
  });

  metaTags["title"] = $("title").text().trim();

  return metaTags;
}

async function compareMetaTags(originalArticle, migratedArticle, slug) {
  const originalMeta = await fetchMetaTags(originalArticle, slug);
  const baseURLMeta = await fetchMetaTags(migratedArticle, slug);

  // Compare meta tags
  for (const key in originalMeta) {
    if (originalMeta[key] !== baseURLMeta[key]) {
      console.error(
        `[${slug}] Meta tag discrepancy for ${key}. Original: "${originalMeta[key]}", Migrated: "${baseURLMeta[key]}"`
      );
    }
  }

  // Check for any meta tags in BASE_URL that weren't in original
  for (const key in baseURLMeta) {
    if (!originalMeta.hasOwnProperty(key)) {
      console.warn(
        `[${slug}] New meta tag found in Migrated for ${key}. Value: "${baseURLMeta[key]}"`
      );
    }
  }
}

async function testSlugs() {
  for (const data of slugs) {
    //const url = `${BASE_URL}${data.slug}`;
    const url = `${BASE_URL}/2023/07/20/will-election-administrators-dreams-finally-come-true/`;
    const originalUrl = `${PRODUCTION_BASE_URL}${data.slug}`;
    try {
      await compareMetaTags(originalUrl, url, data.slug);
    } catch (error) {
      console.error(`[${url}] Error fetching or processing: ${error.message}`);
    }
  }
}

testSlugs();
