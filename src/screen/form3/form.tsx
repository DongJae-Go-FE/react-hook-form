"use client";

import { FC, Fragment } from "react";
import {
  useForm,
  SubmitHandler,
  FormProvider,
  useFormContext,
} from "react-hook-form";

import "./style.css";

const Page: FC = () => {
  const methods = useForm();
  const onSubmit: SubmitHandler<any> = (data) => console.log(data);
  return (
    <Fragment>
      <div className="form">
        <h2>provider 폼</h2>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Input />
            <input type="submit" />
          </form>
        </FormProvider>
      </div>
    </Fragment>
  );
};

export default Page;

function Input() {
  const { register } = useFormContext();
  return <input {...register("test")} />;
}
