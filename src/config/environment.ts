import { config } from 'dotenv';
config();
const errs: string[] = [];

// Define all environment variables that are mandatory.
const requiredVars: string[] = ['NODE_ENV'];

// Define defaults.
process.env.TZ = process.env.TZ ?? 'America/Buenos_Aires';
process.env.PORT = '3001';
process.env.LOGGING = process.env.LOGGING ?? 'FALSE';
process.env.LOGGING = process.env.LOGGING_HTTP ?? 'TRUE';

requiredVars.forEach((v) => {
  if (process.env[v] == null) {
    errs.push(`- Falta configurar variable de entorno ${v}.`);
  }
});

if (errs.length) {
  errs.forEach((e) => console.error(e));
  console.error('(exit -1) Faltan variables de entorno.');
  process.exit(-1);
}
