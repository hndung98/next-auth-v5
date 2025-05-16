import { Metadata } from "next";

import { currentUser } from "@/lib/auth";
import { getPlaylistsByUserId, getRecentPlaylists } from "@/data/music";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Playlists",
};

export default async function Page() {
  const user = await currentUser();
  const playlists = await getPlaylistsByUserId(user?.id ?? "");
  const otherPlaylists = await getRecentPlaylists();
  return (
    <div className="w-full max-w-4xl space-y-4">
      {user && (
        <div className="mt-4">
          <div>Your playlists:</div>
          <div>
            {playlists.map((p, idx) => (
              <div key={`pid-${idx}`} className="mt-2">
                <Button asChild variant={"link"}>
                  <Link href={`/music/playlists/${p.id}`}>{p.name}</Link>
                </Button>
                <p className="text-sm italic">
                  {p.createdAt.toLocaleString("en-GB", { timeZone: "UTC" })}
                </p>
              </div>
            ))}
            {playlists.length === 0 && (
              <p className="text-sm italic">not found</p>
            )}
          </div>
        </div>
      )}
      <div className="mt-8">
        <h3>Recent Playlists</h3>
        <div>
          {otherPlaylists.map((p, idx) => (
            <div key={`pid-${idx}`} className="mt-2">
              <Button asChild variant={"link"}>
                <Link href={`/music/playlists/${p.id}`}>{p.name}</Link>
              </Button>
              <p className="text-sm italic">
                {`${p.user.name}, ` +
                  p.createdAt.toLocaleString("en-GB", { timeZone: "UTC" })}
              </p>
            </div>
          ))}
          {otherPlaylists.length === 0 && (
            <p className="text-sm italic">not found</p>
          )}
        </div>
      </div>
    </div>
  );
}
