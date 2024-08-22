"use client";

import Link from "next/link";

import { FC, Fragment, useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";

import Input from "@/components/Input/Input";

import "./style.css";

const Page: FC = () => {
  const methods = useForm();
  const [value, setValue] = useState("");
  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data), setValue(data.test);
  };

  return (
    <Fragment>
      <div className="form">
        <h2>provider 폼</h2>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Input />
            <p>{value}</p>
            <input type="submit" />
          </form>
        </FormProvider>
        <Link href="/form4">4페이지</Link>
      </div>
    </Fragment>
  );
};

export default Page;
