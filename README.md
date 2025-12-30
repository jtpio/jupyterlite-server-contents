# jupyterlite-server-contents

[![Github Actions Status](https://github.com/jtpio/jupyterlite-server-contents/workflows/Build/badge.svg)](https://github.com/jtpio/jupyterlite-server-contents/actions/workflows/build.yml)

This extension replaces JupyterLite's default in-browser storage with a remote Jupyter server's contents API, allowing JupyterLite to read and write files on a real Jupyter server.

![a screenshot of the extension](./screenshot.png)

## Requirements

- JupyterLab >= 4.0.0

## Configuration

This extension reads configuration from JupyterLite's PageConfig. Set the following options to connect to a remote Jupyter server:

- `serverContentsBaseUrl`: The base URL of the remote Jupyter server (e.g., `http://localhost:8888/`)
- `serverContentsToken`: The authentication token for the remote server

### Example Configuration

In your JupyterLite deployment, add the configuration to `jupyter-lite.json`:

```json
{
  "jupyter-config-data": {
    "serverContentsBaseUrl": "http://localhost:8888/",
    "serverContentsToken": "my-token",
    "disabledExtensions": ["@jupyterlite/services-extension:default-drive"]
  }
}
```

## Running Locally

### 1. Install development dependencies

```bash
pip install -e ".[dev]"
```

### 2. Start a Jupyter server

In a separate terminal, start a Jupyter server that will serve the contents:

```bash
jupyter server --ServerApp.token=my-token --ServerApp.allow_origin='*'
```

Note: The `--ServerApp.allow_origin='*'` flag is required to allow cross-origin requests from JupyterLite.

### 3. Build JupyterLite

A `jupyter-lite.json` configuration file is included in this repo. Then build and serve JupyterLite:

```bash
jupyter lite build
jupyter lite serve
```

### 4. Access JupyterLite

Open your browser to the URL shown by `jupyter lite serve` (typically `http://localhost:8000`). The default file browser will show files from the remote Jupyter server.

## Install

To install the extension, execute:

```bash
pip install jupyterlite_server_contents
```

## Uninstall

To remove the extension, execute:

```bash
pip uninstall jupyterlite_server_contents
```

## Contributing

### Development install

Note: You will need NodeJS to build the extension package.

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Change directory to the jupyterlite_server_contents directory

# Set up a virtual environment and install package in development mode
python -m venv .venv
source .venv/bin/activate
pip install --editable "."

# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite

# Rebuild extension Typescript source after making changes
# IMPORTANT: Unlike the steps above which are performed only once, do this step
# every time you make a change.
jlpm build
```

You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm watch
# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser (you may need to wait several seconds for the extension to be rebuilt).

By default, the `jlpm build` command generates the source maps for this extension to make it easier to debug using the browser dev tools. To also generate source maps for the JupyterLab core extensions, you can run the following command:

```bash
jupyter lab build --minimize=False
```

### Development uninstall

```bash
pip uninstall jupyterlite_server_contents
```

In development mode, you will also need to remove the symlink created by `jupyter labextension develop`
command. To find its location, you can run `jupyter labextension list` to figure out where the `labextensions`
folder is located. Then you can remove the symlink named `jupyterlite-server-contents` within that folder.

## AI Coding Assistant Support

This project includes an `AGENTS.md` file with coding standards and best practices for JupyterLab extension development. The file follows the [AGENTS.md standard](https://agents.md) for cross-tool compatibility.

### Compatible AI Tools

`AGENTS.md` works with AI coding assistants that support the standard, including Cursor, GitHub Copilot, Windsurf, Aider, and others. For a current list of compatible tools, see [the AGENTS.md standard](https://agents.md).
This project also includes symlinks for tool-specific compatibility:

- `CLAUDE.md` → `AGENTS.md` (for Claude Code)

Other conventions you might encounter:

- `.cursorrules` - Cursor's YAML/JSON format (Cursor also supports AGENTS.md natively)
- `CONVENTIONS.md` / `CONTRIBUTING.md` - For CodeConventions.ai and GitHub bots
- Project-specific rules in JetBrains AI Assistant settings

All tool-specific files should be symlinks to `AGENTS.md` as the single source of truth.

### What's Included

The `AGENTS.md` file provides guidance on:

- Code quality rules and file-scoped validation commands
- Naming conventions for packages, plugins, and files
- Coding standards (TypeScript)
- Development workflow and debugging
- Common pitfalls and how to avoid them

### Customization

You can edit `AGENTS.md` to add project-specific conventions or adjust guidelines to match your team's practices. The file uses plain Markdown with Do/Don't patterns and references to actual project files.

**Note**: `AGENTS.md` is living documentation. Update it when you change conventions, add dependencies, or discover new patterns. Include `AGENTS.md` updates in commits that modify workflows or coding standards.

### Packaging the extension

See [RELEASE](RELEASE.md)
