import _ from 'lodash';

const compare = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  const result = keys
    .map((key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];
      if (_.isEqual(value1, value2)) {
        return { key, type: 'unchanged', value: value1 };
      }
      if (!_.has(obj1, key) && _.has(obj2, key)) {
        return { key, type: 'added', value: value2 };
      }
      if (_.has(obj1, key) && !_.has(obj2, key)) {
        return { key, type: 'deleted', value: value1 };
      }
      if (_.isObject(value1) && _.isObject(value2)) {
        const children = compare(value1, value2);
        return { key, type: 'nested', value: children };
      }
      return {
        key, type: 'changed', valueOld: value1, valueNew: value2,
      };
    });
  return result.flat();
};

export default compare;
