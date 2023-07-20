/* eslint-disable no-restricted-globals */
export const useBrowserGlobals = () => {
  if (typeof window !== "undefined") {
    return { window, document };
  }

  return undefined;
};
