import { supabaseClient } from '../utils/supabaseClient.js';
import { USER_PROFILE_TABLE } from '../../enums/tableNames.js';
import { validateSignUpData } from '../utils/verification.js';

const update = async (user_id, value) => {
  try {
    const { data, error } = await supabaseClient
      .from(USER_PROFILE_TABLE)
      .update(value)
      .eq('id', user_id);
  } catch (error) {
    throw error;
  }
};

export const signUpWithPassword = async (username, email, password) => {
  try {
    if (!validateSignUpData({ username, email, password })) {
      throw new Error('Invalid input data');
    }
    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password
    });

    if (error) {
      return Promise.reject(error.message);
    }
    await update(data.user.id, { username: username });
    return Promise.resolve(data.user);
  } catch (error) {
    throw error;
  }
};

export const signInWithPassword = async (email, password) => {
  const { error } = await supabaseClient.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    return Promise.reject(error);
  }
  return Promise.resolve(true);
};

export const signOut = async () => {
  const { error } = await supabaseClient.auth.signOut();
  if (error) {
    return Promise.reject(error);
  }
};
