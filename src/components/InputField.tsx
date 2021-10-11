import styled from "@emotion/styled";
import { memo } from "react";

const InputWrapper = styled.div`

`;

const Input = styled.input`
  width: 5rem;
  margin: 5px;
`;

const InputField = ({ name, onChange, value, } :{
    name: string, onChange: any, value: number
}) => {

   return (
     <InputWrapper>
        <Input
            type="number"
            name={name}
            onChange={onChange}
            value={value} />
     </InputWrapper>
   );
};

export default memo(InputField);