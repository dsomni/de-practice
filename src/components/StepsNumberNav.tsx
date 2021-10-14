import { memo } from "react";
import { NavWrapperSlider } from "../styles";
import InputField from "./InputField";
import RangeSlider from "./RangeSlider";


const StepsNumberNav = ({ label, onChangeN, onChangeMaxN, onChangeMinN, value, maxVal, minVal }: {
  label: string, onChangeN: any, onChangeMaxN: any, onChangeMinN: any, value: number, maxVal: number, minVal: number
}) => {

  return (
    <NavWrapperSlider>
      <InputField
        name={"Min N"}
        onChange={onChangeMinN}
        value={minVal} />
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
    </NavWrapperSlider>
  );
};

export default memo(StepsNumberNav);