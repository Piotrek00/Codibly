import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";

interface PaginationButtonsProps {
  totalPages: number;
  page: number;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  totalPages,
}) => {
  const [page, setPage] = useState<number>(1);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handlePrevious = () => {
    setPage(page !== 1 ? page - 1 : page);
  };
  const handleNext = () => {
    setPage(page !== totalPages ? page + 1 : page);
  };

  return (
    <>
      <Box display="flex" margin={2}>
        <Button disabled={page == 1} onClick={handlePrevious}>
          Back
        </Button>

        <Pagination
          hidePrevButton
          hideNextButton
          count={totalPages}
          page={page}
          size="large"
          onChange={handleChange}
        />

        <Button disabled={page == totalPages} onClick={handleNext}>
          Next
        </Button>
      </Box>
    </>
  );
};

export default PaginationButtons;
