import { Box, Divider, Flex, Heading, Text, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { PrimaryButton } from "../atoms/button/PrimaryButton";

export const TrafficVolume = () => {
  const navigate = useNavigate();
  return (
    <Flex align="center" justify="center" height="40vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          2023/4/7日の結果
        </Heading>
        <Divider my={4} />
        <Stack spacing={6} py={4} px={10}>
          <Text fontWeight="bold">
            合計台数
            <Text color="red">140</Text>
          </Text>
          <Text fontWeight="bold">
            車両別
            <Text>Car:1</Text>
            <Text>Bike:1</Text>
          </Text>
          <Text fontWeight="bold">
            <Text>上り線:1</Text>
            <Text>下り線:1</Text>
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
};
