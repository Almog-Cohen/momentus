const DEFUALT_PAGE_LIMIT = 0;
const DEFUALT_PAGE_NUMBER = 1;
// Nuild pagaintion with query params per page by query parameters
const getPagination = (query) => {
  const limit = Math.abs(query.limit) || DEFUALT_PAGE_LIMIT;
  const page = Math.abs(query.page) || DEFUALT_PAGE_NUMBER;
  const skip = (page - 1) * limit;
  return {
    skip,
    limit,
  };
};

module.exports = {
  getPagination,
};
