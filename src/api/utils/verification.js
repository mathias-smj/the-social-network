import { emailSchema, passwordSchema, signUpSchema, usernameSchema } from './schema.js';

/* const validateSignUpData = (email, password, username) => {
  const validateResult = {
    email: emailSchema.safeParse(email),
    password: passwordSchema.safeParse(password),
    username: usernameSchema.safeParse(username),
  };
  return validateResult.email.success && validateResult.password.success && validateResult.username.success;
}; */

// Fonction pour valider les schema zod
const validateSignUpData = (data) => {
  const validateResult = signUpSchema.safeParse(data);
  return validateResult.success;
}

export { validateSignUpData };