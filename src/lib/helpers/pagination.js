const getPagedData = (data, page, limit) => {
  const totalItems = data.count;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit) - 1;
  const isFirstPage = currentPage !== 0 ? false : true;
  const isLastPage = totalPages !== currentPage ? false : true;

  return { totalItems, data, totalPages, currentPage, isFirstPage, isLastPage };
};

const getPagedMetaData = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

export { getPagedMetaData, getPagedData };
