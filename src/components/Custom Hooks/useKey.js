import { useEffect, useRef } from "react";

export function useKey(key, action) {
  const inputElm = useRef(null);

  // Focus on Input When Keys Was Pressed
  useEffect(
    function () {
      function callback(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }
      document.addEventListener("keydown", callback);

      return () => {
        document.removeEventListener("keydown", callback);
      };
    },
    [action, key]
  );

  return { inputElm };
}
