import { memo, useEffect, useState } from "react";

const RangeSlider = ({ classes, label, onChange, value, min, max, step } :{
    classes: any, label: any, onChange: any, value: any,  min:any, max:any, step: any
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
         className={`slider ${classes}`}
         onChange={changeCallback}
         onMouseDown={() => setMouseState("down")}
         onMouseUp={() => setMouseState("up")}
       />
        <h4>value: { sliderVal }</h4>
     </div>
   );
};

export default memo(RangeSlider);