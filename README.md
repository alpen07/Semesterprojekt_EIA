# 🚀 Planet Clicker

**Planet Clicker** ist ein browserbasiertes Clicker-Game, bei dem es darum geht, durch das Klicken auf einen Asteroiden Kristalle zu sammeln. Mit den gesammelten Kristallen können Upgrades gekauft werden, um die Produktion zu steigern und den Spielfortschritt zu beschleunigen.

Das Projekt wurde im Rahmen eines Semesterprojekts im Studiengang Medientechnik entwickelt.

## 🎮 Features

- **Clicker-System:** Sammle Kristalle durch das Klicken auf den Asteroiden.
- **Upgrade-Shop:** Kaufe verschiedene Verbesserungen, um deine Klickstärke und automatische Kristallproduktion zu erhöhen.
- **Automatische Produktion:** Generiere Kristalle pro Sekunde, ohne selbst klicken zu müssen.
- **Prestige-System:** Setze deinen Spielfortschritt zurück und erhalte dafür dauerhafte Boni auf deine Klickstärke.
- **Speicherung:** Dein Spielfortschritt wird automatisch im Local Storage des Browsers gespeichert.
- **Reset-Funktion:** Setze deinen gesamten Spielfortschritt zurück.

## 🛠️ Technologien

Das Projekt wurde mit folgenden Technologien umgesetzt:

- **HTML5** – Struktur und Aufbau der Benutzeroberfläche
- **CSS3** – Gestaltung und responsives Layout
- **JavaScript** – Spiellogik, Upgrades, Speicherverwaltung und Interaktionen
- **Local Storage** – Speicherung des Spielfortschritts im Browser

## 📁 Projektstruktur

```text
Semesterprojekt_EIA/
│
├── assets/
│   └── pictures/
│       └── asteroid.png
│
├── scripts/
│   ├── clicker.js
│   └── store.js
│
├── styles/
│   └── styles.css
│
├── index.html
└── README.md
```

## 🚀 Installation und Ausführung

Das Spiel benötigt keine zusätzliche Installation von Abhängigkeiten oder Build-Tools.

1. Repository klonen:

   ```bash
   git clone https://github.com/alpen07/Semesterprojekt_EIA.git
   ```

2. In das Projektverzeichnis wechseln:

   ```bash
   cd Semesterprojekt_EIA
   ```

3. Die Datei `index.html` im Browser öffnen.

Alternativ kann das Projekt über die Erweiterung **Live Server** in Visual Studio Code gestartet werden.

## 🕹️ Spielprinzip

1. Klicke auf den Asteroiden, um Kristalle zu sammeln.
2. Öffne den Shop und investiere deine Kristalle in Upgrades.
3. Verbessere deine Klickstärke oder kaufe automatische Kristallproduktion.
4. Erreiche die erforderliche Anzahl an Kristallen, um das Prestige-System freizuschalten.
5. Starte erneut mit einer höheren Grund-Klickstärke und verbessere deinen Fortschritt.

## 💾 Datenspeicherung

Der Spielfortschritt wird mithilfe von `localStorage` gespeichert. Dadurch bleiben unter anderem folgende Daten auch nach dem Schließen oder Neuladen der Seite erhalten:

- Aktuelle Kristallanzahl
- Prestige-Stufe
- Klickstärke
- Automatische Kristallproduktion
- Gekaufte Upgrades

## 🎓 Projektinformation

**Projekt:** Planet Clicker  
**Studiengang:** Medientechnik  
**Schwerpunkt:** Entwicklung eines interaktiven Browsergames

---

*Viel Spaß beim Sammeln von Kristallen!* 💎
