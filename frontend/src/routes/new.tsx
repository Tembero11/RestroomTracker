import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "../styles/routes/new.module.scss";
import { z } from "zod";
import { useRef, useState } from "react";
import MapView from "../components/MapView/MapView";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Fab,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Accessible, Add, LocationSearching } from "@mui/icons-material";
import { Sex } from "../requests/restroom";
import { locateUser } from "../components/util/gpsUtils";

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

  // lat: z.number(),
  // lng: z.number(),
});

type ValidationSchemaType = z.infer<typeof schema>;

export default function NewPage() {
  const [gpsFailAlertOpen, setGpsFailAlertOpen] = useState(false);
  const map = useRef<mapboxgl.Map | null>(null);
  const locationWatchId = useRef<number | null>(null);

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
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  function handleGpsFailAlertClose() {
    setGpsFailAlertOpen(false);
  }

  console.log(errors);
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
      <Stack direction="row" height="100vh">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles["form-container"]}
          style={{ flex: 1, padding: "16px" }}
        >
          <Stack gap="8px">
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
            <TextField type="number" label="Fee" {...register("fee")} />
            {errors.fee && <Alert severity="error">{errors.fee.message}</Alert>}
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sex</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Sex"
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
            <TextField
              multiline
              label="Notes"
              {...register("notes")}
            ></TextField>
            {errors.notes && (
              <Alert severity="error">{errors.notes.message}</Alert>
            )}
            <FormControlLabel
              control={<Checkbox defaultChecked {...register("accessible")} />}
              label="Wheelchair Accessible"
            />
          </Stack>
          <Button type="submit" variant="contained">
            <Add />
            Create
          </Button>
        </form>
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
      </Stack>
    </>
  );
}
