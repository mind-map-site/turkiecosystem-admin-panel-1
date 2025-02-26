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


export const useNewsFormValidation = () => {
  return object({
    titleEn: string()
      .min(10, 'Text must be at least 10 characters long.')
      .required('Title is required'),
    titleRu: string()
      .min(10, 'Text must be at least 10 characters long.')
      .required('Title is required'),
    titleAz: string()
      .min(10, 'Text must be at least 10 characters long.')
      .required('Title is required'),
    descriptionEn: string()
      .min(10, 'Text must be at least 10 characters long.')
      .required('Description is required'),
    descriptionRu: string()
      .min(10, 'Text must be at least 10 characters long.')
      .required('Description is required'),
    descriptionAz: string()
      .min(10, 'Text must be at least 10 characters long.')
      .required('Description is required'),
  })
}

export const newsFormInitialValues = { titleEn: '', titleRu: '', titleAz: '', descriptionEn: '', descriptionRu: '', descriptionAz: '' }

export const newsCreateFormInputs = [
  { title: "Title", description:"You can update or create title in three different languages (EN, AZ, RU).", type:"text", isLang:true, id:"title", name:"title"},
  { title: "Description", description: "You can update or create description in three different languages (EN, AZ, RU).", type: "text", isLang: true, id:"description", name:"description"}
]