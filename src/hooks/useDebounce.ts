const useDebounce = (func: Function, duration = 300) => {
  let timer: number;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, duration);
  };
};
export default useDebounce;
