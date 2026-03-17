import { z } from "zod";

export const envSchema = z.object({
  NEXTAUTH_SECRET: z.string("Env NEXTAUTH_SECRET é obrigatória").nonempty("Env NEXTAUTH_SECRET é obrigatória"),
  NEXT_PUBLIC_API_PROD_BASE_URL: z
    .string("Env API_PROD_BASE_URL é obrigatória")
    .nonempty("Env API_PROD_BASE_URL é obrigatória"),
  NEXT_PUBLIC_API_DEV_BASE_URL: z
    .string("Env API_DEV_BASE_URL é obrigatória")
    .nonempty("Env API_DEV_BASE_URL é obrigatória"),
  NEXT_PUBLIC_API_DEMO_BASE_URL: z
    .string("Env API_DEMO_BASE_URL é obrigatória")
    .nonempty("Env API_DEMO_BASE_URL é obrigatória"),
  NEXT_PUBLIC_MODE: z
    .string("Env NEXT_PUBLIC_MODE é obrigatória"  )
    .nonempty("Env NEXT_PUBLIC_MODE é obrigatória")
    .refine((value) => {
      return ["prod", "dev", "demo"].includes(value);
    }, "Env NEXT_PUBLIC_MODE deve ser 'prod', 'dev' ou 'demo'"),
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
