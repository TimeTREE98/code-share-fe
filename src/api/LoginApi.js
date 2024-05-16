import { Axios } from './Axios';

export const LoginApi = (data, callbackFunctions) => {
  const { loginSuccess, loginError } = callbackFunctions;
  Axios.post('/auth/login', {
    id: data.id,
    pw: data.pw,
  })
    .then(() => {
      loginSuccess();
    })
    .catch((error) => {
      loginError(error);
    });
};
