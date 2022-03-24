Instructions to a Full Stack Application with React, @redux/toolkit, react-router-dom, chakra-ui, express, mongoose,

- <kbd>npx create-react-app full-stack --template redux</kbd>
- <kbd>cd full-stack</kbd>
- <kbd>npm i @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^6</kbd>
- <kbd>npm i react-router-dom react-icons</kbd>
- <kbd>npm i express cors mongoose jsonwebtoken bcryptjs passport passport-google-oauth2 uuid cookie-session</kbd>
- <kbd>mkdir server</kbd>, add server code to this folder
  - In file: `package.json` under `script` add `"serve": "nodemon server"`
- <kbd>touch .env</kbd>
  - add following listens

```env
// Backend
BACKEND_PORT=8000
MONGOOSE_DB_URL=mongodb://localhost:27017/pt2-authorise
JWT_SECRECT_KET=masai
// google
GOOGLE_CLIENT_ID=279622763477-jfp3itr59666qdma0adbkmbvbjfb6il4.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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

// Front end
PORT=3000
REACT_APP_GOOGLE_CLIENT_ID=279622763477-jfp3itr59666qdma0adbkmbvbjfb6il4.apps.googleusercontent.com
```

- under `src/features` create a new folder `authenticate` and a new file inside that folder `Authenticate.jsx`

```js
import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  FormControl,
  InputRightElement,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export const Authenticate = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Login user using email, passsword
  };

  const google = () => {
    /* TODO: Login Using Google */
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="email"
                    placeholder="email address"
                    onChange={(e) => setEmail(e.currentTarget.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.currentTarget.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                onClick={handleSubmit}
              >
                Login
              </Button>
              <Box
                borderRadius={0}
                type="submit"
                variant="solid"
                width="full"
                cursor="pointer"
                onClick={google}
              >
                Login with Google
              </Box>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};
```
