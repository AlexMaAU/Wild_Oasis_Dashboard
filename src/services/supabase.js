import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabaseUrl = import.meta.env.VITE_SUPABASEURL;
const supabaseKey = import.meta.env.VITE_SUPABASEKEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

