import { useState } from "react";
import { Box, Button, Flex, HStack, Input, Text } from "@chakra-ui/react";
import { HiOutlineSearch, HiOutlineRefresh } from "react-icons/hi";
import { HiOutlineUser } from "react-icons/hi";

import { useGetBestPerformingCategoryQuery } from "@spt/hooks/api/useGetBestPerformingCategoryQuery";

import { DatePickerButton, FilterSelect } from "../../components/filterControls";

const TEAL = "#013B4D";

export default function SpoilPerCategory() {
  const [period, setPeriod] = useState("Today");
  const [status, setStatus] = useState("Status");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, errorMessage } =
    useGetBestPerformingCategoryQuery(currentPage);

  const rows = data?.data ?? [];
  const lastPage = data?.last_page ?? 1;
  const from = data?.from ?? 0;
  const pageNumbers = Array.from({ length: lastPage }, (_, i) => i + 1);

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="600" mb={6} color="#212529">
        Spoil Performance
      </Text>

      <Box bg="white" p={6} borderRadius="xl" border="1px solid #efefef" boxShadow="sm">
        <Text fontSize="md" fontWeight="600" color="#212529" mb={4}>
          Best Performing Spoil Per Category
        </Text>

        {/* Filter bar */}
        <Flex
          align="center"
          gap={2}
          wrap="wrap"
          border="1px solid #efefef"
          borderRadius="lg"
          p={3}
          mb={5}
        >
          <Flex
            align="center"
            flex="1"
            minW="180px"
            border="1px solid #e2e8f0"
            borderRadius="md"
            px={3}
            py={1.5}
            gap={2}
            bg="white"
          >
            <HiOutlineSearch size={15} color="#9ca3af" />
            <Input
              border="none"
              outline="none"
              p={0}
              h="auto"
              fontSize="sm"
              placeholder="Search for a category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              _focus={{ boxShadow: "none" }}
            />
          </Flex>

          <Text fontSize="sm" color="#495057" fontWeight="500">Filter by</Text>
          <FilterSelect options={["Today", "This Week", "This Month"]} value={period} onChange={setPeriod} />
          <FilterSelect options={["Status", "Active", "Inactive"]} value={status} onChange={setStatus} />
          <DatePickerButton label="From" />
          <DatePickerButton label="To" />

          <Flex
            align="center"
            gap={1.5}
            cursor="pointer"
            color={TEAL}
            fontSize="sm"
            fontWeight="500"
            onClick={() => { setSearch(""); setPeriod("Today"); setStatus("Status"); }}
          >
            <HiOutlineRefresh size={14} />
            <Text>Reset Filter</Text>
          </Flex>
        </Flex>

        {/* Table */}
        <Box overflowX="auto">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                {["S/N", "Category", "Best Spoil", "Name of Tutor", "No of Enrollment", "Action"].map((h) => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "13px", fontWeight: 600, color: "#495057", whiteSpace: "nowrap" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} style={{ padding: "40px 16px", textAlign: "center", fontSize: "14px", color: "#9ca3af" }}>
                    Loading…
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={6} style={{ padding: "40px 16px", textAlign: "center", fontSize: "14px", color: "#e53e3e" }}>
                    {errorMessage}
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: "40px 16px", textAlign: "center", fontSize: "14px", color: "#9ca3af" }}>
                    No data
                  </td>
                </tr>
              ) : (
                rows.map((row, index) => (
                  <tr key={row.spoilId} style={{ borderBottom: "1px solid #f9f9f9" }}>
                    <td style={{ padding: "14px 16px", fontSize: "14px", color: "#495057" }}>{from + index}</td>
                    <td style={{ padding: "14px 16px", fontSize: "14px", color: "#212529" }}>{row.categoryName ?? "—"}</td>
                    <td style={{ padding: "14px 16px", fontSize: "14px", color: "#212529" }}>{row.spoilName}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <HStack gap={2}>
                        <Box w="28px" h="28px" borderRadius="full" bg="#e2e8f0" display="flex" alignItems="center" justifyContent="center" flexShrink={0}>
                          <HiOutlineUser size={14} color="#718096" />
                        </Box>
                        <Text fontSize="14px" color="#212529">{row.tutorName || "—"}</Text>
                      </HStack>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: "14px", color: "#212529" }}>{row.totalEnrollments}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <Button
                        size="sm"
                        variant="outline"
                        borderColor="#e2e8f0"
                        color="#212529"
                        borderRadius="md"
                        fontSize="13px"
                        fontWeight="500"
                        px={4}
                        _hover={{ bg: TEAL, color: "white", borderColor: TEAL }}
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </Box>

        {/* Pagination */}
        <Flex justify="space-between" align="center" mt={6} wrap="wrap" gap={3}>
          <Button
            size="sm"
            variant="outline"
            borderColor="#e2e8f0"
            color="#495057"
            borderRadius="md"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            ← Previous
          </Button>

          <HStack gap={1}>
            {pageNumbers.map((page) => (
              <Button
                key={page}
                size="sm"
                borderRadius="full"
                w="32px"
                h="32px"
                p={0}
                minW="32px"
                bg={currentPage === page ? TEAL : "transparent"}
                color={currentPage === page ? "white" : "#495057"}
                border={currentPage === page ? "none" : "1px solid transparent"}
                fontWeight={currentPage === page ? "600" : "400"}
                _hover={{ bg: currentPage === page ? TEAL : "#f5f5f5" }}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
          </HStack>

          <Button
            size="sm"
            variant="outline"
            borderColor="#e2e8f0"
            color="#495057"
            borderRadius="md"
            onClick={() => setCurrentPage((p) => Math.min(lastPage, p + 1))}
          >
            Next →
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
