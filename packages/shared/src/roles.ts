import { type Role } from "."
/*
  {
  name: 'Erzähler (Spielleiter, spielt nicht mit!)',
  description:
    'Leitet durch die Phasen des Spiels, verteilt die Karten und erzählt die Geschichte. Wird vor Spielbeginn durch die Mitspieler bestimmt.',
	*/
export const Werwolf: Role = {
  name: 'Werwolf',
  description:
    'Die Werwölfe werden nachts vom Spielleiter aufgerufen, erkennen sich und einigen sich auf ein Opfer, welches „gefressen“ wird und somit aus dem Spiel ist. Am nächsten Morgen verkündet der Spielleiter das Opfer der Werwölfe (sofern keine Sonderrolle dies verhindert hat).',
	frequency: "every_night",
	wolf: true 
}
export const Hexe: Role = {
  name: 'Hexe',
  description:
    'Die Hexe erwacht, nachdem die Werwölfe ihr Opfer ausgesucht haben. Sie hat im Verlauf des gesamten Spiels einen Gift‑ und einen Heiltrank. Der Spielleiter zeigt der Hexe das Opfer und die Hexe kann es mit ihrem Heiltrank heilen (auch sich selbst), so dass es überlebt. Sie kann aber auch den Gifttrank auf einen anderen Spieler anwenden. Dadurch kann es in einer Nacht keine, einen oder zwei Tote geben.',
	frequency: "every_night",
	wolf: false
}
export const Jaeger: Role = {

  name: 'Jäger',
  description:
    'Scheidet der Jäger aus dem Spiel aus, feuert er in seinem letzten Lebensmoment noch einen Schuss ab, mit dem er einen Spieler seiner Wahl mit in den Tod reißt, d. h. er bestimmt einen Spieler, der mit ihm aus dem Spiel ausscheidet.',
	frequency: "never", // maybe improve in the future
	wolf: false
}
export const Amor: Role = {
  name: 'Amor',
  description:
    'Amor erwacht nur einmal in der allerersten Nacht, um zwei Spieler seiner Wahl miteinander zu verkuppeln (eventuell auch sich selbst). Danach schläft er wieder ein. Anschließend berührt der Spielleiter die beiden Verliebten an der Schulter, sodass diese kurz erwachen können und sich erkennen. Die Verliebten haben im Laufe des Spiels die Aufgabe, den Partner zu beschützen, denn wenn einer der beiden stirbt, stirbt der Partner ebenfalls an schrecklichem Liebeskummer; sie dürfen nie gegeneinander stimmen.',
	frequency: "once",
	wolf: false
}
export const Blinzelmaedchen: Role = {
  name: 'Blinzelmädchen',
  description:
    'Das kleine Mädchen darf nachts in der Werwolf‑Phase heimlich blinzeln, um so die Werwölfe zu erkennen. Die Werwölfe ihrerseits achten natürlich darauf, das Mädchen dabei zu ertappen, es besteht also beim Blinzeln ein gewisses Risiko.',
	frequency: "never",
	wolf: false
}
export const Seherin: Role = {
  name: 'Seherin',
  description:
    'Die Seherin erwacht, während alle anderen schlafen, und darf sich eine Person aussuchen, deren Rolle sie sehen möchte. Dabei sollte der Spielleiter möglichst unauffällig vorgehen, idealerweise wieder durch Gesten, so dass die Schlafenden nicht hören und raten können, welche Person ausgewählt wurde. Da die Seherin zu jeder Runde die Rolle einer weiteren Person im Spiel kennt, kann sie großen Einfluss nehmen, um dem Dorf zum Gewinn zu verhelfen. Dabei sollte sie ihr Wissen allerdings vorsichtig einsetzen, um nicht die Aufmerksamkeit der Werwölfe auf sich zu ziehen.',
	frequency: "every_night",
	wolf: false
}
//TODO
export const Dieb = {

}
//TODO
export const Dorfmatratze = {

}
//TODO
export const Freimaurer = {

}
//TODO
export const ParanormallerErmittler = {

}
export const Dorfbewohner: Role = {
	name: 'Dorfbewohner',
	description:
		'Der normale Dorfbewohner. Hat keine Sonderfähigkeit und kann sich nur auf seinen Instinkt und seine Überzeugungskraft verlassen.',
	frequency: "never",
	wolf: false
}
export const All: Role[] = [
	Werwolf,
	Hexe, 
	Jaeger,
	Amor,
	Blinzelmaedchen,
	Seherin,
	Dorfbewohner
]
