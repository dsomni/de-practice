import styled from "@emotion/styled";
import { memo } from "react";
import InputField from "./InputField";
import RangeSlider from "./RangeSlider";

const NavWrapper = styled.div`
    border: 2px black solid;
    display: flex;
    align-items: center;
    margin: 10px;
    padding: 5px;
    gap: 25px;
    width: 30vw;
    min-width: 430px;
    max-width: 500px;
    justify-content: space-around;
`;


const StepsNumberNav = ({ label, onChangeN, onChangeMaxN, onChangeMinN, value, maxVal, minVal }: {
  label: string, onChangeN: any, onChangeMaxN: any, onChangeMinN: any, value: number, maxVal: number, minVal: number
}) => {

  return (
    <NavWrapper>
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
    </NavWrapper>
  );
};

export default memo(StepsNumberNav);