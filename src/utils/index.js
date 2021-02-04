import { useEffect, useState } from "react";

export const isFalsy = (value) => (value === 0 ? false : !value);
//在一个函数中，改变传入的对象本身是不好的
export const cleanObject = (object) => {
  console.log(object);
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};
export const useMount = (callback) => {
  useEffect(() => {
    callback;
  }, []);
};
export const useDebounce = (value, delay) => {
  const [newValue, setNewValue] = useState(value);
  useEffect(() => {
    //每次在value变化以后，设置一个定时器
    const timer = setTimeout(() => {
      setNewValue(value);
    }, 2000);
    //每次在上一个useEffect处理完以后再运行，第一个effect的timer被第二个effect清理，最后一个无人清理
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return newValue;
};
