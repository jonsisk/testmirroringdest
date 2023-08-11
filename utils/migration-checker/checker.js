/* eslint-disable no-prototype-builtins */
/* eslint-disable no-console */
const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");
const csv = require("csv-parser");

require("dotenv").config();

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

const originalSiteMap = {
  Votebeat: "https://www.votebeat.org",
  "Votebeat Arizona": "https://arizona.votebeat.org",
  "Votebeat Michigan": "https://michigan.votebeat.org",
  "Votebeat Pennsylvania": "https://pennsylvania.votebeat.org",
  "Votebeat Texas": "https://texas.votebeat.org",
};

const migratedSiteMap = {
  Votebeat: "https://civicnewscompany-votebeat-sandbox.web.arc-cdn.net",
  "Votebeat Arizona": "https://civicnewscompany-votebeat-arizona-sandbox.web.arc-cdn.net",
  "Votebeat Michigan": "https://civicnewscompany-votebeat-michigan-sandbox.web.arc-cdn.net",
  "Votebeat Pennsylvania": "https://civicnewscompany-votebeat-pennsylvania-sandbox.web.arc-cdn.net",
  "Votebeat Texas": "https://civicnewscompany-votebeat-texas-sandbox.web.arc-cdn.net",
};

async function testSlugs() {
  fs.createReadStream("data/votebeat.csv")
    .pipe(
      csv({
        separator: ";",
        headers: false,
      })
    )
    .on("data", async (row) => {
      const originalUrl = `${originalSiteMap[row[1]]}/${row[0]}`;
      const migratedUrl = `${migratedSiteMap[row[1]]}/${row[0]}`;

      try {
        await compareMetaTags(originalUrl, migratedUrl, `/${row[0]}`);
      } catch (error) {
        console.error(`[${migratedUrl}] Error fetching or processing: ${error.message}`);
      }
    });
}

testSlugs();
