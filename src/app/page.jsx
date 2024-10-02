import RenderMovies from "@/app/components/RenderMovies";
import WebSocketComponent from "@/app/components/WebSocketComponent";
export default function Home() {
  return (
    <div className="flex">
      <RenderMovies />
      <WebSocketComponent />
    </div>
  );
}
