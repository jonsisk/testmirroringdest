import getResizedImageData from "@wpmedia/resizer-image-block";
import axios from "axios";
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from "fusion:environment";

const fetch = async ({ _id, section, website_url, "arc-site": arcSite }) => {
  // get the article
  const { data: articleData } = await axios({
    method: "GET",
    url: `${CONTENT_BASE}/content/v4/?${
      _id ? `_id=${_id}` : `website_url=${website_url}`
    }&website=${arcSite}`,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
    },
  });

  if (!section) return articleData;

  const { data: sectionData } = await axios({
    method: "GET",
    url: `${CONTENT_BASE}/site/v3/website/${arcSite}/section?_id=${
      section?.startsWith("/") ? section : `/${section}`
    }`,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
    },
  });

  articleData["site_section"] = sectionData;
  return articleData;
};

export default {
  fetch,
  params: {
    _id: "text",
    website_url: "text",
    section: "text",
  },
  transform: (data, query) => getResizedImageData(data, null, null, null, query["arc-site"]),
};
