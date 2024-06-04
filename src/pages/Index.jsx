import { useState, useRef } from "react";
import { Container, Text, VStack, Button, HStack, Box } from "@chakra-ui/react";

const Index = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [splits, setSplits] = useState([]);
  const timerRef = useRef(null);

  const startStop = () => {
    if (running) {
      clearInterval(timerRef.current);
    } else {
      const startTime = Date.now() - time;
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    }
    setRunning(!running);
  };

  const splitReset = () => {
    if (running) {
      setSplits([...splits, time]);
    } else {
      setTime(0);
      setSplits([]);
    }
  };

  const onOff = () => {
    if (running) {
      clearInterval(timerRef.current);
      setRunning(false);
    }
    setTime(0);
    setSplits([]);
  };

  const formatTime = (time) => {
    const milliseconds = `0${(time % 1000) / 10}`.slice(-2);
    const seconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
    const minutes = `0${Math.floor((time / 60000) % 60)}`.slice(-2);
    const hours = `0${Math.floor(time / 3600000)}`.slice(-2);
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" bg="black" color="yellow">
      <VStack spacing={4}>
        <Box border="2px" borderColor="yellow" borderRadius="md" p={4} textAlign="center">
          <Text fontSize="4xl" fontFamily="monospace">{formatTime(time)}</Text>
        </Box>
        <HStack spacing={4}>
          <Button colorScheme="yellow" onClick={startStop}>{running ? "Stop" : "Start"}</Button>
          <Button colorScheme="yellow" onClick={splitReset}>{running ? "Split" : "Reset"}</Button>
          <Button colorScheme="yellow" onClick={onOff}>On/Off</Button>
        </HStack>
        <VStack spacing={2} align="stretch">
          {splits.map((split, index) => (
            <Text key={index} fontSize="lg" fontFamily="monospace">{`Split ${index + 1}: ${formatTime(split)}`}</Text>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;