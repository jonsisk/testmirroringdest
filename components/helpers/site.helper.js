import getProperties from "fusion:properties";

export const getWebsiteDomain = (arcSite) => {
  const { websiteDomain } = getProperties(arcSite);
  return websiteDomain;
};

export const isSiteSection = (globalContent) => {
  return globalContent?.site_section?.bureau?.is_bureau_section === "true";
};

export const getSiteProperties = (context) => {
  const { globalContent, contextPath, deployment } = context;
  if (isSiteSection(globalContent)) {
    const section = globalContent.site_section;
    return {
      primaryLogo: section.bureau.primary_logo.startsWith("/")
        ? deployment(`${contextPath}/resources/images${section.bureau.primary_logo}`)
        : section.bureau.primary_logo,
      primaryLogoAlt: section.site?.site_title,
      lightBackgroundLogo: section.bureau.light_background_logo.startsWith("/")
        ? deployment(`${contextPath}/resources/images${section.bureau.light_background_logo}`)
        : section.bureau.light_background_logo,
      lightBackgroundLogoAlt: section.site?.site_title,
      parselyTags: section.bureau.parsely_tags,
      gamSiteId: section.bureau.gam_site_id,
      websiteName: section.site?.site_title,
      linksHierachy: section.bureau.links_hierarchy,
      tagline: section.bureau.tagline,
      hideTopics: section.bureau.hide_topics_in_header === "true",
      topicsHierachy: section.bureau.topics_hierarchy,
      newsletter: {
        title: section.bureau.newsletter_title,
        description: section.bureau.newsletter_description,
        newsletter: section.bureau.newsletter,
      },
      rightRailNewsletter: {
        title: section.bureau.rightrail_newsletter_title,
        description: section.bureau.rightrail_newsletter_description,
        newsletter: section.bureau.rightrail_newsletter,
      },
    };
  }
  return {};
};

export const replaceSiteVariables = (text, websiteName) => {
  return text?.replace("%SITE_NAME%", websiteName)?.replace("s’s", "s");
};
