import { A } from "@solidjs/router";

export default function Home() {
  return (
    <main>
      <h1>Lupus</h1>
      <p style={{"margin-bottom": "2rem"}}>Die Nummer #1 Werwölfe Companion App.</p>
      
      <A href="/app/join" type="button">Play!</A>
    </main>
  );
}
