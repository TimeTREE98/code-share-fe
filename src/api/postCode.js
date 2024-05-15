import { Axios } from './Axios';

export const postCode = async (code) => {
  try {
    const response = await Axios.post(`/submissions?base64_encoded=false&wait=true`, {
      source_code: code,
      language_id: 63,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
