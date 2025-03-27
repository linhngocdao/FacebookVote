import { useState, useEffect } from 'react';

/**
 * Hook để debounce giá trị
 * @param value - Giá trị cần debounce
 * @param delay - Thời gian debounce (ms)
 * @returns Giá trị đã được debounce
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Tạo một timeout để update debouncedValue sau khoảng thời gian delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function để clear timeout nếu value hoặc delay thay đổi
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
