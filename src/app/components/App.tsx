"use client";
import { TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import ColorTable from "./ColorTable";
import { useRouter, useSearchParams } from "next/navigation";

const App = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("id");

  const router = useRouter();
  const [id, setId] = useState(query ?? "");
  const [debouncedId] = useDebounce(id, 1500);

  const isMountingRef = useRef(false);

  const handleNumber = (event: { target: { value: string } }) => {
    const colorId = event.target.value.replace(/\D/g, "");
    setId(colorId);
  };

  useEffect(() => {
    isMountingRef.current = true;
  }, []);

  useEffect(() => {
    if (!isMountingRef.current) {
      const params = new URLSearchParams({
        id: debouncedId,
        // page: "",
      });

      router.push(`?${params.toString()}`);

      return;
    } else {
      isMountingRef.current = false;
    }
  }, [debouncedId, router]);

  return (
    <>
      <Typography variant="h4" color={"black"}>
        Codibly task
      </Typography>
      <TextField
        label="Color ID"
        variant="outlined"
        margin="normal"
        defaultValue={debouncedId}
        // value={id}
        onChange={handleNumber}
      />
      <ColorTable colorId={debouncedId} />
      <Typography variant="overline" color={"gray"}>
        Piotr Kotarba
      </Typography>
    </>
  );
};

export default App;
