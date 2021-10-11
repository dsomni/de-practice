import styled from "@emotion/styled";
import { memo, useEffect, useState } from "react";

const SliderWrapper = styled.div`
    display: flex;
    align-items: baseline;
    margin: 10px;
    flex-direction: column;
`;

const LabelWrapper = styled.span`

    margin-top: 0px;
    margin-left: 10px;
    margin-bottom: 5px;
    font-weight: bolder;
    color: black;
    font-size: 13pt;
`;

const ValueWrapper = styled.span`
  margin-top: 5px;
  margin-left: 5px;
  font-size: 12pt;
`;

const RangeSlider = ({  label, onChange, value, min, max, step } :{
    label: any, onChange: any, value: any,  min:any, max:any, step: any
}) => {

   const [sliderVal, setSliderVal] = useState(0);

   const [mouseState, setMouseState] = useState("");

   useEffect(() => {
     setSliderVal(value);
   }, [value]);

   const changeCallback = (e: any) => {
     setSliderVal(e.target.value);
   }

   useEffect(() => {
     if (mouseState === "up") {
       onChange(sliderVal)
     }
   }, [mouseState])

   return (
     <SliderWrapper>
       <LabelWrapper>{label}</LabelWrapper>
       <input
         type="range"
         value={sliderVal}
         min={min}
         max={max}
         step={step}
         onChange={changeCallback}
         onMouseDown={() => setMouseState("down")}
         onMouseUp={() => setMouseState("up")}
       />
       <ValueWrapper>{ sliderVal }</ValueWrapper>
     </SliderWrapper>
   );
};

export default memo(RangeSlider);