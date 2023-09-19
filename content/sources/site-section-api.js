const params = {
  section: "text",
};

const resolve = (key = {}) => {
  const site = key["arc-site"];
  const { section } = key;
  return `/site/v3/website/${site}/section?_id=${
    section?.startsWith("/") ? section : `/${section}`
  }`;
};

export default {
  schemaName: "ans-item",
  params,
  resolve,
  transform: (data) => {
    return { site_section: data };
  },
};
