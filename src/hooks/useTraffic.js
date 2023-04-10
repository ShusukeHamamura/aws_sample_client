import axios from "axios";
import { useCallback, useState } from "react";

export const useTraffic = () => {
  const [totalCars, setTotalCars] = useState("");
  const [totalCarType, setTotalCarType] = useState([]);
  const [totalCarDirection, setTotalCarDirection] = useState([]);

  const getTrafficVolume = useCallback((props) => {
    const { date } = props;
    setTotalCarType([]);
    setTotalCars("");
    setTotalCarDirection([]);
    axios
      .post("http://localhost:3001/api/test", { date: date })
      .then((results) => {
        results.data.forEach((res) => {
          setTotalCarType((totalCarType) => [...totalCarType, res.car_type]);
          setTotalCars((totalCars) => res.car_id + 1);
          setTotalCarDirection((totalCarDirection) => [
            ...totalCarDirection,
            res.direction,
          ]);
        });
      })
      .catch(() => {
        alert("失敗");
      });
  });
  return { getTrafficVolume, totalCars, totalCarType, totalCarDirection };
};
