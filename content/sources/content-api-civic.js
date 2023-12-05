import handleFetchError from "@wpmedia/arc-themes-components/src/utils/handle-fetch-error";
import handleRedirect from "@wpmedia/arc-themes-components/src/utils/handle-redirect";
import signImagesInANSObject from "@wpmedia/arc-themes-components/src/utils/sign-images-in-ans-object";
import { fetch as resizerFetch } from "@wpmedia/signing-service-content-source-block";
import axios from "axios";
import { ARC_ACCESS_TOKEN, CONTENT_BASE, RESIZER_TOKEN_VERSION } from "fusion:environment";
import { addAdPath, processArticleData } from "../helpers/tranformers.helper";

const params = [
  {
    displayName: "_id",
    name: "_id",
    type: "text",
  },
  {
    displayName: "website_url",
    name: "website_url",
    type: "text",
  },
  {
    default: "2",
    displayName: "Themes Version",
    name: "themes",
    type: "text",
  },
  {
    displayName: "section",
    name: "section",
    type: "text",
  },
];

const fetch = ({ _id, "arc-site": website, website_url: websiteUrl, section }, { cachedCall }) => {
  const urlSearch = new URLSearchParams({
    ...(_id ? { _id } : { website_url: websiteUrl }),
    ...(website ? { website } : {}),
  });

  return axios({
    url: `${CONTENT_BASE}/content/v4/?${urlSearch.toString()}`,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
    },
    method: "GET",
  })
    .then(handleRedirect)
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
  params,
  schemaName: "ans-item",
};
