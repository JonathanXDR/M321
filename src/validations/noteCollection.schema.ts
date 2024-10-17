import * as Yup from 'yup';

export const noteCollectionSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  notes: Yup.string().optional(),
});
