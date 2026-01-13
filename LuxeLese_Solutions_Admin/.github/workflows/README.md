CI workflow usage

1) Purpose
- This workflow runs on every push and PR against `main`.
- It installs and runs frontend tests (Vitest) and backend tests (Jest).
- If tests pass, it calls the Render deploy hook stored in the `RENDER_DEPLOY_HOOK` Actions secret.

2) Setup steps you must do in GitHub:
- Go to your repository Settings → Secrets and variables → Actions.
- Add a new repository secret with the name `RENDER_DEPLOY_HOOK` and set it to the Deploy Hook URL you copy from Render (Service → Settings → Deploy Hooks).

3) How to test locally before pushing:
- Frontend: `cd frontend && npm ci && npm test -- --run`
- Backend: `cd backend && npm ci && npm test`

4) To enable the auto-deploy step:
- Make sure you configured the Render deploy hook and added it as `RENDER_DEPLOY_HOOK` secret.
- The workflow will only run the `Deploy to Render` step when the tests succeed.

If you want, I can also open a draft PR with this workflow file and include the README note.