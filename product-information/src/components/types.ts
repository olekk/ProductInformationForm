import { z } from "zod";
import { formSchema } from "./constants";

export type Inputs = z.infer<typeof formSchema>

export interface DragItem {
    id: number,
    text: string
}

export const ItemTypes = {
    BULLET: 'bullet',
}
