import joi from 'joi';

export const postUrlSchema = joi.object({
    url: joi.string().uri({ scheme: ['http', 'https'], allowRelative: false }).required(),
});