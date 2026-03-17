import { z } from "zod";

export const envSchema = z.object({
  NEXT_PUBLIC_API_PROD_BASE_URL: z
    .string()
    .nonempty("Env API_PROD_BASE_URL é obrigatória"),
  NEXT_PUBLIC_API_DEV_BASE_URL: z
    .string()
    .nonempty("Env API_DEV_BASE_URL é obrigatória"),
  NEXT_PUBLIC_API_DEMO_BASE_URL: z
    .string()
    .nonempty("Env API_DEMO_BASE_URL é obrigatória"),
  NEXT_PUBLIC_MODE: z.enum(["prod", "dev", "demo"]),
  NEXTAUTH_SECRET: z.string().nonempty("Env NEXTAUTH_SECRET é obrigatória"),
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
