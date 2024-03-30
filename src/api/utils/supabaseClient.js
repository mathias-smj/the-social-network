import { createClient } from '@supabase/supabase-js';

//const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_PROJECT_KEY;

const supabaseUrl = 'https://ujnndinjyfkrzvrytidn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqbm5kaW5qeWZrcnp2cnl0aWRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc2ODA5NzMsImV4cCI6MjAyMzI1Njk3M30.uJO2uoTVnD3oR4Qen3FR8kJHVSWjeuEkUQYMNH7pcjM'
export const supabaseClient = createClient(supabaseUrl, supabaseKey);