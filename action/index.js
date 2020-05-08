/* eslint-disable no-undefined */

export const GET_ALL_DONOR = 'GET_ALL_DONOR';
export const NEW_DONOR = 'NEW_DONOR';
export const DELETE_DONOR = 'DELETE_DONOR';
export const UPDATE_DONOR = 'UPDATE_DONOR';

export const GET_ALL_RECIPIENT = 'GET_ALL_RECIPIENT';
export const NEW_RECIPIENT = 'NEW_RECIPIENT';
export const DELETE_RECIPIENT = 'DELETE_RECIPIENT';




export const getAllRecipients = () => dispatch => {
  fetch('https://food--ashurs.herokuapp.com/api/v1/recipient')
    .then(response => response.json())
    .then(data =>
      dispatch ({
        type: GET_ALL_RECIPIENT,
        payload: data,
      }),
    );
};

export const addRecipient = (postData) => dispatch => {
  fetch('https://food--ashurs.herokuapp.com/api/v1/recipient', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postData),
  })
    .then(res => res.json())
    .then(data =>
      dispatch ({
        type: NEW_RECIPIENT,
        payload: data,
      }),
    );
};

export const deleteRecipient = (id) => dispatch => {
  fetch(`https://food--ashurs.herokuapp.com/api/v1/recipient/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: undefined,
  })
    .then(res => res.json())
    .then(data =>
      dispatch ({
        type: DELETE_RECIPIENT,
        payload: {},
      }),
    );
};

export const getAllDonors = () => dispatch => {
  fetch('https://food--ashurs.herokuapp.com/api/v1/donor')
    .then(response => response.json())
    .then(data =>
      dispatch ({
        type: GET_ALL_DONOR,
        payload: data,
      }),
    );
};

export const addDonor = (postData) => dispatch => {
  fetch('https://food--ashurs.herokuapp.com/api/v1/donor', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postData),
  })
    .then(res => res.json())
    .then(data =>
      dispatch ({
        type: NEW_DONOR,
        payload: data,
      }),
    );
};

export const deleteDonor = (id) => dispatch => {
  fetch(`https://food--ashurs.herokuapp.com/api/v1/donor/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: undefined,
  })
    .then(res => res.json())
    .then(data =>
      dispatch ({
        type: DELETE_DONOR,
        payload: {},
      }),
    );
};
export const updateDonor = (id, updated) => dispatch => {
  fetch(`https://food--ashurs.herokuapp.com/api/v1/donor/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updated),
  })
    .then(res => res.json())
    .then(data =>
      dispatch ({
        type: UPDATE_DONOR,
        payload: data,
      }),
    );
};