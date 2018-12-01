import fetch from 'cross-fetch';
import { API_CONST } from '../API';
import { tokenUtil } from '../utils/token';

const getRegionList = () => {
   var getObject = {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json'
      }
   };
   let url = API_CONST.REGION_LIST_URL;
   tokenUtil.updateOrCreateHeader(getObject);
   return fetch(url, getObject)
      .then(responseData => {
         tokenUtil.checkAuthorizedStatus(responseData);
         if (responseData.status >= 400) {
            throw new Error(responseData.statusText);
         }
         return responseData.json();
      })
      .then(data => {
         return data;
      })
      .catch(err => {
         return err;
      });
}
const loadRegionList = () => {
   console.log("API load user");
   let getObject = {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
      }
   };
   // tokenUtil.updateOrCreateHeader(getObject);

   return fetch(API_CONST.API_URL + '/regions/all', getObject)
      .then(responseData => {
         // tokenUtil.checkAuthorizedStatus(responseData);
         if (responseData.status >= 400) {
            throw new Error("Bad response from server");
         }
         return responseData.json(); // This is a MUST, do not remove.
      })
      .then(data => {
         if (data.errorCode === 0) {
            return data.data;
         }
      })
      .catch(err => {
         throw new Error(err);
      });
}

const fetchRegionDetail = uid => {
   let getObject = {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
      }
   }

   return fetch(API_CONST.API_URL + '/regions/findByUid/' + uid, getObject)
      .then(responseData => {
         if (responseData.status >= 400) {
            throw new Error('Bad response from server');
         }
         return responseData.json();
      })
      .then(data => {
         if (data.errorCode == 0) {
            return data.data;
         }
      })
      .catch(err => {
         throw new Error(err);
      });
}

export const regionService = {
   loadRegionList,
   fetchRegionDetail,
   getRegionList
}