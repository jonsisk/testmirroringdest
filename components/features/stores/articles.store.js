import { create } from "zustand";
/**
 * Zustand store for article. This is used for the articles that are rendered on a component
 * and then is queried by other components to avoid show duplicates.
 */
export const useArticleStore = create((set) => ({
  articles: [],
  addArticle: (id) => {
    set((state) => ({
      articles: !state.articles.includes(id) ? [...state.articles, id] : state.articles,
    }));
  },
}));
