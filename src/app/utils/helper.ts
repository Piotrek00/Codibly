import { ColorQuery, PageQuery, PerPageQuery } from "./helper-types";

export const getColorId = (colorId: string | null): ColorQuery | {} => {
  if (colorId) {
    return {
      id: colorId,
    };
  }

  return {};
};

export const getPage = (page: string | null): PageQuery | {} => {
  if (page) {
    return {
      page,
    };
  }

  return {};
};

export const getPerPage = (perPage: string | null): PerPageQuery | {} => {
  if (perPage) {
    return {
      per_page: perPage,
    };
  }

  return {};
};
