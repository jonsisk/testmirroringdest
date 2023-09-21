import { useContent } from "fusion:content";
import { xmlToJson } from "../helpers/xmlToJson.helper";

export const useGetEvents = (params) => {
  const events = useContent({
    source: "site-service-events-civic",
    query: {
      ...params,
    },
  });

  return { data: events ? xmlToJson.parse(events.data)?.rss?.channel?.item : [] };
};
