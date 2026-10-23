# Diagrams

Editable sources are PlantUML files in [`src/`](src/). They describe the **planned** architecture of WS
Platform (see [docs/07-architecture.md](../docs/07-architecture.md)). The only part that exists today is
the web client, as a wireframe starter; its component names in the diagrams match `frontend/src/`
(`app/`, `screens/learner/`, `screens/admin/`, `components/`, `i18n/`, `lib/api.ts`). Backend parts, the
data model and the sequence scenario are planned. Requirement IDs come from
[docs/06-requirements.md](../docs/06-requirements.md).

| Diagram | Source (editable) | Export | What it shows |
|---|---|---|---|
| System context | [src/01-system-context.puml](src/01-system-context.puml) | [svg](export/system-context.svg) · [png](export/system-context.png) | roles, the planned platform and its external systems |
| Use case | [src/02-use-case.puml](src/02-use-case.puml) | [svg](export/use-case.svg) · [png](export/use-case.png) | planned use cases per role, with requirement IDs |
| Component | [src/03-component.puml](src/03-component.puml) | [svg](export/component.svg) · [png](export/component.png) | existing web-client starter + planned proxy, backend and storage |
| Data model (ER) | [src/04-data-model.puml](src/04-data-model.puml) | [svg](export/data-model.svg) · [png](export/data-model.png) | planned database schema |
| Activity → export → risk list (sequence) | [src/05-diagnostics-sequence.puml](src/05-diagnostics-sequence.puml) | [svg](export/diagnostics-sequence.svg) · [png](export/diagnostics-sequence.png) | planned key scenario |

**Exports** are in [`export/`](export/) as SVG and PNG, rendered with PlantUML 1.2024.7 (all five sources
render without errors) and embedded in [docs/07-architecture.md](../docs/07-architecture.md). After editing a
source, render it again with the commands below and commit the source and the exports together.

## How to open and export

- Edit in VS Code or IntelliJ with the PlantUML plugin, or paste into https://www.plantuml.com/plantuml.
- Render locally (Java is required; the files use `!pragma layout smetana`, so Graphviz is not needed),
  from the repository root:

```bash
brew install plantuml
```

```bash
plantuml -tsvg -o ../export diagrams/src/*.puml
```

```bash
plantuml -tpng -o ../export diagrams/src/*.puml
```

Or with the jar from https://plantuml.com/download: `java -jar plantuml.jar -tsvg -o ../export diagrams/src/*.puml`.
The output file names come from the `@startuml <name>` line of each source: `system-context`, `use-case`,
`component`, `data-model`, `diagnostics-sequence`.
