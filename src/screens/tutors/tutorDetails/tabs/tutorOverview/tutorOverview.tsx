import { Box, Flex, Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import ErrorState from "@spt/components/errorState";
import LoadingState from "@spt/components/loadingState";
import { useGetAllUserDetailsQuery } from "@spt/hooks/api/useGetUserDetailsQuery";

import UserDetails from "./userDetails";
import UserInfo from "./userInfo";


const TutorOverview = () => {

  

  const { id } = useParams();

  const { data, isLoading, isError, errorMessage } = useGetAllUserDetailsQuery(
    Number(id)
  );

    
  if (isLoading) return <LoadingState />;
  if (isError) <ErrorState error={errorMessage} />;
  
  return (
    <Stack mt="5">
      <Flex flexDir={{ base: "column", md: "row" }} gap="10">
        <Box flex="2">
          <UserInfo data={data} />
        </Box>

        <Box flex="1">
          <UserDetails data={data} />
        </Box>
      </Flex>
    </Stack>
  );
};

export default TutorOverview;
