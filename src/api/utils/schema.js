// Importation de Zod pour la validation des schémas
import { z } from 'zod';

// Définition de la longueur minimale requise pour un mot de passe
const MIN_LENGTH = 8;

// Objets contenant les règles de validation pour les champs de mot de passe
const FIELD_VALIDATION = {
  TEST: {
    SPECIAL_CHAR: (value) =>
      /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/.test(value), // Vérifie la présence de caractères spéciaux
    LOWERCASE: (value) => /[a-z]/.test(value), // Vérifie la présence de minuscules
    UPPERCASE: (value) => /[A-Z]/.test(value), // Vérifie la présence de majuscules
    NUMBER: (value) => /.*[0-9].*/.test(value), // Vérifie la présence de chiffres
  },
  MSG: {
    MIN_LEN: `Password must have ${MIN_LENGTH} characters`, // Message d'erreur pour la longueur minimale
    SPECIAL_CHAR: "Password must contain atleast one special character", // Message d'erreur pour les caractères spéciaux
    LOWERCASE: "Password must contain at least one lowercase letter", // Message d'erreur pour les minuscules
    UPPERCASE: "Password must contain at least one uppercase letter", // Message d'erreur pour les majuscules
    NUMBER: "Password must contain at least one number", // Message d'erreur pour les chiffres
    MATCH: "Password must match", // Message d'erreur pour la correspondance du mot de passe
  },
}

// Schéma de validation pour l'e-mail
const emailSchema = z.string().email();

// Schéma de validation pour le mot de passe
const passwordSchema = z.string()
  .min(MIN_LENGTH, {
    message: FIELD_VALIDATION.MSG.MIN_LEN, // Définit le message d'erreur pour la longueur minimale
  })
  .refine(FIELD_VALIDATION.TEST.SPECIAL_CHAR, FIELD_VALIDATION.MSG.SPECIAL_CHAR) // Applique la validation des caractères spéciaux
  .refine(FIELD_VALIDATION.TEST.LOWERCASE, FIELD_VALIDATION.MSG.LOWERCASE) // Applique la validation des minuscules
  .refine(FIELD_VALIDATION.TEST.UPPERCASE, FIELD_VALIDATION.MSG.UPPERCASE) // Applique la validation des majuscules
  .refine(FIELD_VALIDATION.TEST.NUMBER, FIELD_VALIDATION.MSG.NUMBER); // Applique la validation des chiffres

// Schéma de validation pour le nom d'utilisateur
const usernameSchema = z.string().min(3);

// Schéma de validation pour l'inscription d'un utilisateur
const signUpSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema
});

// Schéma de validation pour la connexion d'un utilisateur
const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema
});

// Schéma de validation pour un formulaire de tweet
const areaSchema = z.string().nonempty();
const inputSchema = z.string().nonempty();
const tweetFormSchema = z.object({
  username: usernameSchema,
  area: areaSchema,
  input: inputSchema,
});

// Exportation des schémas de validation
export { usernameSchema, passwordSchema, emailSchema, signUpSchema };
