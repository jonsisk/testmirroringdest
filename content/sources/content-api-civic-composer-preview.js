import handleFetchError from "@wpmedia/arc-themes-components/src/utils/handle-fetch-error";
import signImagesInANSObject from "@wpmedia/arc-themes-components/src/utils/sign-images-in-ans-object";
import { fetch as resizerFetch } from "@wpmedia/signing-service-content-source-block";
import axios from "axios";
import { CONTENT_BASE, ARC_ACCESS_TOKEN, RESIZER_TOKEN_VERSION } from "fusion:environment";
import { addAdPath, processArticleData } from "../helpers/tranformers.helper";

const fetch = async ({ _id, section, "arc-site": website }, { cachedCall }) => {
  // get the article
  return axios({
    method: "GET",
    url: `${CONTENT_BASE}/content/v4/?_id=${_id}&website=${website}&published=false`,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
    },
  })
    .then(signImagesInANSObject(cachedCall, resizerFetch, RESIZER_TOKEN_VERSION))
    .then(async ({ data }) => {
      if (!section) {
        addAdPath(data);
        return processArticleData(data);
      }
      const { data: sectionData } = await axios({
        method: "GET",
        url: `${CONTENT_BASE}/site/v3/website/${website}/section?_id=${
          section?.startsWith("/") ? section : `/${section}`
        }`,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
        },
      });

      data["site_section"] = sectionData;
      addAdPath(data);
      return processArticleData(data);
    })
    .catch(handleFetchError);
};

export default {
  fetch,
  params: {
    _id: "text",
    section: "text",
  },
};
