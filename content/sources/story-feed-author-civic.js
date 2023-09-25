import { transformFeedData } from "../helpers/tranformers.helper";

export default {
  resolve: ({ authorSlug, feedSize = 8, feedOffset = 0, "arc-site": website }) =>
    `/content/v4/search/published?q=credits.by.slug:"${authorSlug}"&size=${feedSize}&from=${feedOffset}&sort=display_date:desc&website=${website}`,
  schemaName: "ans-feed",
  params: {
    authorSlug: "text",
    feedSize: "number",
    feedOffset: "number",
  },
  // other options null use default functionality, such as filter quality
  transform: (data, query) => transformFeedData(data, query),
};