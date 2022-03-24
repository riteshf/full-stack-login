import React from "react";
import { useDispatch } from "react-redux";
import { Box, Button, Flex } from "@chakra-ui/react";

import { logoutAsync } from "../features/authenticate/authenticate.slice";

export function Home() {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutAsync());
  };

  return (
    <Box>
      <Flex alignItems="center" justifyContent="center" mt="50px">
        <Button onClick={logout}>Logout</Button>
      </Flex>
    </Box>
  );
}
