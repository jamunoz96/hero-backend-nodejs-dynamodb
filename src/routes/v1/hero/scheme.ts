import Joi from '@hapi/joi';

const general = {
  name: Joi.string().required(),
  alias: Joi.string().required(),
  species: Joi.string().required(),
  company: Joi.object().required()
};

export default {
  create: Joi.object().keys({
    id: Joi.number().optional(),
    ...general
  }),
  update: Joi.object().keys({
    id: Joi.number().required(),
    ...general
  }),
  get: Joi.object().keys({
    id: Joi.required(),
  }),
  delete: Joi.object().keys({
    id: Joi.number().required(),
  }),
};
