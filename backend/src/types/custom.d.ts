import Express from "express";

import { IOAuthResponse } from "../middleware/oAuth";
import { User } from "@prisma/client";

declare global {
   namespace Express {
     export interface Request {
       oAuth?: IOAuthResponse
       context: User
     }
   }
 }