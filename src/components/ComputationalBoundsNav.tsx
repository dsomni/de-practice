import styled from "@emotion/styled";
import { memo } from "react";
import InputField from "./InputField";

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


const ComputationalBoundsNav = ({ label, onChangeUpperBound, onChangeLowerBound, upperBound, lowerBound }: {
  label: string, onChangeUpperBound: any, onChangeLowerBound: any, upperBound: number, lowerBound: number
}) => {

  return (
    <NavWrapper>
      <LabelWrapper>{label}</LabelWrapper>
      <InputsWrapper>
        <InputField
          name={"Xo"}
          onChange={onChangeLowerBound}
          value={lowerBound} />
        <InputField
          name={"X"}
          onChange={onChangeUpperBound}
          value={upperBound} />
      </InputsWrapper>
    </NavWrapper>
  );
};

export default memo(ComputationalBoundsNav);