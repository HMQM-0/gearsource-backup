/*
import * as React from "react";
import { IFormError } from "@types";

interface IPurchaseOrderFormProps {
  formRef?: React.RefObject<HTMLFormElement>;
  formId?: string;
  errors?: IFormError[];
  onSubmit: () => Promise<void>;
}

const PurchaseOrderForm: React.FC<IPurchaseOrderFormProps> = (props) => {
  const { formRef, formId, errors, onSubmit } = props;

  return (
    <Formik initialValues={null} onSubmit={onSubmit()}>
      {({
        handleChange,
        handleSubmit,
        handleBlur,
        values,
        isSubmitting,
        isValid,
      }) => <div></div>}
    </Formik>
  );
};

export default PurchaseOrderForm;
*/
