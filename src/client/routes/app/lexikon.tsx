import { A } from "@solidjs/router";
import { duration } from "drizzle-orm/gel-core";
import { For } from "solid-js";
import "@picocss/pico/css/pico.min.css";
import "./css/lexikon.css"

interface RoleDescription {
  name: string;
  description: string;
}

const roles: RoleDescription[] = [
  {
  name: 'Erzähler (Spielleiter, spielt nicht mit!)',
  description:
    'Leitet durch die Phasen des Spiels, verteilt die Karten und erzählt die Geschichte. Wird zu Spielbeginn durch die Mitspieler bestimmt.',
},
{
  name: 'Dorfbewohner',
  description:
    'Der normale Dorfbewohner. Hat keine Sonderfähigkeit und kann sich nur auf seinen Instinkt und seine Überzeugungskraft verlassen.',
},
{
  name: 'Werwolf (Wolf)',
  description:
    'Die Werwölfe werden nachts vom Spielleiter aufgerufen, erkennen sich und einigen sich auf ein Opfer, welches „gefressen“ wird und somit aus dem Spiel ist. Am nächsten Morgen verkündet der Spielleiter das Opfer der Werwölfe (sofern keine Sonderrolle dies verhindert hat).',
},
{
  name: 'Hexe (Dorf)',
  description:
    'Die Hexe erwacht, nachdem die Werwölfe ihr Opfer ausgesucht haben. Sie hat im Verlauf des gesamten Spiels einen Gift‑ und einen Heiltrank. Der Spielleiter zeigt der Hexe das Opfer und die Hexe kann es mit ihrem Heiltrank heilen (auch sich selbst), so dass es überlebt. Sie kann aber auch den Gifttrank auf einen anderen Spieler anwenden. Dadurch kann es in einer Nacht keine, einen oder zwei Tote geben.',
},
{
  name: 'Jäger (Dorf)',
  description:
    'Scheidet der Jäger aus dem Spiel aus, feuert er in seinem letzten Lebensmoment noch einen Schuss ab, mit dem er einen Spieler seiner Wahl mit in den Tod reißt, d. h. er bestimmt einen Spieler, der mit ihm aus dem Spiel ausscheidet.',
},
{
  name: 'Amor (Dorf)',
  description:
    'Amor erwacht nur einmal in der allerersten Nacht, um zwei Spieler seiner Wahl miteinander zu verkuppeln (eventuell auch sich selbst). Danach schläft er wieder ein. Anschließend berührt der Spielleiter die beiden Verliebten an der Schulter, sodass diese kurz erwachen können und sich erkennen. Die Verliebten haben im Laufe des Spiels die Aufgabe, den Partner zu beschützen, denn wenn einer der beiden stirbt, stirbt der Partner ebenfalls an schrecklichem Liebeskummer; sie dürfen nie gegeneinander stimmen.',
},
{
  name: 'Blinzelmädchen (Dorf)',
  description:
    'Das kleine Mädchen darf nachts in der Werwolf‑Phase heimlich blinzeln, um so die Werwölfe zu erkennen. Die Werwölfe ihrerseits achten natürlich darauf, das Mädchen dabei zu ertappen, es besteht also beim Blinzeln ein gewisses Risiko.',
},
{
  name: 'Seherin (Dorf)',
  description:
    'Die Seherin erwacht, während alle anderen schlafen, und darf sich eine Person aussuchen, deren Rolle sie sehen möchte. Dabei sollte der Spielleiter möglichst unauffällig vorgehen, idealerweise wieder durch Gesten, so dass die Schlafenden nicht hören und raten können, welche Person ausgewählt wurde. Da die Seherin zu jeder Runde die Rolle einer weiteren Person im Spiel kennt, kann sie großen Einfluss nehmen, um dem Dorf zum Gewinn zu verhelfen. Dabei sollte sie ihr Wissen allerdings vorsichtig einsetzen, um nicht die Aufmerksamkeit der Werwölfe auf sich zu ziehen.',
}
];

export default function Home() {
  return (
    <section class="container" style={{ padding: "2rem 0" }}>
      <dl class="lexicon">
        <For each={roles}>
          {(role) => (
            <>
              <article
                class="card p-3">
                <h3>{role.name}</h3>
                <p>{role.description}</p>
              </article>
            </>
          )}
        </For>
      </dl>
    </section>
  );
}
