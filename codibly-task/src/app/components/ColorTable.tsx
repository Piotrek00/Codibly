import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

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

export default function BasicTable({ colorId }: ColorTableTypes) {
  const [data, setData] = useState<IProductsApiResult | null>(null);
  const [page, setPage] = useState<number>(1);
  const [err, setErr] = useState(null);
  const [openModal, setOpenModal] = useState(false);

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

  console.log(err);
  console.log(data?.data);
  console.log(totalPages);
  console.log(page);
  return (
    <>
      <TableContainer component={Paper}>
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
                <TableRow key={item.id} style={{ backgroundColor: item.color }}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.year}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        disabled={page == 1}
        onClick={() => {
          setPage(page !== 1 ? page - 1 : page);
        }}
      >
        Back
      </Button>

      <Button
        disabled={page == totalPages}
        onClick={() => {
          setPage(page !== totalPages ? page + 1 : page);
        }}
      >
        Next
      </Button>
    </>
  );
}
