import { TextField } from "@mui/material";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import ColorTable from "./ColorTable";

export function Search() {
  const [id, setId] = useState("");
  const [debouncedId] = useDebounce(id, 350);

  const handleNumber = (event: { target: { value: string } }) => {
    const colorId = event.target.value.replace(/\D/g, "");
    setId(colorId);
  };

  console.log(debouncedId);

  return (
    <>
      <TextField
        label="Color ID"
        variant="outlined"
        margin="normal"
        value={id}
        onChange={handleNumber}
      />
      <ColorTable colorId={debouncedId} />
    </>
  );
}
export default Search;
