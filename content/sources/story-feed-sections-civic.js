import getResizedImageData from "@wpmedia/resizer-image-block";
import getProperties from "fusion:properties";

const params = {
  includeSections: "text",
  excludeSections: "text",
  feedSize: "number",
  feedOffset: "number",
  site: "text",
};

/**
 * @func itemsToArray
 * @param {String} itemString - a csv list of items to turn into an array
 * @return {String[]} the itemString now in an array
 */
export const itemsToArray = (itemString = "") =>
  itemString.split(",").map((item) => item.replace(/"/g, ""));

/**
 * @func pattern
 * @param {Object} key
 * @return {String} elastic search query for the feed sections
 */
const pattern = (key = {}) => {
  const { includeSections, excludeSections, feedOffset, feedSize, site } = key;
  const website = site;

  if (!includeSections) {
    throw new Error("includeSections parameter is required");
  }

  const sectionsIncluded = itemsToArray(includeSections);
  const sectionsExcluded = itemsToArray(excludeSections);

  const body = {
    query: {
      bool: {
        must: [
          {
            term: {
              "revision.published": "true",
            },
          },
          {
            nested: {
              path: "taxonomy.sections",
              query: {
                bool: {
                  must: [
                    {
                      terms: {
                        "taxonomy.sections._id": sectionsIncluded,
                      },
                    },
                    {
                      term: {
                        "taxonomy.sections._website": website,
                      },
                    },
                  ],
                },
              },
            },
          },
        ],
        must_not: [
          {
            nested: {
              path: "taxonomy.sections",
              query: {
                bool: {
                  must: [
                    {
                      terms: {
                        "taxonomy.sections._id": sectionsExcluded,
                      },
                    },
                    {
                      term: {
                        "taxonomy.sections._website": website,
                      },
                    },
                  ],
                },
              },
            },
          },
        ],
      },
    },
  };

  const encodedBody = encodeURI(JSON.stringify(body));

  return `/content/v4/search/published?body=${encodedBody}&website=${website}&size=${
    feedSize || 10
  }&from=${feedOffset || 0}&sort=display_date:desc`;
};

const resolve = (key) => pattern(key);

const transformData = (data, query) => {
  const site = query.site;
  const transformedData = getResizedImageData(data, null, null, null, site);
  transformedData.content_elements = transformedData.content_elements.map((item) => {
    if (Object.keys(item.websites).length > 1) {
      // we have a multi-site story, so we need to adjust the URL
      const actualSite = Object.keys(item.websites).find((key) => key.includes("-"));
      const { websiteDomain } = getProperties(actualSite);

      for (const key in item.websites) {
        item.websites[key].website_url = `${websiteDomain}${item.websites[key].website_url}`;
      }

      item.website_url = `${websiteDomain}${item.website_url}`;
      item.canonical_url = `${websiteDomain}${item.canonical_url}`;
    }
    return item;
  });
  return transformedData;
};

export default {
  resolve,
  schemaName: "ans-feed",
  params,
  transform: (data, query) => transformData(data, query),
};
