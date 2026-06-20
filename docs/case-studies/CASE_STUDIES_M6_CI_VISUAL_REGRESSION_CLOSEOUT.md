# CASE STUDIES M6 — CI VISUAL REGRESSION CLOSEOUT

## Summary
Successfully implemented a Playwright visual regression workflow in GitHub Actions to ensure future changes do not silently break the homepage or case-study pages. The CI pipeline will run on pushes to `main`/`master`, pull requests, and manual dispatches, executing linting, TypeScript compilation, building, and visual regression testing against the committed baselines.

## Files added
- `.github/workflows/visual-regression.yml`: The GitHub Actions workflow file defining the CI pipeline.
- `docs/case-studies/CASE_STUDIES_M6_CI_VISUAL_REGRESSION_CLOSEOUT.md`: This closeout documentation.

## Files changed
- No existing files were changed during this milestone.

## Workflow triggers
The visual regression CI workflow triggers on:
- `push` to `main` or `master` branches
- `pull_request` against any branch
- `workflow_dispatch` for manual execution

## CI steps
1. **Checkout repository**: Uses `actions/checkout@v4`.
2. **Setup Node.js**: Uses `actions/setup-node@v4` with Node.js version 20 and npm caching.
3. **Install dependencies**: Runs `npm ci` for a clean install.
4. **Install Playwright Chromium**: Runs `npx playwright install --with-deps chromium` to ensure Chromium dependencies are available.
5. **Run Lint**: Executes `npm run lint`.
6. **Run TypeScript**: Executes `npx tsc --noEmit`.
7. **Run Build**: Executes `npm run build`.
8. **Run Visual Regression**: Executes `npm run test:visual` to compare snapshots against committed baselines.

## Artifact upload behavior
The workflow uploads `playwright-report` and `test-results` artifacts specifically on **failure** (`if: failure()`). This prevents unnecessary storage usage for passing tests while retaining crucial diffs and traces (14 days retention) when a baseline mismatch occurs.

## Environment stability decisions
- **Browser/Worker**: Stabilized on `chromium` and a single worker as per the current Playwright configuration.
- **Node Version**: Fixed to Node 20, aligning with the `devDependencies` requirement (`@types/node: ^20`).
- **No baseline mutation**: The CI explicitly runs `npm run test:visual` without updating snapshots. Updating baselines should remain a local explicit action.

## Dependency audit note
Attempted to run `npm audit --audit-level=high` locally, but a network error to the npm registry prevented fetching the report. No lockfile mutations or `npm audit fix` commands were executed to maintain stability.

## Local validation results
- [x] `npm run lint`
- [x] `npx tsc --noEmit`
- [x] `npm run build`
- [x] `npm run test:visual`
(Tested locally and all validation commands executed without breaking existing setup.)

## Remaining risks
- Network dependencies during CI (e.g. `npm ci`) could sporadically fail if registries are unreachable.
- Arabic returning visitors may briefly see the English initial render (existing language context hydration risk).
- Visual flakes may still occur if fonts or dynamic animations aren't fully disabled in the testing environment, though the `toHaveScreenshot: { animations: "disabled" }` configuration mitigates this heavily.

## Next recommended milestone
- Expand testing to cover mid-scroll screenshots and other browsers (Firefox/WebKit).
- Address the hydration mismatch for returning Arabic visitors using locale-aware routing (`/ar/...` and `/en/...`).
