import { supabase } from "../../hooks/services/supabase"

export const signUp = async (
  email: string,
  password: string,
  fullName: string,
  role: "farmer" | "supplier"
) => {
  return supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role,
        avatar_url: "",
      },
    },
  });
};

export const signIn = async (email: string, password: string) => {
  return supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout error:", error.message);
    throw error;
  }
}
