import yaml from 'js-yaml';

const fileParse = (file, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(file);
    case 'yml':
    case 'yaml':
      return yaml.load(file);
    default:
      throw new Error(`${format} unknown file format`);
  }
};

export default fileParse;
