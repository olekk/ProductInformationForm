import { z } from "zod";
import { formSchema } from "./constants";

export type Inputs = z.infer<typeof formSchema>
