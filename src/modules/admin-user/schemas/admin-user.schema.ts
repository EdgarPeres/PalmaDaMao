import { z } from "zod";

export const adminUserMutationSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().trim().min(2, "Informe o nome do administrador."),
    email: z.string().trim().email("Informe um e-mail valido.").toLowerCase(),
    password: z.string().optional(),
    active: z.boolean()
  })
  .superRefine((data, context) => {
    if (!data.id && (!data.password || data.password.length < 8)) {
      context.addIssue({
        code: "custom",
        message: "Informe uma senha temporaria com pelo menos 8 caracteres.",
        path: ["password"]
      });
    }

    if (data.password && data.password.length > 0 && data.password.length < 8) {
      context.addIssue({
        code: "custom",
        message: "A senha deve ter pelo menos 8 caracteres.",
        path: ["password"]
      });
    }
  });

export type AdminUserMutationInput = z.infer<typeof adminUserMutationSchema>;
