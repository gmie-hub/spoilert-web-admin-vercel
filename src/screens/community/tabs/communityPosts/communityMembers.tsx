import {
  Button,
  HStack,
  Heading,
  Image,
  Input,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";

import { Card } from "@spt/components";
import { InputGroup } from "@spt/components/ui/input-group";
import type { CommunityUserDatum } from "@spt/types/community";

export const CommunityMembers = ({ data }: { data: CommunityUserDatum[] }) => {
  return (
    <Card hasBoxShadow>
      <Stack>
        <Heading>{`Members (${data?.length})`}</Heading>

        <InputGroup
          startElement={<Image src="/search-normal.svg" alt="search" />}
        >
          <Input placeholder="Username" />
        </InputGroup>

        <Stack  mt="3">
          {data?.map((item) => (
            <Stack key={item?.id}>
              <HStack justifyContent="space-between" alignItems="center">
                <HStack>
                  <Image src="/user-icon.svg" alt="user" boxSize={6} />
                  <Text fontSize="sm">{`${item?.user?.first_name} ${item?.user?.last_name}`}</Text>
                </HStack>

                <Button variant="yellowOutline" fontSize="sm">View Profile</Button>
              </HStack>

              <Separator />
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Card>
  );
};
