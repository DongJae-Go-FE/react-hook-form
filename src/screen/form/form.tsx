"use client";

import Link from "next/link";

import { FC } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
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

type FormInputItemType = {
  common: string;
  commonRequired: string;
  pattern: string;
  number: number;
  counter: Select;
  Age: number;
  rdsinput: string;
  messageCustum: string;
  mail: string;
};
// input을 추가할 때 마다 타입을 추가한후 register에서 사용.

const Page: FC = () => {
  const {
    register, //구조분해 할당 형식으로 input의 name을 지정해준다
    handleSubmit, //submit 함수
    watch, // 감지하는 함수
    formState: { errors }, // input에 따른 form 상태
    control, // 외부 라이브러리 연동
    reset, // 초기화 함수
  } = useForm<FormInputItemType>({
    defaultValues: {
      rdsinput: "RDS 인풋 추가및 기본값 설정", // 초기값을 설정 할 수 있다.
    },
  }); //useForm을 사용하여 type을 input 만큼 지정을 해준다.

  const onSubmit: SubmitHandler<FormInputItemType> = (data) =>
    console.log(data);

  console.log("숫자인지 확인:::", watch("number"));

  return (
    <div className="form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="1">기본</label>
        <input id="1" defaultValue="기본" {...register("common")} />

        <label htmlFor="2">필수 에러 보여주기</label>
        <input
          id="2"
          {...register("commonRequired", { required: true })}
          placeholder="필수"
        />
        {errors.commonRequired && (
          <span style={{ color: "red", fontSize: 14 }}>필수임</span>
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
          {...register("messageCustum", { required: true })}
          aria-invalid={errors.messageCustum ? "true" : "false"}
        />
        {errors.messageCustum?.type === "required" && (
          <p style={{ color: "red", fontSize: 14 }}>필수값</p>
        )}

        <label htmlFor="6">에러메세지 직접입력</label>
        <input
          id="6"
          {...register("mail", { required: "메일 없음" })}
          aria-invalid={errors.mail ? "true" : "false"}
        />
        {errors.mail && (
          <p style={{ color: "red", fontSize: 14 }}>{errors.mail.message}</p>
        )}

        <input type="submit" />
        <button type="reset" onClick={() => reset()}>
          초기화
        </button>
      </form>
      <Link href="/form2">2페이지</Link>
    </div>
  );
};

export default Page;
