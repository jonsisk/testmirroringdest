import getProperties from "fusion:properties";

// adds correct ad-path to data depending if bureau section is present or not
export const addAdPath = (content, arcSite) => {
  if (content["site_section"]) {
    content["adpath"] = content["site_section"]?._id?.replace(/^\//, "");
  } else {
    content["adpath"] = getProperties(arcSite)?.gamSiteId;
  }
};
