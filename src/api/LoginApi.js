import { Axios } from './Axios';

export const login = async (data) => {
  try {
    const response = await Axios.post('/auth/login', {
      id: data.id,
      pw: data.pw,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const me = async () => {
  try {
    const response = await Axios.get('/auth/me');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
