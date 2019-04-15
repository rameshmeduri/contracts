import axios from 'axios';

import {
  CREATE_CONTRACT,
  GET_CONTRACTS,
  UPDATE_CONTRACT,
  DELETE_CONTRACT
} from './types';

const createContract = (payload) => (dispatch) => {
  axios
    .post('/api/contract', payload)
    .then((res) => {
      dispatch({ type: CREATE_CONTRACT, payload: res.data });
    })
    .catch((err) => {
      console.error(err);
    });
};

const getContracts = () => (dispatch) => {
  axios
    .get('/api/contract')
    .then((res) => {
      dispatch({ type: GET_CONTRACTS, payload: res.data });
    })
    .catch((err) => {
      console.error(err);
    });
};

const updateContract = (payload) => (dispatch) => {
  axios
    .put(`/api/contract/${payload._id}`, payload)
    .then((res) => {
      dispatch({ type: UPDATE_CONTRACT, payload: res.data });
    })
    .catch((err) => {
      console.error(err);
    });
};

const deleteContract = (id) => (dispatch) => {
  axios
    .delete(`/api/contract/${id}`)
    .then((res) => {
      dispatch({ type: DELETE_CONTRACT, payload: id });
    })
    .catch((err) => {
      console.error(err);
    });
};

export { createContract, getContracts, updateContract, deleteContract };
