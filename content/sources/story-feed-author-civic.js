import handleFetchError from "@wpmedia/arc-themes-components/src/utils/handle-fetch-error";
import signImagesInANSObject from "@wpmedia/arc-themes-components/src/utils/sign-images-in-ans-object";
import { fetch as resizerFetch } from "@wpmedia/signing-service-content-source-block";
import axios from "axios";
import { ARC_ACCESS_TOKEN, CONTENT_BASE, RESIZER_TOKEN_VERSION } from "fusion:environment";

const params = [
  {
    displayName: "authorSlug",
    name: "authorSlug",
    type: "text",
  },
  {
    displayName: "feedOffset",
    name: "feedOffset",
    type: "number",
  },
  {
    displayName: "feedSize",
    name: "feedSize",
    type: "number",
  },
  {
    default: "2",
    displayName: "Themes Version",
    name: "themes",
    type: "text",
  },
];

const fetch = (
  { authorSlug, feedOffset: from = 0, feedSize: size = 8, "arc-site": website },
  { cachedCall }
) => {
  const urlSearch = new URLSearchParams({
    from,
    q: `credits.by.slug:"${authorSlug}"`,
    sort: "display_date:desc",
    size,
    website,
  });

  return axios({
    url: `${CONTENT_BASE}/content/v4/search/published?${urlSearch.toString()}`,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
    },
    method: "GET",
  })
    .then(signImagesInANSObject(cachedCall, resizerFetch, RESIZER_TOKEN_VERSION))
    .then(({ data }) => data)
    .catch(handleFetchError);
};

export default {
  fetch,
  params,
  schemaName: "ans-feed",
};
