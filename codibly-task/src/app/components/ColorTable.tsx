"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { Box, Button, Modal, Pagination, Typography } from "@mui/material";

import DetailModal from "./DetailModal";

export interface Product {
  name?: string;
  id: string;
  year?: number;
  color?: string;
  pantone_value?: string;
  description?: string;
}

interface IProductsApiResult {
  total_pages: number;
  data: Product[];
}
interface ColorTableTypes {
  colorId: string;
}

const ColorTable: React.FC<ColorTableTypes> = ({ colorId }) => {
  const [data, setData] = useState<IProductsApiResult | null>(null);
  const [page, setPage] = useState<number>(1);
  const [err, setErr] = useState(null);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handlePrevious = () => {
    setPage(page !== 1 ? page - 1 : page);
  };
  const handleNext = () => {
    setPage(page !== totalPages ? page + 1 : page);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        "https://reqres.in/api/products?" +
          new URLSearchParams({
            page: String(page),
            per_page: "5",
            id: colorId,
          })
      )
        .then((response) => {
          setData(null);
          if (!response.ok) {
            throw Error("Could not fetch the data...");
          }
          return response.json();
        })
        .then((data) => {
          setErr(null);
          setData(data);
        })
        .catch((err) => {
          setErr(err.message);
        });
    };

    fetchData();
  }, [page, colorId]);

  const totalPages: number = data?.total_pages ?? 0;

  console.log(data?.data);

  return (
    <>
      <TableContainer elevation={5} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Year</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {err && <div>{err}</div>}

            {data &&
              Array.isArray(data.data) &&
              data.data.map((item) => (
                <TableRow
                  key={item.id}
                  style={{ backgroundColor: item.color }}
                  onClick={() => setShowInfo(true)}
                >
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.year}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DetailModal open={showInfo} />

      {/* <PaginationButtons totalPages={totalPages} page={page} /> */}

      <Box display={"flex"} margin={3}>
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
export default ColorTable;
