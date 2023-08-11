import getResizedImageData from "@wpmedia/resizer-image-block";
import getProperties from "fusion:properties";

export const transformFeedData = (data, query) => {
  const transformedData = getResizedImageData(data, null, null, null, query["arc-site"]);
  if (!query.keepPrimaryWebsite) {
    return transformedData;
  }
  transformedData.content_elements = transformedData.content_elements.map((item) => {
    const primaryWebsite = item.taxonomy?.primary_section?._website;
    if (primaryWebsite) {
      // let's adjust the URL to the primary website
      const { websiteDomain } = getProperties(primaryWebsite);
      item.website_url = `${websiteDomain}${item.website_url}`;
      item.canonical_url = `${websiteDomain}${item.canonical_url}`;

      for (const key in item.websites) {
        item.websites[key].website_url = `${websiteDomain}${item.websites[key].website_url}`;
      }
    }
    return item;
  });
  return transformedData;
};
