export default {
  resolve(resolveParams) {
    const { bureau } = resolveParams;
    const requestUri = `https://jobs.chalkbeat.org/feed/fbf?bureau=${bureau}`;

    return requestUri;
  },
  transform(data) {
    return { data: data };
  },
};
