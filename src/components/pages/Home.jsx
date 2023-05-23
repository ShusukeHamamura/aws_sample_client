import { useState } from "react";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";

import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { useTraffic } from "../../hooks/useTraffic";
import { useMessage } from "../../hooks/useMessage";

export const Home = () => {
  const navigate = useNavigate();

  const { getTrafficVolume } = useTraffic();
  const { showMessage } = useMessage();

  const [location, setLocation] = useState("");

  const today = new Date();
  const [date, setDate] = useState(
    `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`
  ); //useStateの状態更新は非同期

  const onChangeDate = (e) => {
    setDate(e.target.value);
  };
  const onChangeLocation = (e) => {
    setLocation(e.target.value);
  };

  const onClickGetTrafficVolume = () => {
    if (date === "") {
      showMessage({ title: "日付を入力してください", status: "error" });
    } else if (location === "") {
      showMessage({ title: "地点を選択してください", status: "error" });
    } else {
      getTrafficVolume({ date, location }).then((res) => {
        if (res.length === 0) {
          showMessage({ title: "データがありません", status: "error" });
        } else {
          navigate("/trafficvolume", {
            state: {
              date: date,
              data: res,
            },
          });
        }
      });
    }
  };

  return (
    <>
      <text>@山口大学工学部 計画工学研究室</text>
      <Flex align="center" justify="center" height="50vh">
        <Box bg="white" w="xl" p={4} borderRadius="md" shadow="md">
          <Heading as="h1" size="lg" textAlign="center">
            交通量調査システム(デモ)
          </Heading>
          <Divider my={4} />
          <Stack spacing={6} py={4} px={10}>
            <Select placeholder="地点を選択" onChange={onChangeLocation}>
              <option value="UbeLoad">宇部道路</option>
            </Select>
            <Input type="date" value={date} onChange={onChangeDate} />
            <PrimaryButton
              bg="teal.400"
              color="white"
              onClick={onClickGetTrafficVolume}
            >
              検索
            </PrimaryButton>
          </Stack>
        </Box>
      </Flex>
    </>
  );
};
