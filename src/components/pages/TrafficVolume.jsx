import {
  Box,
  Divider,
  Flex,
  Heading,
  Stack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Wrap,
  WrapItem,
  Center,
  Text,
} from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import * as dfd from "danfojs";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ComposedChart,
  Bar,
  BarChart,
} from "recharts";

import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { memo, useState } from "react";
import axios from "axios";

export const TrafficVolume = memo(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");

  //danfojs(pandasの様なライブラリ)
  const df = new dfd.DataFrame(location.state.data);
  let start_hour = df["hour"].values[0];
  let finish_hour = df["hour"].values[df["hour"].values.length - 2];
  let hourList = [];
  for (let i = start_hour; i <= finish_hour; i++) {
    hourList.push(i);
  }
  const CarTypeList = ["S_Car", "L_Car", "Bus", "MortorBike"];
  let graphData = [];

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onClickDownload1 = async () => {
    const res = await axios.post("http://localhost:3001/api2", {
      date: location.state.date,
      responseType: "blob",
    });
    setUrl1(res.data);
  };
  const onClickDownload2 = async () => {
    const res = await axios.post("http://localhost:3001/api3", {
      date: location.state.date,
      responseType: "blob",
    });
    setUrl2(res.data);
  };

  return (
    <Flex align="center" justify="center" py={4}>
      <Box
        bg="white"
        w={{ base: "sm", sm: "lg", md: "2xl", lg: "4xl" }}
        borderRadius="md"
        shadow="md"
      >
        <Heading as="h1" size="lg" textAlign="center" py={3}>
          {`交通量詳細(${location.state.date})`}
        </Heading>
        <Divider my={4} />
        <Stack spacing={6} py={4} px={10}>
          <Button bg={"teal.400"} onClick={onOpen}>
            グラフを表示する
          </Button>
          <TableContainer>
            <Table variant="simple" bg="gray.50">
              <TableCaption>{`合計(${location.state.data.length})`}</TableCaption>
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th>小型車</Th>
                  <Th>普通貨物車</Th>
                  <Th>バス</Th>
                  <Th>自動二輪車</Th>
                </Tr>
              </Thead>
              <Tbody>
                {hourList.map((hour, index) => {
                  graphData.push({
                    time: `${hour}`,
                    S_Car_1: df.query(
                      df["hour"]
                        .eq(hour)
                        .and(df["car_model"].eq("S_Car"))
                        .and(df["direction"].eq(2))
                    ).values.length,
                    S_Car_2: df.query(
                      df["hour"]
                        .eq(hour)
                        .and(df["car_model"].eq("S_Car"))
                        .and(df["direction"].eq(2))
                    ).values.length,
                    L_Car_1: df.query(
                      df["hour"]
                        .eq(hour)
                        .and(df["car_model"].eq("L_Car"))
                        .and(df["direction"].eq(1))
                    ).values.length,
                    L_Car_2: df.query(
                      df["hour"]
                        .eq(hour)
                        .and(df["car_model"].eq("L_Car"))
                        .and(df["direction"].eq(2))
                    ).values.length,
                    Bus_1: df.query(
                      df["hour"]
                        .eq(hour)
                        .and(df["car_model"].eq("Bus"))
                        .and(df["direction"].eq(1))
                    ).values.length,
                    Bus_2: df.query(
                      df["hour"]
                        .eq(hour)
                        .and(df["car_model"].eq("Bus"))
                        .and(df["direction"].eq(2))
                    ).values.length,
                    MortorBike_1: df.query(
                      df["hour"]
                        .eq(hour)
                        .and(df["car_model"].eq("MortorBike"))
                        .and(df["direction"].eq(1))
                    ).values.length,
                    MortorBike_2: df.query(
                      df["hour"]
                        .eq(hour)
                        .and(df["car_model"].eq("MortorBike"))
                        .and(df["direction"].eq(2))
                    ).values.length,
                    dir_1: df.query(
                      df["hour"].eq(hour).and(df["direction"].eq(1))
                    ).values.length,
                    dir_2: df.query(
                      df["hour"].eq(hour).and(df["direction"].eq(2))
                    ).values.length,
                  });
                  return (
                    <Tr key={index}>
                      <Td>{`${hour}:00~${hour + 1}:00`}</Td>
                      <Td isNumeric>{`${
                        df.query(
                          df["hour"]
                            .eq(hour)
                            .and(df["car_model"].eq("S_Car"))
                            .and(df["direction"].eq(1))
                        ).values.length
                      }/${
                        df.query(
                          df["hour"]
                            .eq(hour)
                            .and(df["car_model"].eq("S_Car"))
                            .and(df["direction"].eq(2))
                        ).values.length
                      }`}</Td>
                      <Td isNumeric>{`${
                        df.query(
                          df["hour"]
                            .eq(hour)
                            .and(df["car_model"].eq("L_Car"))
                            .and(df["direction"].eq(1))
                        ).values.length
                      }/${
                        df.query(
                          df["hour"]
                            .eq(hour)
                            .and(df["car_model"].eq("L_Car"))
                            .and(df["direction"].eq(2))
                        ).values.length
                      }`}</Td>
                      <Td isNumeric>{`${
                        df.query(
                          df["hour"]
                            .eq(hour)
                            .and(df["car_model"].eq("Bus"))
                            .and(df["direction"].eq(1))
                        ).values.length
                      }/${
                        df.query(
                          df["hour"]
                            .eq(hour)
                            .and(df["car_model"].eq("Bus"))
                            .and(df["direction"].eq(2))
                        ).values.length
                      }`}</Td>
                      <Td isNumeric>{`${
                        df.query(
                          df["hour"]
                            .eq(hour)
                            .and(df["car_model"].eq("MortorBike"))
                            .and(df["direction"].eq(1))
                        ).values.length
                      }/${
                        df.query(
                          df["hour"]
                            .eq(hour)
                            .and(df["car_model"].eq("MortorBike"))
                            .and(df["direction"].eq(2))
                        ).values.length
                      }`}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th fontSize="lg">小計</Th>
                  {CarTypeList.map((cartype, index) => {
                    return (
                      <Th fontSize="lg" key={index} isNumeric>{`${
                        df.query(
                          df["car_model"].eq(cartype).and(df["direction"].eq(1))
                        ).values.length
                      }/${
                        df.query(
                          df["car_model"].eq(cartype).and(df["direction"].eq(2))
                        ).values.length
                      }`}</Th>
                    );
                  })}
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            autoFocus={false}
            motionPreset="slideInBottom"
          >
            <ModalOverlay />
            <ModalContent pb={6} maxH="auto" maxW="auto">
              <ModalHeader>Graph</ModalHeader>
              <ModalCloseButton />
              <ModalBody mx={4}>
                <Center>
                  <Wrap p={{ base: 4, md: 10 }}>
                    <WrapItem mx="auto">
                      <Text fontSize="lg">合計</Text>
                      <BarChart width={550} height={500} data={graphData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="time"
                          domain={["dataMin", "dataMax"]}
                          label={{
                            value: "日時",
                            offset: -5,
                            position: "insideBottomRight",
                          }}
                          stroke="white"
                        />
                        <YAxis
                          label={{
                            value: "台数",
                            angle: -90,
                            position: "insideLeft",
                          }}
                          stroke="white"
                        />
                        <Tooltip />
                        <Legend />
                        <Bar name="方向1" dataKey="dir_1" fill="#8884d8" />
                        <Bar name="方向2" dataKey="dir_2" fill="#82ca9d" />
                      </BarChart>
                    </WrapItem>
                    <WrapItem mx="auto">
                      <Text fontSize="lg">方向1</Text>
                      <BarChart width={550} height={500} data={graphData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="time"
                          domain={["dataMin", "dataMax"]}
                          label={{
                            value: "日時",
                            offset: -5,
                            position: "insideBottomRight",
                          }}
                          stroke="white"
                        />
                        <YAxis
                          label={{
                            value: "台数",
                            angle: -90,
                            position: "insideLeft",
                          }}
                          type="number"
                          domain={[0, "auto"]}
                          stroke="white"
                        />
                        <Tooltip />
                        <Legend />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Bar
                          name="小型車"
                          dataKey="S_Car_1"
                          fill="red"
                          stackId="a"
                        />
                        <Bar
                          name="普通貨物車"
                          dataKey="L_Car_1"
                          fill="blue"
                          stackId="a"
                        />
                        <Bar
                          name="バス"
                          dataKey="Bus_1"
                          fill="green"
                          stackId="a"
                        />
                        <Bar
                          name="自動二輪車"
                          dataKey="MortorBike_1"
                          fill="orange"
                          stackId="a"
                        />
                      </BarChart>
                    </WrapItem>

                    <WrapItem mx="auto">
                      <Text fontSize="lg">方向2</Text>
                      <BarChart width={550} height={500} data={graphData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="time"
                          domain={["dataMin", "dataMax"]}
                          label={{
                            value: "日時",
                            offset: -5,
                            position: "insideBottomRight",
                          }}
                          stroke="white"
                        />
                        <YAxis
                          label={{
                            value: "台数",
                            angle: -90,
                            position: "insideLeft",
                          }}
                          type="number"
                          domain={[0, "auto"]}
                          stroke="white"
                        />
                        <Tooltip />
                        <Legend />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Bar
                          name="小型車"
                          dataKey="S_Car_2"
                          fill="red"
                          stackId="a"
                        />
                        <Bar
                          name="普通貨物車"
                          dataKey="L_Car_2"
                          fill="blue"
                          stackId="a"
                        />
                        <Bar
                          name="バス"
                          dataKey="Bus_2"
                          fill="green"
                          stackId="a"
                        />
                        <Bar
                          name="自動二輪車"
                          dataKey="MortorBike_2"
                          fill="orange"
                          stackId="a"
                        />
                      </BarChart>
                    </WrapItem>
                  </Wrap>
                </Center>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </ModalContent>
          </Modal>
          <PrimaryButton
            bg="blue.400"
            color="white"
            icon={<DownloadIcon />}
            onClick={onClickDownload1}
          >
            CSVファイルのダウンロードURLの発行
          </PrimaryButton>
          {url1 && <A href={url1}>こちらからCSVファイルをダウンロード</A>}
          <PrimaryButton
            bg="blue.400"
            color="white"
            icon={<DownloadIcon />}
            onClick={onClickDownload2}
          >
            CSVファイルのダウンロードURLの発行(1時間おきのデータ)
          </PrimaryButton>
          {url2 && <A href={url2}>こちらからCSVファイルをダウンロード</A>}
          <PrimaryButton
            bg="teal.400"
            color="white"
            onClick={() => {
              navigate("/");
            }}
          >
            ホームに戻る
          </PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  );
});

const A = styled.a`
  color: #639bb7;
  text-decoration: underline;
  &:hover {
    color: orange;
  }
`;
