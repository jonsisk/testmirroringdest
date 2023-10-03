import { useContent } from "fusion:content";
import { xmlToJson } from "../helpers/xmlToJson.helper";

export const useGetJobs = (params) => {
  const jobs = useContent({
    source: "site-service-jobs-civic",
    query: {
      ...params,
    },
  });
  return { data: jobs ? xmlToJson.parse(jobs.data)?.rss?.channel?.item : [] };
};
