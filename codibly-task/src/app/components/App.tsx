"use client";
import { TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import ColorTable from "./ColorTable";

export function App() {
  const [id, setId] = useState("");
  const [debouncedId] = useDebounce(id, 500);

  const handleNumber = (event: { target: { value: string } }) => {
    const colorId = event.target.value.replace(/\D/g, "");
    setId(colorId);
  };

  return (
    <>
      <Typography variant="h4" color={"black"}>
        Codibly task
      </Typography>
      <TextField
        label="Color ID"
        variant="outlined"
        margin="normal"
        value={id}
        onChange={handleNumber}
      />
      <ColorTable colorId={debouncedId} />
      <Typography variant="overline" color={"gray"}>
        Piotr Kotarba
      </Typography>
    </>
  );
}
export default App;
