# cropguard-ai

A mobile web app that lets farmers photograph a diseased crop leaf and receive an instant AI diagnosis with treatment advice, in English or Swahili.

## Run Locally

From the repository root, install dependencies for the workspace:

```bash
npm install
```

Start both the frontend and backend together:

```bash
npm start
```

Expected local endpoints:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

## Run Individual Workspaces

If you want to start each app separately, use these commands from the repository root:

```bash
npm run start:frontend
npm run start:backend
```

## Backend Model Requirement

The backend depends on a local ONNX model file at `model/model.onnx`.
