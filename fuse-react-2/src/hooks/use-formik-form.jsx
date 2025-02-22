/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik} from "formik";

const useFormikForm = (initialValues, validationSchema, onSubmit) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return formik;
};

export default useFormikForm;