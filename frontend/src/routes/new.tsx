import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "../styles/routes/new.module.scss";
import { z } from "zod";
import { useRef, useState } from "react";
import MapView from "../components/MapView/MapView";
import {
  Alert,
  Box,
  Checkbox,
  Fab,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Typography,
} from "@mui/material";
import { Add, LocationSearching } from "@mui/icons-material";
import { Sex } from "../requests/restroom";
import { locateUser } from "../components/util/gpsUtils";
import { HStack, VStack } from "../components/general/Stack/Stack";
import TextField from "../components/general/TextField/TextField";
import Button from "../components/general/Button/Button";
import useSnackBar from "../hooks/useSnackBar";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long.").max(32),
  sex: z.nativeEnum(Sex),
  fee: z.coerce.number().nullable(),
  code: z
    .string()
    .min(2, "Code must be at least 2 characters long.")
    .max(8)
    .nullable(),
  accessible: z.boolean().nullable(),
  notes: z.string(),
});

type ValidationSchemaType = z.infer<typeof schema>;

export default function NewPage() {
  const [gpsFailAlertOpen, setGpsFailAlertOpen] = useState(false);
  const map = useRef<mapboxgl.Map | null>(null);
  const locationWatchId = useRef<number | null>(null);
  const {showSnackBar} = useSnackBar();
  const navigate = useNavigate();

  const [isSubmitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [coords, setCoords] = useState<{ lat: number; lng: number }>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchemaType>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<ValidationSchemaType> = (data) => {
    console.log(data);
    setSubmitting(true);
    fetch("/api/restroom", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        ...coords,
      }),
    })
      .catch((err) => {
        console.log(err);
        setSubmitError("Something went wrong");
        showSnackBar({label: "Something went wrong creating a restroom."});
      }).then(() => {
        showSnackBar({label: "Restroom successfully created."});
        navigate("/");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  function handleGpsFailAlertClose() {
    setGpsFailAlertOpen(false);
  }

  return (
    <>
      <Snackbar
        open={gpsFailAlertOpen}
        autoHideDuration={6000}
        onClose={handleGpsFailAlertClose}
      >
        <Alert
          onClose={handleGpsFailAlertClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Failed to locate.
        </Alert>
      </Snackbar>
      <HStack h="100vh" justify="stretch" alignItems="stretch">
        <div style={{flex: 1}}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles["form-container"]}
          >
            <VStack gap="16px">
              <Typography variant="h6" mb="8px">
                Create Restroom
              </Typography>
              <TextField
                type="text"
                label="Restroom Name"
                {...register("name")}
              />
              {errors.name && (
                <Alert severity="error">{errors.name.message}</Alert>
              )}
              <TextField type="number" label="Fee" {...register("fee")} step=".01" />
              {errors.fee && (
                <Alert severity="error">{errors.fee.message}</Alert>
              )}
              <FormControl fullWidth>
                <InputLabel>Sex</InputLabel>
                <Select
                  label="Sex"
                  value={Sex.Both}
                  {...register("sex")}
                >
                  <MenuItem value={Sex.Both}>Both</MenuItem>
                  <MenuItem value={Sex.Men}>Men</MenuItem>
                  <MenuItem value={Sex.Women}>Women</MenuItem>
                </Select>
              </FormControl>
              <TextField type="text" label="Code" {...register("code")} />
              {errors.code && (
                <Alert severity="error">{errors.code.message}</Alert>
              )}
              <TextField label="Notes" {...register("notes")}></TextField>
              {errors.notes && (
                <Alert severity="error">{errors.notes.message}</Alert>
              )}
              <FormControlLabel
                control={
                  <Checkbox defaultChecked {...register("accessible")} />
                }
                label="Wheelchair Accessible"
              />
            </VStack>
            <Button type="submit">Create</Button>
          </form>
        </div>
        <Box className={styles["map-container"]} flex={1}>
          <MapView
            onLoad={(result) => (map.current = result)}
            onMove={(lat, lng) => setCoords({ lat, lng })}
          />
          <Fab
            style={{ position: "absolute", bottom: 36, right: 16 }}
            onClick={() =>
              (locationWatchId.current = locateUser(
                map.current!,
                locationWatchId.current,
                () => setGpsFailAlertOpen(true)
              ))
            }
          >
            <LocationSearching />
          </Fab>
          <div className={styles["center-marker"]}></div>
        </Box>
      </HStack>
    </>
  );
}
