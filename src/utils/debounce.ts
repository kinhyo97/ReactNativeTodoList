import { useEffect } from "react";

/**
 * deps가 변경된 후 delay(ms) 동안 추가 변경이 없을 때 effect 실행
 */
export function useDebouncedEffect(
  effect: () => void,
  deps: any[],
  delay: number
) {
  useEffect(() => {
    const handler = setTimeout(() => {
      effect();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, delay]);
}
