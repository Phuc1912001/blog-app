import { useDispatch } from "react-redux";

export const useNotify = () => {
  const dispatch = useDispatch();

  const setNotify = (type: any, message: any) => {
    // dispatch(...)
  };

  return setNotify;
};

const App = () => {
  const setNotify = useNotify();

  
};
