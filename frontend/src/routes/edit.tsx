import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "../styles/routes/new.module.scss";
import { z } from "zod";
import {
  Alert,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Sex, getRestroomById } from "../requests/restroom";
import { Center, HStack, VStack } from "../components/general/Stack/Stack";
import TextField from "../components/general/TextField/TextField";
import Button from "../components/general/Button/Button";
import useSnackBar from "../hooks/useSnackBar";
import { Link, useNavigate, useParams } from "react-router-dom";
import useApi from "../hooks/useApi";
import { useEffect } from "react";
import Card from "../components/general/Card/Card";

const schema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long.")
    .max(32)
    .optional(),
  sex: z.nativeEnum(Sex).optional(),
  fee: z.coerce.number().optional(),
  code: z
    .string()
    .min(2, "Code must be at least 2 characters long.")
    .max(8)
    .optional(),
  accessible: z.boolean().optional(),
  notes: z.string().optional(),
});

type ValidationSchemaType = z.infer<typeof schema>;

export default function EditPage() {
  const { id } = useParams();
  const [data, error, loading, reFetch] = useApi(getRestroomById, id);
  const { showSnackBar } = useSnackBar();
  const navigate = useNavigate();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchemaType>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (!data) return;
    // Set all input values from api
    Object.entries(data).forEach(([key, value]) => {
      if (key in schema.shape) {
        setValue(key as any, value);
      }
    });
  }, [data]);

  const onSubmit: SubmitHandler<ValidationSchemaType> = (data) => {
    console.log(data);
    fetch(`/api/restroom/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .catch((err) => {
        console.log(err);
        showSnackBar({ label: "Something went wrong editing a restroom." });
      })
      .then(() => {
        showSnackBar({ label: "Restroom successfully edited." });
        navigate("/");
      });
  };

  if (!data) {
    return (
      <Center>
        <CircularProgress />
      </Center>
    );
  }

  return (
    <Center h="100vh">
      <Card>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles["form-container"]}
        >
          <VStack gap="16px">
            <Typography variant="h6" mb="8px">
              Edit Restroom
            </Typography>
            <TextField
              type="text"
              label="Restroom Name"
              {...register("name")}
            />
            {errors.name && (
              <Alert severity="error">{errors.name.message}</Alert>
            )}
            <TextField
              type="number"
              label="Fee"
              {...register("fee")}
              step=".01"
            />
            {errors.fee && <Alert severity="error">{errors.fee.message}</Alert>}
            <FormControl fullWidth>
              <InputLabel>Sex</InputLabel>
              <Select label="Sex" value={Sex.Both} {...register("sex")}>
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
              control={<Checkbox defaultChecked {...register("accessible")} />}
              label="Wheelchair Accessible"
            />
          </VStack>
          <HStack justify="stretch" fullWidth>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
            <Button type="submit" style={{ flex: 1 }}>
              Edit
            </Button>
          </HStack>
        </form>
      </Card>
    </Center>
  );
}
