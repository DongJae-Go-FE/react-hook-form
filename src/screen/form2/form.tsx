"use client";

import Link from "next/link";

import { FC, Fragment } from "react";
import { useForm, Form } from "react-hook-form";

import "./style.css";

const Page: FC = () => {
  const {
    control,
    register,
    formState: { isSubmitSuccessful, errors },
  } = useForm({
    progressive: true, //ssr만 가능하게
  });

  const { control: control2, register: register2 } = useForm({
    progressive: true, //ssr만 가능하게
  });

  return (
    <Fragment>
      <div className="form">
        <Form
          action="/api"
          control={control}
          headers={{ accessToken: "xxx", "Content-Type": "application/json" }}
          onSuccess={() => {
            alert("성공");
          }}
          onError={() => {
            alert("실패");
          }}
        >
          <input {...register("name")} />
          {isSubmitSuccessful && <p>성공했어</p>}
          {errors?.root?.server && <p>실패</p>}
          <button>submit</button>
        </Form>
      </div>
      <div className="form">
        <Form
          control={control2}
          onSubmit={async ({ formData, data, formDataJson, event }) => {
            await fetch("api", {
              method: "post",

              body: formData,
            });
          }}
        >
          <input {...register2("test")} /> <button>submit</button>
        </Form>
      </div>
      <Link href="/form3">3페이지</Link>
    </Fragment>
  );
};

export default Page;
