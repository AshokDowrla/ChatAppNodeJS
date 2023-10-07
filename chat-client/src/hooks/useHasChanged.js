import { useEffect, useRef } from "react";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const useHasChanged = (val) => {
  const prevVal = usePrevious(val);
//   console.log(prevVal,val)
  return prevVal !== val;
};

export default useHasChanged;
