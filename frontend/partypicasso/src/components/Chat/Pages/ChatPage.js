import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import styled from "styled-components";
import ChatBox from "../components/Chatbox";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/MyChats";
import { ChatState } from "../Context/ChatProvider";

const MainBox = styled.div`
  width: 100%;
  height: 100vh;
`;

const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <MainBox margin="20%">
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="93%"
        p="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </MainBox>
  );
};

export default ChatPage;
