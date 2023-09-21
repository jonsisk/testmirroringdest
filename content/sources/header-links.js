export default {
  resolve(resolveParams) {
    const { sectionId, site } = resolveParams;
    return `/site/v3/navigation/${site}?${`hierarchy=${"header-links"}`}${
      sectionId ? `&_id=${sectionId}` : ""
    }`;
  },
  schemaName: "navigation-hierarchy",
  params: {
    hierarchy: "text",
    sectionId: "text",
    site: "text",
  },
  transform: (data, query) => {
    let idMatch = false;
    if (query.sectionId) {
      idMatch = data._id !== query.sectionId;
    }

    if ((!query.hierarchy && idMatch) || (query.uri && idMatch)) {
      const error = new Error("Not found");
      error.statusCode = 404;
      throw error;
    }

    return data;
  },
};
