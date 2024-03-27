import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Dispatch, SetStateAction } from "react";
import { Product } from "./ColorTable";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

interface DetailModalProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  selectedItem: Product | null;
}

const DetailModal: React.FC<DetailModalProps> = ({
  open,
  onOpenChange,
  selectedItem,
}) => {
  return (
    <>
      <Modal open={open} onClose={() => onOpenChange(false)}>
        <Box
          bgcolor={selectedItem?.color}
          m={"auto"}
          my={4}
          p={5}
          width={"70%"}
          display="blockx"
          alignItems="center"
          sx={{ border: "2px solid grey", borderRadius: "10px" }}
          data-testid="detail-box"
        >
          <Typography
            align="center"
            marginBottom={3}
            color={"black"}
            variant="h5"
          >
            Color data
          </Typography>
          {selectedItem && (
            <>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">ID&nbsp;</TableCell>
                    <TableCell align="center">Color&nbsp;</TableCell>
                    <TableCell align="center">Name&nbsp;</TableCell>
                    <TableCell align="center">Pantone value&nbsp;</TableCell>
                    <TableCell align="center">Year&nbsp;</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedItem && (
                    <TableRow
                      data-testid="detail-table-row"
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{selectedItem.id}</TableCell>
                      <TableCell align="center">{selectedItem.color}</TableCell>
                      <TableCell align="center">{selectedItem.name}</TableCell>
                      <TableCell align="center">
                        {selectedItem.pantone_value}
                      </TableCell>
                      <TableCell align="center">{selectedItem.year}</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default DetailModal;
