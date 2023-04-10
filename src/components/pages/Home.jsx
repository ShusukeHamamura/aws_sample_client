import axios from "axios";
import { useState } from "react";
import { Box, Divider, Flex, Heading, Input, Stack } from "@chakra-ui/react";

import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  const [date, setDate] = useState("");

  const [cars, setCars] = useState([
    {
      device_id: "null",
      date: "null",
      car_id: 0,
      car_type: "null",
      direction: 0,
    },
  ]);

  const [totalCars, setTotalCars] = useState();

  const onChageDate = (e) => {
    setDate(e.target.value);
  };

  const onClickGetTrafficVolume = () => {
    axios.post("http://localhost:3001/api2");
  };

  const onClickGetData = () => {
    axios
      .get("http://localhost:3001/api2")
      .then((results) => {
        results.data.forEach((res) => {
          setCars([
            {
              device_id: res.device_id,
              date: res.date,
              car_id: res.car_id,
              car_type: res.car_type,
              direction: res.direction,
            },
          ]);
        });
        navigate("/trafficvolume");
      })
      .catch(() => {
        alert("失敗");
      });
  };
  return (
    <Flex align="center" justify="center" height="40vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          交通量調査システム
        </Heading>
        <Divider my={4} />
        <Stack spacing={6} py={4} px={10}>
          <Input type="date" value={date} onChange={onChageDate} />
          {/* <Input type="time" /> */}
          <PrimaryButton onClick={onClickGetData}>検索</PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  );
};
