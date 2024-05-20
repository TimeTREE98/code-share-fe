import { Axios } from './Axios';

export const login = async (data) => {
  try {
    const response = await Axios.post('/auth/login', {
      id: data.id,
      pw: data.pw,
    });
    return response.data;
  } catch (error) {
    return { message: '로그인에 실패했습니다.' };
  }
};

export const me = async () => {
  try {
    const response = await Axios.get('/auth/me');
    return response.data;
  } catch (error) {
    return { status: 'fail', message: '에러 발생!! 쿠키 지우고 강제 리프레쉬 부탁드립니다' };
  }
};
