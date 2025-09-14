# Task
Entwickelt eine App oder WebApp, die ein analoges Spiel digital unterstützt! Ob Dart, Magic: The Gathering, MauMau oder ein anderes Spiel eurer Wahl – eure Anwendung soll dabei helfen, relevante Informationen zu erfassen, zu speichern und auszuwerten. Beispiele:
Beim Dart: Punkte automatisch berechnen und anzeigen.
Bei Magic: The Gathering: Lebenspunkte und Spielverlauf dokumentieren.
Bei MauMau: Spielstände und Gewinner ermitteln.
Ihr könnt z. B. mit dem MIT App Inventor, Thunkable, Glide, HTML/CSS/JS oder anderen Tools arbeiten – Hauptsache, ihr zeigt euren kreativen Weg zur Lösung!

## Developing

Install dependencies with `bun install` (or `npm install` or `yarn`), start a development server:

```bash
bun run dev

```

To start server or client individually cd
into their subdirectories and run the same command there

## Building

Solid apps are built with _presets_, which optimise your project for deployment to different environments.

By default, `bun run build` will generate a Node app that you can run with `bun start`. To use a different preset, add it to the `devDependencies` in `package.json` and specify in your `app.config.js`.

## Deploying via Docker

If you have docker installed you can run `docker compose up --build` once to build the image and install all of the dependencies.
And then run `docker compose up` to start the webapp.
