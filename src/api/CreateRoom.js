import { Axios } from './Axios';

export const createRoom = (name) => {
  Axios.post('/room', {
    name,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
