export const ROOT_URL = 'http://localhost:8000' || 'http://127.0.0.1:8000';
export const headers = {
  Accept: 'application/json',
  Authorization: `Token ${localStorage.getItem('token')}`,
};
