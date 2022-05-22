import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export const useUnAuthorized = () => {
  const navigate = useNavigate();

  return (error: AxiosError) => {
    if (error?.response?.status === 401) {
      navigate("/login");
    }
  };
};

export function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}
