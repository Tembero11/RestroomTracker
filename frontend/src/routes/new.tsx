import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "../styles/routes/new.module.scss";
import { z } from "zod";
import { useState } from "react";
import MapView from "../components/MapView/MapView";

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
        <input type="text" placeholder="Restroom Name" {...register("name")} />
        {errors.name && <span>{errors.name!.message}</span>}
        <input type="number" placeholder="Fee" {...register("fee")} />
        {errors.fee && <span>{errors.fee!.message}</span>}
        <label>
          <span>Is this restroom accessible?</span>
          <input type="checkbox" {...register("accessible")} />
        </label>
        <select {...register("sex")}>
          <option value={Sex.Men}>Men</option>
          <option value={Sex.Women}>Women</option>
          <option value={Sex.Both}>Both</option>
        </select>
        <input type="text" placeholder="Code" {...register("code")} />
        {errors.code && <span>{errors.code!.message}</span>}
        <textarea placeholder="Notes" {...register("notes")}></textarea>
        {errors.notes && <span>{errors.notes!.message}</span>}
        <input
          type="submit"
          data-size="large"
          value={isSubmitting ? "Creating..." : "Create"}
        />
      </form>
      <div className={styles["map-container"]}>
        <MapView onMove={(lat, lng) => setCoords({lat, lng})}/>
        <div className={styles["center-marker"]}></div>
      </div>
    </div>
  );
}
