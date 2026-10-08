# SpaceFlow project website

**https://spaceflow3d.github.io/**

Edit the website in [SpaceFlow3D/spaceflow's project-webpage branch](https://github.com/SpaceFlow3D/spaceflow/tree/project-webpage). GitHub Pages publishes that branch at `/spaceflow/`.

This repository provides the organization root address. Its entry pages load the current published website and gallery while keeping the root URLs in the browser. Relative assets come from the current project site, and section links stay on the root page. A self-contained snapshot of the website and its assets provides a fallback if the project page cannot be loaded. No cross-repository deployment credential is needed.

Push website updates to `project-webpage`; the root entry pages use the updated publication automatically. GitHub Pages serves this repository's `main` branch.

Research code: [SpaceFlow3D/spaceflow's main branch](https://github.com/SpaceFlow3D/spaceflow).
