import { memo, SetStateAction, useEffect, useState } from "react";

//destructive props
const RangeSlider = ({ classes, label, onChange, value, min, max, step } :{
    classes: any, label: any, onChange: any, value: any,  min:any, max:any, step: any
}) => {
    //set initial value to 0 this will change inside useEffect in first render also| or you can directly set useState(value)
   const [sliderVal, setSliderVal] = useState(0);

   // keep mouse state to determine whether i should call parent onChange or not.
   // so basically after dragging the slider and then release the mouse then we will call the parent onChange, otherwise parent function will get call each and every change
   const [mouseState, setMouseState] = useState("");

   useEffect(() => {
     setSliderVal(value); // set new value when value gets changed, even when first render
   }, [value]);

   const changeCallback = (e: any) => {
     setSliderVal(e.target.value); // update local state of the value when changing
   }

   useEffect(() => {
     if (mouseState === "up") {
       onChange(sliderVal)// when mouse is up then call the parent onChange
     }
   }, [mouseState])

   return (
     <div className="range-slider">
       <p>{label}</p>
       <h3>value: { sliderVal }</h3>
       <input
         type="range"
         value={sliderVal}
         min={min}
         max={max}
         step={step}
         className={`slider ${classes}`}
         id="myRange"
         onChange={changeCallback}
         onMouseDown={() => setMouseState("down")} // When mouse down set the mouseState to 'down'
         onMouseUp={() => setMouseState("up")} // When mouse down set the mouseState to 'up' | now we can call the parent onChnage
       />
     </div>
   );
};

export default memo(RangeSlider);