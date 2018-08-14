export const ROOT_URL = 'http://127.0.0.1:8000';
export let headers = {
  Accept: 'application/json',
  Authorization: `Token ${localStorage.getItem('token')}`,
};