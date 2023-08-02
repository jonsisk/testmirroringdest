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
  article.taxonomy.sections
    .filter((section) => section._website === arcSite)
    .forEach((tag) => {
      tags.push(tag._id.replace(/^\//, ""));
    });
  return tags.join(",");
};
