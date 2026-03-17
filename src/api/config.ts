export const configURL = () => {
  switch (process.env.NEXT_PUBLIC_MODE) {
    case "prod":
      return process.env.NEXT_PUBLIC_API_PROD_BASE_URL;
    case "dev":
      return process.env.NEXT_PUBLIC_API_DEV_BASE_URL;
    case "demo":
    default:
      return process.env.NEXT_PUBLIC_API_DEMO_BASE_URL;
  }
};
