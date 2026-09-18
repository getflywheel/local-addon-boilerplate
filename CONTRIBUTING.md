# Contributing to Local Add-on Boilerplate

This repo is the template that `create-local-addon` scaffolds from. Every change here becomes the starting point for every new Local add-on. Keep the source files small, readable, and teaching something useful.

## Prerequisites

- **Node.js** — check `.nvmrc` or use the version bundled with Local
- **npm** — comes with Node; no Yarn or other package managers
- **Local by WP Engine** — install from [localwp.com](https://localwp.com) to run and test the add-on

## Dev Setup

```bash
npm install      # install dependencies
npm run build    # compile src/ → lib/ via TypeScript
npm run watch    # compile in watch mode during development
npm run lint     # lint with Biome
npm run format   # format with Biome (writes in place)
```

After building, clone the repo into your Local add-ons directory and enable it in Local:

- macOS: `~/Library/Application Support/Local/addons`
- Windows: `C:\Users\<username>\AppData\Roaming\Local\addons`
- Debian Linux: `~/.config/Local/addons`

## Source File Relationships

There are three source files. Read them in this order:

### `src/main.ts` — Main thread

Runs in Electron's main process. Has access to Node.js, the file system, and Local's service container. This is where you register IPC handlers that the renderer calls, interact with `siteData`, and write to the Local log.

```ts
// Example: register an IPC handler the renderer can call
LocalMain.addIpcAsyncListener('my-event', async () => someValue);

// Example: write to Local's Winston logger
const logger = localLogger.child({ thread: 'main', addon: 'my-addon' });
logger.log('info', 'Something happened.');
```

### `src/renderer.tsx` — Renderer entry point

Runs in Electron's renderer process (the Local UI). Its default export receives a `context` object from Local and uses it to register your add-on's UI panel via `hooks.addFilter`. This file is intentionally minimal — its job is registration only.

```ts
hooks.addFilter('siteInfoToolsItem', (menu) => [
	...menu,
	{ menuItem: 'My Tab', path: '/my-addon', render: (props) => <MyComponent {...props} /> },
]);
```

### `src/Boilerplate.tsx` — UI panel component

The React component that renders inside your add-on's tab in Local. Uses `ipcRenderer` to communicate with `main.ts`. This is the file you'll replace or rename when building a real add-on — it demonstrates typed props, hooks-based state, and IPC round-trips.

## What to Modify

| Goal | What to change |
|------|----------------|
| Add a UI panel | Rename/replace `Boilerplate.tsx` with your component; update the import in `renderer.tsx` |
| Handle a background task | Add an `ipcMain.on` or `LocalMain.addIpcAsyncListener` handler in `main.ts` |
| Add a new tab | Add another entry to `hooks.addFilter('siteInfoToolsItem', ...)` in `renderer.tsx` |
| Change the add-on name | Update `name`, `productName`, and `slug` in `package.json` |

## Compiled Output

TypeScript compiles everything in `src/` to `lib/`. The `package.json` fields `"main"` and `"renderer"` point to `lib/main.js` and `lib/renderer.js` respectively — Local loads these at runtime. **Never edit `lib/` directly; it is overwritten on every build.**

## Toolchain

- **TypeScript** — strict mode enabled; all source files are `.ts` or `.tsx`
- **Biome** — replaces ESLint + Prettier; single config in `biome.json`
- **No test framework** — testing infrastructure is tracked in a follow-up issue; see `docs/modernization-plan.md`
