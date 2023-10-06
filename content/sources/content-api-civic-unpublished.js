import axios from "axios";
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from "fusion:environment";
import getResizedImageData from "../../components/helpers/image.helper";
import { addAdPath, processArticleData } from "../helpers/tranformers.helper";

const fetch = async ({ _id, section, "arc-site": arcSite }) => {
  // get the article
  const { data: articleData } = await axios({
    method: "GET",
    url: `${CONTENT_BASE}/content/v4/?_id=${_id}&website=${arcSite}&published=false`,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
    },
  });

  if (!section) {
    addAdPath(articleData, arcSite);
    return processArticleData(articleData);
  }

  // get the section
  const { data: sectionData } = await axios({
    method: "GET",
    url: `${CONTENT_BASE}/site/v3/website/${arcSite}/section?_id=${section}`,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
    },
  });

  articleData["site_section"] = sectionData;
  addAdPath(articleData);

  return processArticleData(articleData);
};

export default {
  fetch,
  params: {
    _id: "text",
    section: "text",
  },
  transform: (data, query) => getResizedImageData(data, null, null, null, query["arc-site"]),
};
