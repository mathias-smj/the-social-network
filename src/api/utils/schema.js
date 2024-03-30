import { z } from 'zod';

const MIN_LENGTH = 8
const FIELD_VALIDATION = {
  TEST: {
    SPECIAL_CHAR: (value) =>
      /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/.test(value),
    LOWERCASE: (value) => /[a-z]/.test(value),
    UPPERCASE: (value) => /[A-Z]/.test(value),
    NUMBER: (value) => /.*[0-9].*/.test(value),
  },
  MSG: {
    MIN_LEN: `Password must have ${MIN_LENGTH} characters`,
    SPECIAL_CHAR: "Password must contain atleast one special character",
    LOWERCASE: "Password must contain at least one lowercase letter",
    UPPERCASE: "Password must contain at least one uppercase letter",
    NUMBER: "Password must contain at least one number",
    MATCH: "Password must match",
  },
}

const emailSchema = z.string().email();
const passwordSchema = z.string()
  .min(MIN_LENGTH, {
    message: FIELD_VALIDATION.MSG.MIN_LEN,
  })
  .refine(FIELD_VALIDATION.TEST.SPECIAL_CHAR, FIELD_VALIDATION.MSG.SPECIAL_CHAR)
  .refine(FIELD_VALIDATION.TEST.LOWERCASE, FIELD_VALIDATION.MSG.LOWERCASE)
  .refine(FIELD_VALIDATION.TEST.UPPERCASE, FIELD_VALIDATION.MSG.UPPERCASE)
  .refine(FIELD_VALIDATION.TEST.NUMBER, FIELD_VALIDATION.MSG.NUMBER)

const usernameSchema = z.string().min(3);

const signUpSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema
})

const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema
})

const areaSchema = z.string().nonempty();
const inputSchema = z.string().nonempty();

const tweetFormSchema = z.object({
  username: usernameSchema,
  area: areaSchema,
  input: inputSchema,
})




export { usernameSchema, passwordSchema, emailSchema, signUpSchema };