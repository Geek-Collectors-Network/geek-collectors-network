import { Button, FormControl, Input, Stack } from "@chakra-ui/react";
import React from "react";

function LoginForm() {
    return (
        <Stack spacing={8} w={{ base: "100%", md: "80%", lg: "50%" }}>
            <FormControl id="email">
                <Input type="email" placeholder="Email" />
            </FormControl>
            <FormControl id="password">
                <Input type="password" placeholder="Password" />
            </FormControl>
            <Button bg={"brand.500"} color={"white"} _hover={{ bg: "brand.600" }} variant="solid" p={6}>
                LOGIN
            </Button>
        </Stack>
    );
}

export default LoginForm;
