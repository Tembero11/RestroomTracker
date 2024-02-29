import Express from "express";

import { IOAuthResponse } from "../middleware/oAuth";

declare global {
   namespace Express {
     export interface Request {
       oAuth?: IOAuthResponse
     }
   }
 }