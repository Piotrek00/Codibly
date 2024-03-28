import { Box } from "@mui/material";
import Pagination from "@mui/material/Pagination";

interface PaginationButtonsProps {
  totalPages: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  totalPages,
  page,
  onChange,
}) => {
  return (
    <>
      <Box display="flex" margin={2}>
        <Pagination
          data-testid="pagination"
          count={totalPages}
          page={page}
          size="large"
          onChange={onChange}
        />
      </Box>
    </>
  );
};

export default PaginationButtons;
