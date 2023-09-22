/**
 * Used for de-duplication of stories in the civic feed
 * using the `filteredArticles` param that comes from the
 * context, and includes stories that have been rendered by
 * other components on the page.
 */
import getResizedImageData from "@wpmedia/resizer-image-block";

const params = {
  feedSize: "number",
  feedOffset: "number",
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
  const website = key["arc-site"];
  const { filteredArticles, feedOffset, feedSize } = key;

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
            term: {
              type: "story",
            },
          },
        ],
        must_not: [
          {
            ids: {
              values: filteredArticles.map((article) => `default_true_${article}`),
            },
          },
        ],
      },
    },
  };

  const encodedBody = encodeURI(JSON.stringify(body));

  const exludeFields = ["content_elements", "additional_properties"].join(",");

  return `/content/v4/search/published?body=${encodedBody}&website=${website}&size=${
    feedSize || 10
  }&from=${feedOffset || 0}&sort=display_date:desc&_sourceExclude=${exludeFields}`;
};

const resolve = (key) => pattern(key);

export default {
  resolve,
  schemaName: "ans-feed",
  params,
  transform: (data, query) => getResizedImageData(data, null, null, null, query["arc-site"]),
};
