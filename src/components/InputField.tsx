import styled from "@emotion/styled";
import { memo } from "react";

const InputWrapper = styled.div`
  display:flex;
  flex-direction:column;
`;

const Input = styled.input`
  width: 5rem;
  margin: 5px;
`;

const NameWrapper = styled.span`
  margin-left: 5px;
  font-size: 11pt;
`;

const InputField = ({ name, onChange, value, } :{
    name: string, onChange: any, value: number
}) => {

   return (
     <InputWrapper>
     <NameWrapper>{name}</NameWrapper>
      <Input
        type="number"
        step="any"
        onChange={onChange}
        value={value} />
     </InputWrapper>
   );
};

export default memo(InputField);