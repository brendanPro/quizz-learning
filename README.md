## Profil Identitaire d’Apprentissage — Frontend

### Prérequis
- [Bun](https://bun.sh/) ≥ 1.1 (pour gérer les dépendances et scripts)

### Installation
```bash
bun install
```

### Développement
- `bun run dev` — lance l’interface Vite en mode développeur (http://localhost:5173)
- `bun run storybook` — ouvre Storybook pour visualiser et tester les composants (http://localhost:6006)

### Tests
- `bun run test` — exécute Vitest sur la logique de scoring

> Sur macOS 15 avec Bun 1.1, Vitest peut afficher un warning `tinypool` après l’exécution malgré des tests réussis. Relancer la commande avec `bunx vitest --runInBand` permet de contourner le souci.

### Structure des dossiers
- `src/constants/` — banque de questions et métadonnées des profils
- `src/hooks/` — logique métier (ex. `useQuiz`)
- `src/components/` — composants UI, y compris `QuizResultSummary`
- `.storybook/` — configuration Storybook (plugin Vite, thème, import global)

### Scripts utiles
- `bun run build` — construit l’application Vite pour la production
- `bun run format` / `bun run format:check` — Prettier

