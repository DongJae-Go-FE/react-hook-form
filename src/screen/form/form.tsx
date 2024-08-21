"use client";

import { FC } from "react";
import { useForm, SubmitHandler, Controller, Form } from "react-hook-form";
import { components } from "@r114dev/rds";

import CustumSelect from "@/components/Select";

import "./style.css";

const {
  textInput: { Input: RdsInput },
} = components;

enum Select {
  one = "1",
  two = "2",
  three = "3",
}

type Inputs = {
  example: string;
  exampleRequired: string;
  pattern: string;
  number: number;
  counter: Select;
  Age: number;
  rdsinput: string;
  MyCheckbox: string;
  firstName: string;
  mail: string;
};
// input을 추가할 때 마다 타입을 추가한다.

const Page: FC = () => {
  const {
    register, //구조분해 할당 형식으로 input의 name을 지정해준다
    handleSubmit, //submit 함수
    watch, // 감지하는 함수
    formState: { errors }, // input에 따른 form 상태
    control,
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      rdsinput: "RDS 인풋 추가및 기본값 설정",
    },
  }); //useForm을 사용하여 typed을 input 만큼 지정을 해준다.

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log("숫자인지 확인:::", watch("number"));

  return (
    <div className="form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="1">기본</label>
        <input id="1" defaultValue="기본" {...register("example")} />

        <label htmlFor="2">필수 에러 보여주기</label>
        <input
          id="2"
          {...register("exampleRequired", { required: true })}
          placeholder="필수"
        />
        {errors.exampleRequired && (
          <span style={{ color: "red", fontSize: 14 }}>필수다 멍청아</span>
        )}

        <label htmlFor="3">pattern 으로 정규식</label>
        <input
          id="3"
          {...register("pattern", { pattern: /^[A-Za-z]+$/i })}
          placeholder="패턴"
        />
        {errors.pattern && (
          <span style={{ color: "red", fontSize: 14 }}>조건 틀렸어</span>
        )}

        <label htmlFor="4">값은 입력 받지만 숫자만 전달 </label>
        <input type="text" {...register("number", { valueAsNumber: true })} />

        <label htmlFor="counter">셀렉트박스</label>
        <select {...register("counter")} id="counter">
          <option value="1">one</option>
          <option value="2">two</option>
          <option value="3">three</option>
        </select>

        <CustumSelect
          label="fowardRef"
          {...register("Age", { required: true })}
        />
        {errors.Age && <span>필수야</span>}

        <label htmlFor="4">RDS Input 추가</label>
        <Controller
          name="rdsinput"
          control={control}
          render={({ field }) => <RdsInput id="4" {...field} />}
        />
        <label htmlFor="5">에러 타입으로 에러 메세지 핸들링</label>
        <input
          {...register("firstName", { required: true })}
          aria-invalid={errors.firstName ? "true" : "false"}
        />
        {errors.firstName?.type === "required" && <p role="alert">필수값</p>}

        <label htmlFor="6">에러메세지 직접입력</label>
        <input
          id="6"
          {...register("mail", { required: "Email Address is required" })}
          aria-invalid={errors.mail ? "true" : "false"}
        />
        {errors.mail && <p role="alert">{errors.mail.message}</p>}

        <input type="submit" />
        <button type="reset" onClick={() => reset()}>
          초기화
        </button>
      </form>
    </div>
  );
};

export default Page;
