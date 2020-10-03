import endpoints from "./endpoints";

const axios = require("axios");

export const loginUsuario = async (request) => {
  try {
    return axios.post(endpoints.login, request);
  } catch (error) {
    console.log(error);
  }
};


export const createUsuario = async (request) => {
  try {
    return axios.post(endpoints.createUsuario, request);
  } catch (error) {
    console.log(error);
  }
};

export const backup = async (request) => {
  try {

    console.log(request);

    return axios.post(endpoints.backup, request);
  } catch (error) {
    console.log(error);
  }
};

export const deleteByIdUsuario = async (request) => {
  try {
    return axios.post(endpoints.deleteByIdUsuario, request);
  } catch (error) {
    console.log(error);
  }
};

export const getByIdUsuario = async (request) => {
  try {
    return axios.post(endpoints.getByIdUsuario, request);
  } catch (error) {
    console.log(error);
  }
};


