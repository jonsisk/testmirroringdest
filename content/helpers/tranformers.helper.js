import getProperties from "fusion:properties";
import getResizedImageData from "../../components/helpers/image.helper";

export const transformFeedData = (data, query) => {
  const transformedData = getResizedImageData(data, null, null, null, query["arc-site"]);
  if (!query.keepPrimaryWebsite) {
    return transformedData;
  }
  transformedData.content_elements = transformedData.content_elements.map((item) => {
    const primaryWebsite = item.canonical_website;
    if (primaryWebsite) {
      // let's adjust the URL to the primary website
      const { websiteDomain } = getProperties(primaryWebsite);
      const canonicalUrl = item.canonical_url;
      item.website_url = `${websiteDomain}${canonicalUrl}`;
      item.canonical_url = `${websiteDomain}${canonicalUrl}`;

      for (const key in item.websites) {
        item.websites[key].website_url = `${websiteDomain}${canonicalUrl}`;
      }
    }
    return item;
  });
  return transformedData;
};
