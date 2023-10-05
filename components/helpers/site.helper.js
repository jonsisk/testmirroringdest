import getProperties from "fusion:properties";

export const getWebsiteDomain = (arcSite) => {
  const { websiteDomain } = getProperties(arcSite);
  return websiteDomain;
};

export const isSiteSection = (globalContent) => {
  return globalContent?.site_section?.bureau?.is_bureau_section === "true";
};

export const getSiteProperties = (globalContent) => {
  if (isSiteSection(globalContent)) {
    const section = globalContent.site_section;
    return {
      primaryLogo: section.bureau.primary_logo,
      primaryLogoAlt: section.site?.site_title,
      lightBackgroundLogo: section.bureau.light_background_logo,
      lightBackgroundLogoAlt: section.site?.site_title,
      parselyTags: section.bureau.parsely_tags,
      gamSiteId: section.bureau.gam_site_id,
      websiteName: section.site?.site_title,
    };
  }
  return {};
};

export const replaceSiteVariables = (text, websiteName) => {
  return text?.replace("%SITE_NAME%", websiteName)?.replace("s’s", "s");
};
