import _ from 'lodash';

/**
 * This file should be moved to EDCCommon.js file
 */
const deepClone = (listObj) => {
   var output, value, key;
   output = Array.isArray(listObj) ? [] : {};
   for (key in listObj) {
      value = listObj[key];
      if (output[key] === (typeof value === "object")) {
         output[key] = deepClone(value)

      } else {
         output[key] = value
      }
   }
   return output;
}

const removeObj = (array, element) => {
   return array.filter(e => !_.isEqual(e, element));
}

const sortListObj = (property, type) => {

   return (x, y) => {
      if (type === 'asc') {
         return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
      } else if (type === 'desc') {
         return ((x[property] === y[property]) ? 0 : ((x[property] < y[property]) ? 1 : -1));
      }
   };

};

const checkIncludes = (array, element) => {
   let checked = array.find(e => _.isEqual(e, element));
   if (checked) {
      return true;
   } else {
      return false;
   }
}

export const ggCommon = {
   deepClone,
   removeObj,
   sortListObj,
   checkIncludes,
}