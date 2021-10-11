import { memo, useState } from "react";
import InputField from "./InputField";
import RangeSlider from "./RangeSlider";

const StepsNumberNav = ({ label, onChangeN, onChangeMaxN, onChangeMinN, value, maxVal, minVal }: {
  label: string, onChangeN: any, onChangeMaxN: any, onChangeMinN: any, value: number, maxVal: number, minVal: number
}) => {

  return (
    <div>
      <RangeSlider
        label={label}
        onChange={onChangeN}
        value={value}
        min={minVal}
        max={maxVal}
        step={1} />
      <InputField
        name={"Max N"}
        onChange={onChangeMaxN}
        value={maxVal} />
      <InputField
        name={"Min N"}
        onChange={onChangeMinN}
        value={minVal} />
    </div>
  );
};

export default memo(StepsNumberNav);

function min(x: number, y: number): number {
  return x < y ? x : y;
}
