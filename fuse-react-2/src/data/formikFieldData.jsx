import { object, string } from 'yup';

export const useLoginValidation = () => {
  return object({
    username: string().required('Username is required'),
    password: string().required('Password is required'),
  });
};

export const useAboutContentValidation = () => {
  return object({
    contentEn: string()
      .min(10, 'Text must be at least 10 characters long.')
      .required('Content is required'),
    contentRu: string()
      .min(10, 'Text must be at least 10 characters long.')
      .required('Content is required'),
    contentAz: string()
      .min(10, 'Text must be at least 10 characters long.')
      .required('Content is required'),
  });
};
