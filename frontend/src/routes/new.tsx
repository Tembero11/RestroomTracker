import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "../styles/routes/new.module.scss";
import { z } from "zod";
import { useState } from "react";
import MapView from "../components/MapView/MapView";
import { Alert, Button, Checkbox, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";

enum Sex {
  Men = "MEN",
  Women = "WOMAN",
  Both = "BOTH",
}

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
  const [isSubmitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [coords, setCoords] = useState<{lat: number, lng: number}>();

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
        ...coords
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

  console.log(errors);
  return (
    <div className={styles.container}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles["form-container"]}
      >
        <TextField type="text" label="Restroom Name" {...register("name")} />
        {errors.name && <span>{errors.name!.message}</span>}
        <TextField type="number" label="Fee" {...register("fee")} />
        {errors.fee && <Alert severity="error">{errors.fee.message}</Alert>}
        <label>
          <span>Is this restroom accessible?</span>
          <input type="checkbox" {...register("accessible")} />
        </label>
        <Checkbox/>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
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
        {errors.code && <Alert severity="error">{errors.code.message}</Alert>}
        <TextField multiline label="Notes" {...register("notes")}></TextField>
        {errors.notes && <Alert severity="error">{errors.notes.message}</Alert>}
        <Button type="submit" variant="contained"><Add/>Create</Button>
      </form>
      <div className={styles["map-container"]}>
        <MapView onMove={(lat, lng) => setCoords({lat, lng})}/>
        <div className={styles["center-marker"]}></div>
      </div>
    </div>
  );
}
