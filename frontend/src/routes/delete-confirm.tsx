import { CircularProgress, Typography } from "@mui/material";
import Card from "../components/general/Card/Card";
import { Center, HStack } from "../components/general/Stack/Stack";
import Button from "../components/general/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import useApi from "../hooks/useApi";
import { getRestroomById } from "../requests/restroom";
import useSnackBar from "../hooks/useSnackBar";

export default function DeleteConfirmPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { showSnackBar } = useSnackBar();
  const [data, error, loading, reFetch] = useApi(getRestroomById, id);

  if (loading) {
    return (
      <Center>
        <CircularProgress />
      </Center>
    );
  }

  function onSubmit() {
    fetch(`/api/restroom/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        showSnackBar({ label: "Restroom successfully edited." });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        showSnackBar({ label: "Something went wrong editing a restroom." });
      });
  }

  return (
    <Center h="100vh">
      <Card>
        <Typography variant="h5">Delete "{data?.name}"?</Typography>
        <Typography>This can't be undone.</Typography>
        <HStack gap="8px">
          <Button variant="secondary" onClick={() => navigate("/")}>
            Cancel
          </Button>
          <Button onClick={onSubmit}>Delete</Button>
        </HStack>
      </Card>
    </Center>
  );
}
