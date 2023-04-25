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
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import * as dfd from "danfojs";

import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { memo } from "react";

export const TrafficVolume = memo(() => {
  const location = useLocation();
  const navigate = useNavigate();

  //danfojs(pandasの様なライブラリ)
  const df = new dfd.DataFrame(location.state.data);
  df.print();
  let start_hour = df["date_hour"].values[0];
  let finish_hour = df["date_hour"].values[df["date_hour"].values.length - 1];
  let hourList = [];
  for (let i = start_hour; i <= finish_hour; i++) {
    hourList.push(i);
  }
  const CarTypeList = [
    "Car",
    "K-Truck",
    "M-Truck",
    "M-Bus",
    "B-Truck",
    "B-Bus",
    "MotorBike",
  ];

  return (
    <Flex align="center" justify="center" height="70vh">
      <Box
        bg="white"
        w={{ base: "sm", sm: "lg", md: "2xl", lg: "4xl" }}
        borderRadius="md"
        shadow="md"
      >
        <Heading as="h1" size="lg" textAlign="center">
          {`交通量詳細(${location.state.date})`}
        </Heading>
        <Divider my={4} />
        <Stack spacing={6} py={4} px={10}>
          <TableContainer>
            <Table variant="simple" bg="gray.50">
              <TableCaption>{`合計(${location.state.data.length})`}</TableCaption>
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th>乗用車</Th>
                  <Th>軽トラック</Th>
                  <Th>トラック</Th>
                  <Th>マイクロバス</Th>
                  <Th>大型トラック</Th>
                  <Th>大型バス</Th>
                  <Th>バイク</Th>
                </Tr>
              </Thead>
              <Tbody>
                {console.log(hourList)}
                {hourList.map((hour, index) => {
                  return (
                    <Tr key={index}>
                      <Td>{`${hour}:00~${hour + 1}:00`}</Td>
                      <Td isNumeric>{`${
                        df.query(
                          df["date_hour"]
                            .eq(hour)
                            .and(df["car_type"].eq("Car"))
                            .and(df["direction"].eq(1))
                        ).values.length
                      }/${
                        df.query(
                          df["date_hour"]
                            .eq(hour)
                            .and(df["car_type"].eq("Car"))
                            .and(df["direction"].eq(2))
                        ).values.length
                      }`}</Td>
                      <Td isNumeric>{`${
                        df.query(
                          df["date_hour"]
                            .eq(hour)
                            .and(df["car_type"].eq("K-Truck"))
                            .and(df["direction"].eq(1))
                        ).values.length
                      }/${
                        df.query(
                          df["date_hour"]
                            .eq(hour)
                            .and(df["car_type"].eq("K-Truck"))
                            .and(df["direction"].eq(2))
                        ).values.length
                      }`}</Td>
                      <Td isNumeric>{`${
                        df.query(
                          df["date_hour"]
                            .eq(hour)
                            .and(df["car_type"].eq("M-Truck"))
                            .and(df["direction"].eq(1))
                        ).values.length
                      }/${
                        df.query(
                          df["date_hour"]
                            .eq(hour)
                            .and(df["car_type"].eq("M-Truck"))
                            .and(df["direction"].eq(2))
                        ).values.length
                      }`}</Td>
                      <Td isNumeric>{`${
                        df.query(
                          df["date_hour"]
                            .eq(hour)
                            .and(df["car_type"].eq("M-Bus"))
                            .and(df["direction"].eq(1))
                        ).values.length
                      }/${
                        df.query(
                          df["date_hour"]
                            .eq(hour)
                            .and(df["car_type"].eq("M-Bus"))
                            .and(df["direction"].eq(2))
                        ).values.length
                      }`}</Td>
                      <Td isNumeric>{`${
                        df.query(
                          df["date_hour"]
                            .eq(hour)
                            .and(df["car_type"].eq("B-Truck"))
                            .and(df["direction"].eq(1))
                        ).values.length
                      }/${
                        df.query(
                          df["date_hour"]
                            .eq(hour)
                            .and(df["car_type"].eq("B-Truck"))
                            .and(df["direction"].eq(2))
                        ).values.length
                      }`}</Td>
                      <Td isNumeric>{`${
                        df.query(
                          df["date_hour"]
                            .eq(hour)
                            .and(df["car_type"].eq("B-Bus"))
                            .and(df["direction"].eq(1))
                        ).values.length
                      }/${
                        df.query(
                          df["date_hour"]
                            .eq(hour)
                            .and(df["car_type"].eq("B-Bus"))
                            .and(df["direction"].eq(2))
                        ).values.length
                      }`}</Td>
                      <Td isNumeric>{`${
                        df.query(
                          df["date_hour"]
                            .eq(hour)
                            .and(df["car_type"].eq("MotorBike"))
                            .and(df["direction"].eq(1))
                        ).values.length
                      }/${
                        df.query(
                          df["date_hour"]
                            .eq(hour)
                            .and(df["car_type"].eq("MotorBike"))
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
                          df["car_type"].eq(cartype).and(df["direction"].eq(1))
                        ).values.length
                      }/${
                        df.query(
                          df["car_type"].eq(cartype).and(df["direction"].eq(2))
                        ).values.length
                      }`}</Th>
                    );
                  })}
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
          <PrimaryButton
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
