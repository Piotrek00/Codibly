"use client";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import ColorTable from "./ColorTable";
import { useRouter, useSearchParams } from "next/navigation";

export function App() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const search = searchParams.get("id");

  const [id, setId] = useState(search);
  const [debouncedId] = useDebounce(id, 500);

  const handleNumber = (event: { target: { value: string } }) => {
    const colorId = event.target.value.replace(/\D/g, "");
    setId(colorId);
  };

  return (
    <>
      <TextField
        label="Color ID"
        variant="outlined"
        margin="normal"
        value={id ?? ""}
        onChange={handleNumber}
      />
      <ColorTable colorId={debouncedId} />
    </>
  );
}
export default App;
