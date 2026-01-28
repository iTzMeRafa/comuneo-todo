# 📝 Comuneo To-Do App

Eine rekursive To-Do-Anwendung, die auf Remix.run und Appwrite basiert.

## ✨ Features

* **Rekursive Strukturen**: Erstelle Aufgaben und beliebig viele Unteraufgaben.
* **Authentifizierung**: Sicherer Login & Signup über Appwrite Auth.
* **Echtzeit-Persistenz**: Nahtlose Synchronisation mit der Appwrite Database.
* **Automatisierung**: Versand einer Willkommens-E-Mail bei Registrierung via Appwrite Functions.
* **Modernes UI**: Responsive Design mit Chakra UI für beste User Experience.

## 🛠 Tech Stack

* **Framework**: Remix.run (Fullstack React)
* **Sprache**: TypeScript
* **Backend-as-a-Service**: Appwrite
* **Styling**: Chakra UI
* **Testing**: Vitest & React Testing Library
* **Linting**: Eslint & Prettier

## 🚀 Setup & Installation

1. **Repository klonen**:
```bash
   git clone git@github.com:iTzMeRafa/comuneo-todo.git
```

2. **Dependencies installieren**:
```bash
   yarn install
```

3. **Umgebungsvariablen anpassen**:
```
   cp .env.example .env
   
   VITE_APPWRITE_PROJECT_NAME=your_name
   VITE_APPWRITE_ENDPOINT=your_endpoint
   VITE_APPWRITE_PROJECT_ID=your_project_id
```

4. **Server starten**:
```bash
   npm run dev
```

## 🧪 Testing

Die Anwendung nutzt Vitest für Unit- und Integrationstests, um die Stabilität der To-Do-Logik und der UI-Komponenten sicherzustellen.

Um die Tests im Watch-Modus auszuführen:
```bash
npx vitest
```

**Abgedeckte Test-Szenarien**:
* Korrektes Laden und Rendern von Aufgaben aus der API.
* Hinzufügen von neuen Root-Aufgaben (inkl. API-Mocking).
* Sicherstellung der UI-Provider Integrität (Chakra UI Context).