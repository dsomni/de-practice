import styled from "@emotion/styled";
import { memo } from "react";
import InputField from "./InputField";
import RangeSlider from "./RangeSlider";

const NavWrapper = styled.div`
    border: 2px black solid;
    display: flex;
    margin: 10px;
    padding: 5px;
    gap: 10px;
    flex-direction: column;
    width: 100%;
    min-width: 430px;
    max-width: 500px;
    justify-content: space-around;
`;

const LabelWrapper = styled.span`
    font-weight: bolder;
    color: black;
    font-size: 13pt;
    text-align: center;
`;

const InputsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  gap: 10px;
  justify-content: space-around;
`;


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