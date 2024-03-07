import { CircularProgress, Drawer } from "@mui/material";
import useApi from "../../hooks/useApi";
import { getRestroomById } from "../../requests/restroom";
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

  return (
    <Drawer anchor={"left"} open={id != null} onClose={() => {
      // Clear the id from the url bar
      setSearchParams(new URLSearchParams());
      onClose();
    }}>
      {
        loading ? <CircularProgress/> : (
          <span>Name: {data?.name}</span>
        )
      }
    </Drawer>
  );
}
