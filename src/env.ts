import { z } from "zod";

export const envSchema = z.object({
  NEXTAUTH_SECRET: z.string().nonempty("Env NEXTAUTH_SECRET é obrigatória"),
  NEXT_PUBLIC_API_PROD_BASE_URL: z
    .string()
    .nonempty("Env API_PROD_BASE_URL é obrigatória"),
  NEXT_PUBLIC_API_DEV_BASE_URL: z
    .string()
    .nonempty("Env API_DEV_BASE_URL é obrigatória"),
  NEXT_PUBLIC_API_DEMO_BASE_URL: z
    .string()
    .nonempty("Env API_DEMO_BASE_URL é obrigatória"),
  NEXT_PUBLIC_MODE: z
    .string()
    .nonempty("Env MODE é obrigatória")
    .refine((value) => {
      return ["prod", "dev", "demo"].includes(value);
    }, "Env MODE deve ser 'prod', 'dev' ou 'demo'"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "Erro nas variáveis de ambiente:",
    parsedEnv.error.flatten().fieldErrors,
  );
  throw new Error("Erro nas variáveis de ambiente");
}

export const env = parsedEnv.data;
