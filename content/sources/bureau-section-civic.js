import axios from "axios";
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from "fusion:environment";
import getResizedImageData from "../../components/helpers/image.helper";
import { addAdPath, processArticleData } from "../helpers/tranformers.helper";

const fetch = async ({ hierarchy, sectionId, bureau, "arc-site": arcSite }) => {
  // get the hierarchy
  const { data: articleData } = await axios({
    method: "GET",
    url: `${CONTENT_BASE}/site/v3/navigation/${arcSite}?${
      hierarchy ? `hierarchy=${hierarchy}` : ""
    }${sectionId ? `&_id=${sectionId}` : ""}`,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
    },
  });

  if (!bureau) {
    addAdPath(articleData, arcSite);
    return processArticleData(articleData);
  }

  const { data: sectionData } = await axios({
    method: "GET",
    url: `${CONTENT_BASE}/site/v3/website/${arcSite}/section?_id=${
      bureau?.startsWith("/") ? bureau : `/${bureau}`
    }`,
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
    hierarchy: "text",
    sectionId: "text",
    bureau: "text",
  },
  transform: (data, query) => getResizedImageData(data, null, null, null, query["arc-site"]),
};
