import { useEffect, useState } from "react";
import { supabase } from "./services/supabase";
import { useAuth } from "../context/authContext";

export type Profile = {
  id: string;
  full_name: string | null;
  role: "farmer" | "supplier" | "admin";
  avatar_url: string | null;
  bio: string | null;
  location: string | null;
};

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!error) setProfile(data);

      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  return { profile, loading };
}
