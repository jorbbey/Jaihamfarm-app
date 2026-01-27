import { supabase } from "./services/supabase";
import { useEffect, useState } from "react";

export function useFeed() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("posts")
        .select(`
          id,
          content,
          media_urls,
          created_at,
          profiles (
            full_name,
            avatar_url,
            role
          )
        `)
        .order("created_at", { ascending: false });

      setPosts(data ?? []);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return { posts, loading };
}
