import axios from "axios";
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from "fusion:environment";
import getResizedImageData from "../../components/helpers/image.helper";
import { addAdPath } from "../helpers/tranformers.helper";

const RedirectError = (location, message = "Redirect", code = 302) => {
  const err = new Error(message);
  err.statusCode = code;
  err.location = location;
  return err;
};

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

  // check if article has redirect and do a redirect
  if (articleData?.related_content?.redirect) {
    const redirectUrl = articleData?.related_content?.redirect[0]?.redirect_url;
    if (redirectUrl) {
      throw new RedirectError(redirectUrl);
    }
  }

  // section comes in the form of vb-arizona or vb-national
  // we convert it to a section meaning
  // going from vb-arizona to /arizona
  // we ignore vb-national
  if (!section) {
    addAdPath(articleData, arcSite);
    return articleData;
  }
  const actualSection = section?.split("-")?.[1];
  const sectionName = actualSection !== "national" ? `/${actualSection}` : null;

  if (!sectionName) return articleData;

  // get the section
  const { data: sectionData } = await axios({
    method: "GET",
    url: `${CONTENT_BASE}/site/v3/website/${arcSite}/section?_id=${sectionName}`,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
    },
  });

  articleData["site_section"] = sectionData;
  addAdPath(articleData);
  return articleData;
};

export default {
  fetch,
  params: {
    _id: "text",
    section: "text",
  },
  transform: (data, query) => getResizedImageData(data, null, null, null, query["arc-site"]),
};
