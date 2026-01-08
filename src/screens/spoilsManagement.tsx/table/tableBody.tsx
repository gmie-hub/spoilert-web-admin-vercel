// import type { FC } from "react";

// import { Button, HStack, Image, Table, Text } from "@chakra-ui/react";
// import { generatePath, useNavigate } from "react-router-dom";

// import { routes } from "@spt/routes";
// import type { SpoilsDatum } from "@spt/types/spoils";
// import { formatDate } from "@spt/utils/dateTime";

// interface TableProps {
//   data: SpoilsDatum[];
//   currentPage?: number;
//   pageSize?: number;
// }

// const TableBody: FC<TableProps> = ({ data, currentPage, pageSize }) => {
//   const navigate = useNavigate();

//   const handleRowClick = (id: number) => {
//     const path = generatePath(routes.main.spoilMgt.spoilDetails, { id });
//     navigate(path);
//   };

//   return (
//     <>
//       {data?.map((item, index:number) => (
//         <Table.Row py="16">
//           <Table.Cell>{(currentPage - 1) * pageSize + index + 1}</Table.Cell>

//           <Table.Cell>
//             <HStack>
//               <Image
//                 src={item?.cover_image_url}
//                 boxSize="10"
//                 borderRadius="md"
//               />
//               <Text color="gray">{item?.title}</Text>
//             </HStack>
//           </Table.Cell>

//           <Table.Cell>
//             <HStack>
//               <Image src="/user-icon.svg" />
//               <Text color="gray">{`${item?.tutor?.first_name} ${item?.tutor?.last_name}`}</Text>
//             </HStack>
//           </Table.Cell>

//           <Table.Cell>{item?.category?.name}</Table.Cell>
//           <Table.Cell>{item?.amount}</Table.Cell>
//           <Table.Cell>{item?.enrolled_users}</Table.Cell>
//           <Table.Cell>{"0"}</Table.Cell>
//           <Table.Cell>{`${formatDate(item?.created_at)}`}</Table.Cell>

//           <Table.Cell>
//             <Button
//               variant="yellowOutline"
//               px="3"
//               my="3"
//               onClick={() => handleRowClick(item?.id)}
//             >
//               View More
//             </Button>
//           </Table.Cell>
//         </Table.Row>
//       ))}
//     </>
//   );
// };

// export default TableBody;


import type { FC } from "react";

import {
  Button,
  HStack,
  Image,
  Table,
  Text,
} from "@chakra-ui/react";
import { generatePath, useNavigate } from "react-router-dom";

import { routes } from "@spt/routes";
import type { SpoilsDatum } from "@spt/types/spoils";
import { formatDate, truncateText } from "@spt/utils/dateTime";

interface TableProps {
  data: SpoilsDatum[];
  currentPage?: number;
  pageSize?: number;
}



const TableBody: FC<TableProps> = ({ data, currentPage = 1, pageSize = 10 }) => {
  const navigate = useNavigate();

  const handleRowClick = (id: number) => {
    const path = generatePath(routes.main.spoilMgt.spoilDetails, { id });
    navigate(path);
  };

  return (
    <>
      {data?.map((item, index: number) => (
        <Table.Row key={item.id} py="16">
          <Table.Cell>
            {(currentPage - 1) * pageSize + index + 1}
          </Table.Cell>

          <Table.Cell>
            <HStack gap="3">
              <Image
                src={item?.cover_image_url}
                boxSize="10"
                borderRadius="md"
                flexShrink={0}
              />
              <Text color="gray.600">
                {truncateText(item?.title)}
              </Text>
            </HStack>
          </Table.Cell>

          <Table.Cell>
            <HStack gap="3">
              <Image src="/user-icon.svg" flexShrink={0} />
              <Text color="gray.600">
                {truncateText(
                  `${item?.tutor?.first_name} ${item?.tutor?.last_name}`,
                  
                )}
              </Text>
            </HStack>
          </Table.Cell>

          <Table.Cell>
            {truncateText(item?.category?.name, )}
          </Table.Cell>

          <Table.Cell>{item?.amount}</Table.Cell>
          <Table.Cell>{item?.enrolled_users}</Table.Cell>
          <Table.Cell>0</Table.Cell>

          <Table.Cell>{formatDate(item?.created_at)}</Table.Cell>

          <Table.Cell>
            <Button
              variant="yellowOutline"
              px="3"
              my="3"
              onClick={() => handleRowClick(item.id)}
            >
              View More
            </Button>
          </Table.Cell>
        </Table.Row>
      ))}
    </>
  );
};

export default TableBody;
