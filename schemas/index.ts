import * as z from "zod"

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Βαλε το email σου και ασε τις μαλακιες"
    }),
    password: z.string().refine((val) => !!val, {
        message: "Παμε παλι, 1 2 3 4 5 δεν ειναι δυσκολο"
    })
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Βαλε το email σου και ασε τις μαλακιες"
    }),
    password: z.string().min(6,{
        message: "Βαλε ρε φιλε ενα σωστο pass ολο 12345"
    }),
    name: z.string().min(3, {
        message: "Βαλε ρε φιλε κατι παραπανω"
    })
});
