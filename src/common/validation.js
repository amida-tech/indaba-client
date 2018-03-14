export const required = vocab => value => (!value ? vocab.VALIDATE.FIELD_REQUIRED : undefined);
