import VideoPlayer from "@/components/music/VideoPlayer";
import { getVideoByPlaylistId } from "@/data/music";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const videos = await getVideoByPlaylistId(params.id);

  if (!videos) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <VideoPlayer videos={videos} />
    </div>
  );
}
