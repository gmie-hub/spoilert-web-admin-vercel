import type { FC } from "react";

import {
  Button,
  ButtonGroup,
  HStack,
  IconButton,
  Image,
  Pagination,
} from "@chakra-ui/react";

interface ComponentProps {
  pageSize: number;
  page: number;
  items: Array<any>;
  onPageChange: (details: any) => void;
}

const CustomPagination: FC<ComponentProps> = ({
  onPageChange,
  page: pageNumber,
  pageSize,
  items
}) => {
  const count = items.length;
  return (
    <Pagination.Root
      count={count}
      pageSize={pageSize}
      page={pageNumber}
      onPageChange={onPageChange}
      w="100%"
    >
      <ButtonGroup display="flex" justifyContent="space-between">
        <Pagination.PrevTrigger asChild>
          <Button variant="outline" px="2">
            <Image src="/back-icon.svg" /> Previous
          </Button>
        </Pagination.PrevTrigger>

        <HStack>
          <Pagination.Context>
            {({ pages }) =>
              pages.map((page, index) =>
                page.type === "page" ? (
                  <Pagination.Item key={index} {...page}>
                    <IconButton
                      variant={"ghost"}
                      rounded="full"
                      _active={{ bg: "var(--color-primary)" }}
                      _selected={Number(page.value) === pageNumber ? { bg: "var(--color-primary)" } : undefined}
                    >
                      {page.value}
                    </IconButton>
                  </Pagination.Item>
                ) : (
                  <Pagination.Ellipsis key={index} index={index}>
                    &#8230;
                  </Pagination.Ellipsis>
                )
              )
            }
          </Pagination.Context>
        </HStack>

        <Pagination.NextTrigger asChild>
          <Button variant="outline" px="2">
            Next <Image src="/forward-icon.svg" />
          </Button>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  );
};

export default CustomPagination;
