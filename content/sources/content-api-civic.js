import axios from "axios";
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from "fusion:environment";
import getResizedImageData from "../../components/helpers/image.helper";
import { addAdPath, processArticleData } from "../helpers/tranformers.helper";

const RedirectError = (location, message = "Redirect", code = 302) => {
  const err = new Error(message);
  err.statusCode = code;
  err.location = location;
  return err;
};

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

  // check if article has redirect and do a redirect
  if (articleData?.related_content?.redirect) {
    const redirectUrl = articleData?.related_content?.redirect[0]?.redirect_url;
    if (redirectUrl) {
      throw new RedirectError(redirectUrl);
    }
  }

  // check if it's redirect
  if (articleData?.type === "redirect") {
    const redirectUrl = articleData.redirect_url;
    if (redirectUrl) {
      throw new RedirectError(redirectUrl, "Redirect", 301);
    }
  }

  if (!section) {
    addAdPath(articleData, arcSite);
    return processArticleData(articleData);
  }

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
  addAdPath(articleData);

  return processArticleData(articleData);
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
