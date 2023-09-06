import getProperties from "fusion:properties";

export const getWebsiteDomain = (arcSite) => {
  const { websiteDomain, parentCommunity } = getProperties(arcSite);
  if (parentCommunity) {
    return getProperties(parentCommunity).websiteDomain;
  }

  return websiteDomain;
};

export const replaceSiteVariables = (text, websiteName) => {
  return text?.replace("%SITE_NAME%", websiteName);
};
