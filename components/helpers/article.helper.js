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

export const getActualSiteName = (element) => {
  const siteSection = element?.taxonomy?.sections?.find(
    (section) => section.additional_properties?.original?.bureau?.is_bureau_section === "true"
  );
  return siteSection?.additional_properties?.original?.site?.site_title;
};

/**
 * Gets primary section for eyebrow on listings. It can show the primary section or the bureau
 *
 * @param {*} element - the article/story
 * @param {*} globalContent - the global page content
 * @returns the section to display on the eyebrow
 */
export const getPrimarySection = (element, globalContent) => {
  const primarySection = element?.taxonomy?.primary_section;
  const bureau = getBureauFromArticle(element);

  // article is assigned to a bureau and we're not inside the actual bureau context
  if (bureau && !globalContent?.site_section) {
    return {
      name: `FROM ${bureau?.additional_properties?.original?.site?.site_title}`,
      path: bureau?.path,
    };
  }

  if (!primarySection) return null;

  return {
    name: primarySection.name,
    path: primarySection.path,
  };
};

export const getBureauFromArticle = (element) => {
  //find the first secion in element?.taxonomy?.sections that has is_bureau_section === "true"
  const bureauSection = element?.taxonomy?.sections?.find((section) => {
    return section.additional_properties?.original?.bureau?.is_bureau_section === "true";
  });
  if (
    !bureauSection &&
    element.primarySection?.additional_properties?.original?.bureau?.is_bureau_section == "true"
  ) {
    return element.primarySection;
  }
  return bureauSection;
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
