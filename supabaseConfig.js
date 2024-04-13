import { createClient } from "@supabase/supabase-js";

const projectUrl = "https://rgzqbxsignntyjgklxeo.supabase.co";

console.log(process.env.SUPABASE_ANON);

export const supabase = createClient(projectUrl, process.env.SUPABASE_ANON);
