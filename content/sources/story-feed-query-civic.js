import { transformFeedData } from "../helpers/tranformers.helper";

export default {
  resolve: (params) =>
    `/content/v4/search/published?q=${params.query || "*"}&website=${params.site}&size=${
      params.size || 8
    }&from=${params.offset || 0}&sort=display_date:desc`,
  schemaName: "ans-feed",
  params: {
    query: "text",
    size: "number",
    offset: "number",
    site: "text",
  },
  // other options null use default functionality, such as filter quality
  transform: (data, query) => transformFeedData(data, query),
};
