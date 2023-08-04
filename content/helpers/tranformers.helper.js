import getResizedImageData from "@wpmedia/resizer-image-block";
import getProperties from "fusion:properties";

export const transformFeedData = (data, query) => {
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
