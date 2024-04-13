import { createClient } from "@supabase/supabase-js";

const projectUrl = "https://rgzqbxsignntyjgklxeo.supabase.co";

const ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnenFieHNpZ25udHlqZ2tseGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMwMjEzMTcsImV4cCI6MjAyODU5NzMxN30.yojF1_5MSLxjw9664X6ZgiHncKSFt86pIDzrSSoxSE8";

export const supabase = createClient(projectUrl, ANON);
