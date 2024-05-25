import { Axios } from './Axios';

export const getRooms = async () => {
  try {
    const response = await Axios.get('/room');
    return response;
  } catch (error) {
    return error;
  }
};
