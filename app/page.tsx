import Image from "next/image";
import Game from './game';
export default function Home() {
  return (
    <main className="flex items-center justify-center h-screen">
      <Game></Game>
    </main>
  );
}
