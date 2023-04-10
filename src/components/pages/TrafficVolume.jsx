import { Box, Divider, Flex, Heading, Text, Stack } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { memo } from "react";

export const TrafficVolume = memo((props) => {
  const {} = props;
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Flex align="center" justify="center" height="70vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          {`交通量詳細(${location.state.date})`}
        </Heading>
        <Divider my={4} />
        <Stack spacing={6} py={4} px={10}>
          <Text fontWeight="bold">
            合計台数
            <Text color="red">{location.state.totalCars}</Text>
          </Text>
          <Text fontWeight="bold">
            車両別
            <Text>{`Car:${
              location.state.totalCarType.filter((i) => i === "Car").length
            }`}</Text>
            <Text>{`Bike:${
              location.state.totalCarType.filter((i) => i === "Bike").length
            }`}</Text>
          </Text>
          <Text fontWeight="bold">
            <Text>{`上り線:${
              location.state.totalCarDirection.filter((i) => i === 0).length
            }`}</Text>
            <Text>{`下り線:${
              location.state.totalCarDirection.filter((i) => i === 1).length
            }`}</Text>
          </Text>
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
