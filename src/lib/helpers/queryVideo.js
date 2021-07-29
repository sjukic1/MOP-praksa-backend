const getOrderQuery = (order) => {
  if (order.trim().match(/^createdDate$/gm)) {
    return 'uploadDate';
  } else if (order.trim().match(/^numOfViews$/gm)) {
    return 'views';
  }
};

const getDurationQuery = (duration) => {
  if (
    duration
      .trim()
      .toLowerCase()
      .match(/^less\d+$/gm)
  ) {
    const firstChar = [0];
    const lastChar = duration.trim().match(/(\d+)/);
    return { first: firstChar, last: lastChar };
  } else if (
    duration
      .trim()
      .toLowerCase()
      .match(/^between\d+and\d+$/gm)
  ) {
    const firstChar = duration.trim().match(/\d+/);
    duration = duration.replace(/\d+and/g, '');
    const lastChar = duration.trim().match(/\d+/);
    return { first: firstChar, last: lastChar };
  } else if (
    duration
      .trim()
      .toLowerCase()
      .match(/^more\d+$/gm)
  ) {
    const firstChar = duration.trim().match(/(\d+)/);
    const lastChar = [1000000];
    return { first: firstChar, last: lastChar };
  }
};

export { getOrderQuery, getDurationQuery };
