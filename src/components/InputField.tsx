import { memo } from "react";

const InputField = ({ name, onChange, value, } :{
    name: string, onChange: any, value: number
}) => {

   return (
     <div className="input-field">
        <input
            type="number"
            name={name}
            onChange={onChange}
            value={value} />
     </div>
   );
};

export default InputField;