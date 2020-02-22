const Joi = require('joi');

require('dotenv').config();

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production'])
    .default(process.env.NODE_ENV),
  SERVER_PORT: Joi.number()
    .default(4201),
  RABBITMQ_HOST: Joi.string().default(process.env.NODE_ENV === 'development' ? '0.0.0.0' : 'rabbitmq')
}).unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.SERVER_PORT,
  rabbitmq: envVars.RABBITMQ_HOST
};

console.log('HERE IS envVars.NODE_ENV: ', envVars.NODE_ENV);
module.exports = config;
