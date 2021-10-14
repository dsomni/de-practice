import { memo } from "react";
import { InputsWrapper, LabelWrapper, NavWrapper } from "../styles";
import InputField from "./InputField";

const InitialValueNav = ({ label, onChange, value }: {
  label: string, onChange: any, value: any
}) => {

  return (
    <NavWrapper>
      <LabelWrapper>{label}</LabelWrapper>
      <InputsWrapper>
        <InputField
          name={"Yo"}
          onChange={onChange}
          value={value} />
      </InputsWrapper>
    </NavWrapper>
  );
};

export default memo(InitialValueNav);