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
    contentRu: string(),
    contentAz: string()
  });
};


export const useNewsFormValidation = () => {
  return object({
    titleEn: string()
      .min(10, 'Text must be at least 10 characters long.')
      .required('Title is required'),
    titleRu: string(),
    titleAz: string(),
    descriptionEn: string()
      .min(10, 'Text must be at least 10 characters long.')
      .required('Description is required'),
    descriptionRu: string(),
    descriptionAz: string(),
  })
}

export const newsFormInitialValues = { titleEn: '', titleRu: '', titleAz: '', descriptionEn: '', descriptionRu: '', descriptionAz: '' }

export const newsCreateFormInputs = [
  { title: "Title", description: "You can update or create title in three different languages (EN, AZ, RU).", type: "text", isLang: true, id: "title", name: "title" },
  { title: "Description", description: "You can update or create description in three different languages (EN, AZ, RU).", type: "text", isLang: true, id: "description", name: "description" }
]

export const useEcosystemFormValidation = () => {
  return object({
    titleEn: string()
      .min(10, 'Text must be at least 10 characters long.')
      .required('Title is required'),
    titleRu: string(),
    titleAz: string(),
    descriptionEn: string()
      .min(10, 'Text must be at least 10 characters long.')
      .required('Description is required'),
    descriptionRu: string(),
    descriptionAz: string()
      .min(10, 'Text must be at least 10 characters long.'),
    tagCountry: string().required("Tag Country is required"),
    tagProfile: string().required("Tag Profile is required"),
    tagIndustry: string().required("Tag Industry is required"),
  })
}

export const ecosystemFormInitialValues = { titleEn: '', titleRu: '', titleAz: '', descriptionEn: '', descriptionRu: '', descriptionAz: '', tagCountry: "", tagProfile: "", tagIndustry: "" }

export const ecosystemCreateFormInputs = [
  { title: "Title", description: "You can update or create title in three different languages (EN, AZ, RU).", type: "text", isLang: true, id: "title", name: "title" },
  { title: "Description", description: "You can update or create description in three different languages (EN, AZ, RU).", type: "text", isLang: true, id: "description", name: "description" },
  { title: "Tag Country", description: "Select appropriate country", type: "select", isLang: false, id: "country", name: "tagCountry" },
  { title: "Tag Profile", description: "Select appropriate profile", type: "select", isLang: false, id: "profile", name: "tagProfile" },
  { title: "Tag Industry", description: "Select appropriate industry", type: "select", isLang: false, id: "industry", name: "tagIndustry" }
]



export const useEcosystemTagsFormValidation = () => {
  return object({
    tagCountry: string(),
    tagProfile: string(),
    tagIndustry: string(),
  })
}

export const ecosystemTagsInitialValues = { tagCountry: "", tagProfile: "", tagIndustry: "" }


export const ecosystemTagsFormInputs = [
  { title: "Tag Country", description: "Select appropriate country", type: "select", isLang: false, id: "country", name: "tagCountry" },
  { title: "Tag Profile", description: "Select appropriate profile", type: "select", isLang: false, id: "profile", name: "tagProfile" },
  { title: "Tag Industry", description: "Select appropriate industry", type: "select", isLang: false, id: "industry", name: "tagIndustry" }
]