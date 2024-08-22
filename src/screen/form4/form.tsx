"use client";

import { FC, Fragment } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "./style.css";

const schema = yup
  .object({
    firstName: yup.string().required(),
    age: yup.number().positive().integer().required(),
  })
  .required();

const Page: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<any> = (data) => console.log(data);

  return (
    <Fragment>
      <div className="form">
        <h2>schema 검증 폼</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("firstName")} />
          <p>{errors.firstName?.message}</p>

          <input {...register("age")} />
          <p>{errors.age?.message}</p>

          <input type="submit" />
        </form>
      </div>
    </Fragment>
  );
};

export default Page;
