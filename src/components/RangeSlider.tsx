import { memo, useEffect, useState } from "react";

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
     <div className="range-slider">
       <h3>{label}</h3>
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
        <h4>value: { sliderVal }</h4>
     </div>
   );
};

export default memo(RangeSlider);