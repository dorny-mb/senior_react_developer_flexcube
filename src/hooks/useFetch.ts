import axios, { Canceler, Method } from "axios";
import { Reducer, useEffect, useReducer } from "react";

type StatusTypes = "idle" | "loading" | "loaded" | "network-error";
type StateTypes = {
  data: any;
  state: StatusTypes;
};

type ActionTypes =
  | {
      type: "SET_STATUS";
      payload: StatusTypes;
    }
  | { type: "DATA"; payload: Object };

const stateReducer: Reducer<StateTypes, ActionTypes> = (
  prevState,
  { type, payload }
): StateTypes => {
  switch (type) {
    case "SET_STATUS":
      return { ...prevState, state: payload as StatusTypes };
    case "DATA":
      return { ...prevState, data: payload };
    default:
      return prevState;
  }
};

const Fetcher = <T>(
  dispatch: React.Dispatch<ActionTypes>,
  method: Method = "GET",
  url: string,
  params?: T
): Canceler => {
  let cancel: Canceler = () => null;
  (async () => {
    try {
      const { data } = await axios({
        method,
        url,
        params: { ...params },
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      });
      dispatch({ type: "DATA", payload: data });
      dispatch({ type: "SET_STATUS", payload: "loaded" });
    } catch (error) {
      dispatch({ type: "SET_STATUS", payload: "network-error" });
      console.log(error);
    }
  })();
  return cancel;
};

const useFetch = <T>(
  url: string,
  method?: Method,
  params?: T,
  delay?: number
) => {
  const [state, dispatch] = useReducer(stateReducer, {
    data: null,
    state: "idle",
  });

  useEffect(() => {
    let cancel: Canceler;

    dispatch({ type: "SET_STATUS", payload: "loading" });
    cancel = Fetcher<T>(dispatch, method, url, params);
    if (delay)
      setInterval(() => {
        cancel = Fetcher<T>(dispatch, method, url, params);
      }, delay);

    return () => {
      cancel();
    };
  }, [url, params, delay, method]);

  return state;
};

export default useFetch;
