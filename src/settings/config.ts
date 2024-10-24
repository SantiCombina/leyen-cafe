const ENVIRONMENT: "dev" | "prod" = (process.env.NODE_ENV as "dev" | "prod") || "dev";

export {ENVIRONMENT};
