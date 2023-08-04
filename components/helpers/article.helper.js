/**
 * Get tags for parsely-tags meta tag by combining base tags with article tags
 * @param {*} article - the article
 * @param {*} parselyBaseTags - the base tags
 * @param {*} arcSite - the site
 * @returns comma separated string of tags
 */
export const getArticleParselyTags = (article, parselyBaseTags, arcSite) => {
  // get array from comma separated string
  const tags = parselyBaseTags.split(",").map((tag) => tag.trim());
  //add tags from article and remove starting slash
  article?.taxonomy?.sections
    .filter((section) => section._website === arcSite)
    .forEach((tag) => {
      tags.push(tag._id.replace(/^\//, ""));
    });
  return tags.join(",");
};

/**
 * Builds the correct ad path for GAM taking into consideration the content type
 * @param {*} content - the content
 * @param {*} arcSite - the site
 * @returns the correct gam path for the content
 */
export const getAdPathForContent = (content, arcSite) => {
  var adPath = getSiteForGAM(arcSite);

  if (content.type === "story") {
    const mainSection = content?.taxonomy?.primary_section?._id;
    if (mainSection) adPath += mainSection;
  }
  if (content.node_type === "section") {
    adPath += content?._id;
  }
  return adPath;
};

/**
 * For GAM, main bureau is 'national' and sub-bureau is the second part of arcSite
 * @param {*} arcSite
 * @returns the actual site ad path for GAM
 */
const getSiteForGAM = (arcSite) => {
  //if arcSite doesn't contain slash, return 'national;
  if (!arcSite.includes("-")) return "national";
  // otherwise, split by - and return the second part
  return arcSite.split("-")[1];
};
