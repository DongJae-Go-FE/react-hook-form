"use client";

import { FC } from "react";

import { useFormContext } from "react-hook-form";

import "./style.css";

const Input: FC = () => {
  const { register } = useFormContext();
  return <input {...register("test")} />;
};

export default Input;
