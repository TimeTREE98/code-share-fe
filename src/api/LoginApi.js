import { Axios } from './Axios';

export const LoginApi = (data, callbackFunctions) => {
  const { loginSuccess, loginError } = callbackFunctions;
  Axios.post('/auth/login', {
    id: data.id,
    pw: data.pw,
  })
    .then((res) => {
      loginSuccess(res);
    })
    .catch((error) => {
      loginError(error);
    });
};
