import { Chip, CircularProgress, Typography } from "@mui/material";
import useApi from "../../hooks/useApi";
import { Sex, getRestroomById } from "../../requests/restroom";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Drawer from "../general/Drawer/Drawer";
import { HStack, VStack } from "../general/Stack/Stack";
import Button from "../general/Button/Button";

export default function RestroomDrawer({
  id,
  onClose,
}: {
  id: bigint | null;
  onClose: () => void;
}) {
  const [data, error, loading, reFetch] = useApi(getRestroomById, id);

  useEffect(() => {
    if (!id) return;

    reFetch();
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set("restroom", id.toString());
  }, [id]);

  function sexChips() {
    switch (data?.sex) {
      case Sex.Both:
        return (
          <>
            <Chip label="Men" />
            <Chip label="Women" />
          </>
        );
      case Sex.Men:
        return <Chip label="Men" />;
      case Sex.Women:
        return <Chip label="Women" />;
      default:
        return <></>;
    }
  }
  console.log(data);
  return (
    <Drawer
      isOpen={id != null}
      onClose={() => {
        onClose();
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <VStack justify="space-between" alignItems="stretch" fullHeight>
          <VStack gap="8px">
            <Typography variant="h4">{data?.name}</Typography>
            <HStack gap="8px">{sexChips()}</HStack>
            <HStack justify="space-between">
              <Typography>Fee</Typography>
              <Typography>{data?.fee?.toFixed(2)}€</Typography>
            </HStack>
            <HStack justify="space-between">
              <Typography>Accessible</Typography>
            </HStack>
            <Typography variant="body1">{data?.notes}</Typography>
          </VStack>
          {data?.isCreatedByYou ? (
            <VStack gap="8px" alignItems="stretch">
              <Typography>This restroom was created by you.</Typography>
              <Link to="/edit">
                <Button fullWidth>Edit</Button>
              </Link>
            </VStack>
          ) : undefined}
        </VStack>
      )}
    </Drawer>
  );
}
