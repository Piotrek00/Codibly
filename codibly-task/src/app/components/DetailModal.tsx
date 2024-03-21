import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";

interface DetailModalProps {
  open: boolean;
}

const DetailModal: React.FC<DetailModalProps> = ({ open }) => {
  const [showFullInfo, setShowFullInfo] = useState<boolean>(false);
  useEffect(() => {
    setShowFullInfo(open);
  }, [open]);

  const handleClose = () => setShowFullInfo(false);
  return (
    <>
      <Modal open={showFullInfo} onClose={handleClose}>
        <Box
          height={200}
          width={200}
          my={4}
          display="flex"
          alignItems="center"
          gap={4}
          p={2}
          sx={{ border: "2px solid grey" }}
        >
          <TableRow onClick={() => setShowFullInfo(true)}>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>year</TableCell>
          </TableRow>
        </Box>
      </Modal>
    </>
  );
};

export default DetailModal;
