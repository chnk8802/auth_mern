# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
src/
├── app/                       # App-level config
│   ├── routes.tsx            # All routes defined here (if not using file-based routing)
│   ├── App.tsx               # Root App component
│   ├── providers.tsx         # Context providers (theme, auth, etc.)
│   └── main.tsx              # App entry point (used by Vite)
│   └── store.ts
│
├── assets/                   # Static assets (images, svgs, etc.)
│
├── components/               # Global shared UI components
│   ├── ui/                   # Re-export or customize `shadcn/ui` components
│   ├── layout/               # Header, Footer, Sidebar
│   └── common/               # Generic components (e.g., Loader, ModalWrapper)
│
├── constants/                # Global constants & enums
│   ├── routes.ts             # Route paths
│   ├── messages.ts           # Error/success messages
│   └── config.ts             # App-wide configuration
│
├── features/                 # Feature-based modules (domain-driven)
│   ├── auth/
│   │   ├── components/       # LoginForm, SignupForm, etc.
│   │   ├── api/              # API calls (login, signup)
│   │   ├── hooks/            # useLogin, useAuth
│   │   ├── types/            # AuthUser, LoginPayload, etc.
│   │   ├── store/            # Zustand or context for auth state
│   │   └── index.ts          # Exports everything cleanly
│   │
│   ├── payments/
│   │   ├── components/       # PaymentTable, PaymentDetailsDrawer
│   │   ├── api/              # Fetch payments, update payment status
│   │   ├── hooks/
│   │   ├── types/
│   │   └── index.ts
│   │
│   └── users/
│       ├── components/
│       ├── api/
│       ├── types/
│       └── index.ts
│
├── hooks/                    # Global reusable hooks (not feature-specific)
│   ├── useDebounce.ts
│   ├── useToggle.ts
│   └── useOutsideClick.ts
│
├── lib/                      # Utility libraries & singletons
│   ├── axios.ts              # Axios instance with interceptors
│   ├── dayjs.ts              # Day.js config (if used)
│   └── queryClient.ts        # React Query client setup
│
├── pages/ or routes/         # Top-level route components (if using manual routing)
│   ├── Dashboard.tsx
│   └── Login.tsx
│
├── styles/                   # Global styles, Tailwind config
│   ├── globals.css
│   ├── tailwind.css
│   └── theme.css
│
├── types/                    # Shared types/interfaces used across features
│   ├── api.d.ts
│   └── index.d.ts
│
└── utils/                    # Global helper functions
    ├── formatCurrency.ts
    ├── formatDate.ts
    ├── downloadFile.ts
    └── validateEmail.ts
