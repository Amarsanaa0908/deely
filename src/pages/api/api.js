import axios from 'axios';
import baseAxios from './baseAxios';
baseAxios;

const callGet = async (command) => {
  const result = await baseAxios.get(command);
  return result?.status === 200 ? result.data : null;
};

const callPost = async (command, data, hideMsg = false) => {
  const result = await baseAxios.post(command, data);

  const resultData = result?.data;

  return resultData;
};

const callPromiseAllInstance = async (fetch) => {
  return await axios.all(fetch).then(axios.spread((...responses) => responses));
};

const apiList = {
  products: 'products',
  cart: 'cart',
  checkout: 'checkout',
  home: 'home',
  order: 'order',
  collection: 'collections',
  images: 'images',
  track: 'track',
  review: 'review',
  private: 'private',
  customer: 'customer',
  delivery: 'delivery',
  draft: 'draft',
};

export { apiList, callGet, callPost, callPromiseAllInstance };
