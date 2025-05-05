import { Box } from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor";

function App() {
  return (
    <Box minH="100vh" bg="#030303" color="gray.200" px={2} py={4}>
      <CodeEditor />
    </Box>
  );
}

export default App;
