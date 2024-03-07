import { Chip, CircularProgress, Drawer, Grid, Stack, Typography } from "@mui/material";
import useApi from "../../hooks/useApi";
import { Sex, getRestroomById } from "../../requests/restroom";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function RestroomDrawer({
  id,
  onClose,
}: {
  id: bigint | null;
  onClose: () => void;
}) {
  const [data, error, loading, reFetch] = useApi(getRestroomById, id);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!id) return;

    reFetch();
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set("restroom", id.toString());
    setSearchParams(urlSearchParams);
  }, [id]);


  function sexChips() {
    switch (data?.sex) {
      case Sex.Both:
        return (
          <>
            <Chip label="Men"/>
            <Chip label="Women"/>
          </>
        )
      case Sex.Men:
          return <Chip label="Men"/>
      case Sex.Women:
          return <Chip label="Women"/>
      default:
        return <></>
    }
  }
  console.log(data)
  return (
    <Drawer anchor={"left"} open={id != null} onClose={() => {
      // Clear the id from the url bar
      setSearchParams(new URLSearchParams());
      onClose();
    }}>
      {
        loading ? <CircularProgress/> : (
          <Stack padding="16px" gap="8px" maxWidth="400px">
            <Typography variant="h4">{data?.name}</Typography>
            <Stack direction="row" gap="8px">
              {sexChips()}
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography>Fee</Typography>
              <Typography>{data?.fee?.toFixed(2)}€</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography>Accessible</Typography>
            </Stack>
            <Typography variant="body1">{data?.notes}</Typography>
          </Stack>
        )
      }
    </Drawer>
  );
}
