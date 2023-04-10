import axios from "axios";
import { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";

import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { useTraffic } from "../../hooks/useTraffic";
import { useMessage } from "../../hooks/useMessage";

export const Home = () => {
  const navigate = useNavigate();

  const { getTrafficVolume, totalCars, totalCarType, totalCarDirection } =
    useTraffic();
  const { showMessage } = useMessage();

  const [date, setDate] = useState(""); //useStateの状態更新は非同期

  useEffect(() => {
    getTrafficVolume({ date });
  }, [date]);

  const onChageDate = (e) => {
    setDate(e.target.value);
  };

  const onClickGetTrafficVolume = () => {
    if (date === "") {
      showMessage({ title: "日付を入力してください", status: "error" });
    } else if (totalCars === "") {
      showMessage({ title: "データがありません", status: "error" });
    } else {
      navigate("/trafficvolume", {
        state: {
          date: date,
          totalCars: totalCars,
          totalCarType: totalCarType,
          totalCarDirection: totalCarDirection,
        },
      });
    }
  };

  return (
    <Flex align="center" justify="center" height="50vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          交通量調査システム
        </Heading>
        <Divider my={4} />
        <Stack spacing={6} py={4} px={10}>
          <Input type="date" value={date} onChange={onChageDate} />
          <PrimaryButton onClick={onClickGetTrafficVolume}>検索</PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  );
};
