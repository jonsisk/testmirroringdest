export default {
  resolve(resolveParams) {
    const { bureau, count } = resolveParams;
    const requestUri = `https://events.chalkbeat.org/feed/cbeventsrss?bureau=${bureau}&count=${count}`;

    return requestUri;
  },
  transform(data) {
    return { data: data };
  },
};
