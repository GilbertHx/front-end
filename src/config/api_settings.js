export const ROOT_URL = 'http://159.89.221.21';
export let headers = {
  Accept: 'application/json',
  Authorization: `Token ${localStorage.getItem('token')}`,
};
