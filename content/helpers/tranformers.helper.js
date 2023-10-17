import getProperties from "fusion:properties";

// adds correct ad-path to data depending if bureau section is present or not
export const addAdPath = (content, arcSite) => {
  if (content["site_section"]) {
    content["adpath"] = content["site_section"]?._id?.replace(/^\//, "");
  } else {
    content["adpath"] = getProperties(arcSite)?.gamSiteId;
  }
};

/** Do transformation on article/story data needed for customization
 * e.g.: - remove image credit creators to avoid concatenation
 */
export const processArticleData = (article) => {
  // remove image credit name, leave only 'affiliation' field
  // remove it from lead image
  if (article?.promo_items?.basic?.type === "image") {
    article.promo_items.basic.credits.by = [];
  }
  if (article?.promo_items?.lead_art?.type === "image") {
    article.promo_items.lead_art.credits.by = [];
  }

  return article;
};
