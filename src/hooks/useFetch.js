import { useState } from "react";
import { delayFn } from "../helpers/delayFn";
import { toast } from "react-toastify";

export const useFetch = (callback) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchFn = async (arg) => {
    try {
      setLoading(true);
      setError("");
      await delayFn();
      const response = await callback(arg);
      return response;
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return [fetchFn, loading, error];
};
