import { memo } from "react";
import { InputsWrapper, LabelWrapper, NavWrapper } from "../styles";
import InputField from "./InputField";

const StepsNumberBoundsNav = ({ label, onChangeUpperBound, onChangeLowerBound, upperBound, lowerBound }: {
  label: string, onChangeUpperBound: any, onChangeLowerBound: any, upperBound: number, lowerBound: number
}) => {

  return (
    <NavWrapper>
      <LabelWrapper>{label}</LabelWrapper>
      <InputsWrapper>
        <InputField
          name={"n"}
          onChange={onChangeLowerBound}
          value={lowerBound} />
        <InputField
          name={"N"}
          onChange={onChangeUpperBound}
          value={upperBound} />
      </InputsWrapper>
    </NavWrapper>
  );
};

export default memo(StepsNumberBoundsNav);