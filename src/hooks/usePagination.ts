import { useState } from "react";

export const usePagination = () => {
  const [page, setPage] = useState(1);

  const pageSize = 10;

  const startRange = (page - 1) * pageSize;
  const endRange = startRange + pageSize;

  const handlePageChange = (e) => setPage(e.page);

  return { page, pageSize, startRange, endRange, handlePageChange };
};
