import axios from "axios";
import { useCallback, useState } from "react";

export const useTraffic = () => {
  const getTrafficVolume = useCallback((props) => {
    const { date, location } = props;
    const res_data = axios
      .post("http://localhost:3001/api", {
        date: date,
        location: location,
      })
      .then((results) => {
        return results.data;
      })
      .catch(() => {
        alert("失敗1");
      });
    return res_data;
  });
  return { getTrafficVolume };
};
