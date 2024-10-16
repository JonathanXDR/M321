import * as Yup from 'yup';

export const profileSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  age: Yup.number().optional(),
  gender: Yup.string().optional(),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string().required('Confirm password is required'),
});
