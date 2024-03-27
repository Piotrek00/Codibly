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
import { Box, Typography } from "@mui/material";
import DetailModal from "./DetailModal";
import { getColorId, getPage, getPerPage } from "../utils/helper";
import PaginationButtons from "./PaginationButtons";
import { useRouter } from "next/navigation";

const DEFAULT_PER_PAGE = "5";

export interface Product {
  name: string;
  id: string;
  year: number;
  color: string;
  pantone_value: string;
}

interface IProductsApiResult {
  total_pages: number;
  data: Product[];
}
interface ColorTableTypes {
  colorId: string | null;
}

const API_URL = "https://reqres.in/api/products?";

const ColorTable: React.FC<ColorTableTypes> = ({ colorId }) => {
  const router = useRouter();

  const [data, setData] = useState<IProductsApiResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessfullyFetched, setIsSuccessfullyFetched] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [err, setErr] = useState(null);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        ...getPage(String(page)),
        ...getPerPage(DEFAULT_PER_PAGE),
        ...getColorId(colorId),
      };

      setIsLoading(true);
      setIsSuccessfullyFetched(false);
      const result = await fetch(API_URL + new URLSearchParams(config))
        .then((response) => {
          if (response.status >= 500) {
            // server
            throw Error("Server error...");
          }

          if (response.status >= 400) {
            // client
            throw Error("Client error...");
          }

          return response.json();
        })
        .then((data) => {
          setErr(null);
          setData(data);
          setIsSuccessfullyFetched(true);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          setIsSuccessfullyFetched(false);
          setErr(err.message);
        });
    };

    fetchData();
  }, [colorId, page]);

  const totalPages: number = data?.total_pages ?? 0;

  const renderTableRow = (item: Product) => {
    return (
      <TableRow
        key={item.id}
        style={{ backgroundColor: item.color }}
        onClick={() => {
          setSelectedItem(item);
          setShowInfo(true);
        }}
      >
        <TableCell>{item.id}</TableCell>
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.year}</TableCell>
      </TableRow>
    );
  };

  return (
    <>
      <Box>
        {isLoading && <Box>Loading...</Box>}
        {err && (
          <Box p={5} sx={{ border: "2px solid red", borderRadius: "20px" }}>
            <Typography color={"red"}>{err}</Typography>
          </Box>
        )}
        {isSuccessfullyFetched && (
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
                {data &&
                  Array.isArray(data.data) &&
                  data.data.map((item) => renderTableRow(item))}

                {data && !Array.isArray(data.data) && renderTableRow(data.data)}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <DetailModal
          open={showInfo}
          onOpenChange={setShowInfo}
          selectedItem={selectedItem}
        />

        <PaginationButtons
          totalPages={totalPages}
          page={page}
          onChange={handleChange}
        />
      </Box>
    </>
  );
};
export default ColorTable;
