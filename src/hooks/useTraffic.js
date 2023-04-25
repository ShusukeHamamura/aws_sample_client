import axios from "axios";
import { useCallback, useState } from "react";

export const useTraffic = () => {
  const getTrafficVolume = useCallback((props) => {
    const { date, location } = props;
    const res_data = axios
      .post("http://localhost:3001/api/test", {
        date: date,
        device_id: location,
      })
      .then((results) => {
        return results.data;
      })
      .catch(() => {
        alert("失敗1");
      });
    // axios
    //   .get("http://localhost:3001/api/", { date: date })
    //   .then((results) => {
    //     results.data.forEach((res) => {
    //       console.log(res["11~12_1"]);
    //     });
    //   })
    //   .catch(() => {
    //     alert("失敗");
    //   });
    return res_data;
  });
  return { getTrafficVolume };
};
