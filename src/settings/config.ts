const ENVIRONMENT: "dev" | "prod" = import.meta.env.ENVIRONMENT || "dev";
const PROD_URL = import.meta.env.VITE_APP_PROD_URL;
const DEV_URL = import.meta.env.VITE_APP_DEV_URL;

export {ENVIRONMENT, PROD_URL, DEV_URL};
