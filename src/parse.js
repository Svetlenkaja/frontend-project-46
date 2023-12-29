const fileParse = (file, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(file);
    default:
      throw new Error('unknown file format');
  }
};

export default fileParse;
