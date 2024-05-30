import { Axios } from './Axios';

export const getFiles = async (roomId) => {
  try {
    const response = await Axios.get(`/room/${roomId}/file`, { withCredentials: false });
    return response.data.data;
  } catch (error) {
    return error;
  }
};
