import joi from "joi";

export async function urlSchema(req, res, next) {
  const url = req.body;
  const urlSchema = joi.object({
    url: joi.string().uri().required(),
  });

  const validation = urlSchema.validate(url, { abortEarly: false });
  if (validation.error) {
    res.status(422).send(validation.error.details);
    return;
  }
  next();
}
