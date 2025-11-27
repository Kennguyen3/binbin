// src/constants/API.ts
// const API_URL = 'http://delivery.kennjdemo.com/api';
// const API_URL = 'http://10.0.2.2:8000/api';
const API_URL = 'https://delivery-staging.kendemo.com/api';
export const PRODUCT_ENDPOINT = `${API_URL}/personal/home-page`;
export const CATEGORY_ENDPOINT = `${API_URL}/personal/get-group`;
export const PRODUCT_SEARCH = `${API_URL}/personal/get-store`;
export const LOGIN_ENDPOINT = `${API_URL}/auth/login`;
export const UPDATE_PASSWORD_ENDPOINT = `${API_URL}/customer/change-password`;
export const REGISTER_ENDPOINT = `${API_URL}/auth/register-personal`;
export const UPDATE_PROFILE = `${API_URL}/customer/profile`;
export const UPDATE_ADDRESS_PROFILE = `${API_URL}/personal/add-address`;
export const UPDATE_FULLNAME_PROFILE = `${API_URL}/customer/profile`;
export const GETFULL_ADDRESS_PROFILE = `${API_URL}/personal/get-address-by-lat-lng`;
export const STORE_DETAIL = `${API_URL}/shop-with-out-auth/`;
export const ADD_REMOVE_FAVORITE = `${API_URL}/personal/add-favorite-shop`;
export const LIST_FAVORITE = `${API_URL}/personal/list-favorite-shops`;
export const GET_DISTANCE = `${API_URL}/personal/calculate-shipping-cost`;
export const POST_ORDER = `${API_URL}/personal/order-create`;
export const GET_DETAIL_ORDER = `${API_URL}/personal/orders-detail/`;
export const CANCEL_ORDER = `${API_URL}/personal/order-cancel`;
export const LIST_ORDER = `${API_URL}/personal/orders-list`;
export const DETAIL_ORDER = `${API_URL}/personal/orders-detail`;
export const LIST_ORDER_PROCESS = `${API_URL}/personal/orders-list-in-process`;


