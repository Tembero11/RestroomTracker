import { Snowflake } from "nodejs-snowflake";

// TODO: Add env
const uid = new Snowflake({
    custom_epoch: new Date(2023).getTime(),
    instance_id: 0,
});


export function genSnowflake(): bigint {
    return uid.getUniqueID() as bigint;
}