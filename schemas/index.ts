import * as z from "zod"

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Βαλε το email σου και ασε τις μαλακιες"
    }),
    password: z.string().refine((val) => !!val, {
        message: "Παμε παλι, 1 2 3 4 5 δεν ειναι δυσκολο"
    })
});
