import * as yup from 'yup';
import Messages from './messages';

export const loginSchema = yup.object().shape({
  id: yup
    .string()
    .required(Messages.ID_REQUIRED)
    .matches(/^[A-Za-z0-9+_.-]+@(.+)$/, Messages.ID),
  password: yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, Messages.PASSWORD),
});
