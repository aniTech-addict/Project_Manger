# Backend API Reference

## Response Envelope

All controllers return an `ApiResponse` object with `success`, optional `message`, and `data` fields. Success responses use the status codes listed per route; validation/not-found errors throw `ApiError` with the indicated status codes.

## Data Models

### Board
- Fields: `title` (string, required), `description` (string, optional, max ~500 chars), `tags` (string[]), `isDeleted` (boolean, default false), `createdAt`, `updatedAt`.

### Task
- Fields: `boardId` (ObjectId ref Board, required), `title` (string, required), `description` (string), `status` (enum: created | in progress | done | bugs | testing, required), `parent_task` (ObjectId ref Task, nullable), `tags` (string[], default []), `isDeleted` (boolean, default false), `createdAt`, `updatedAt`.

---

## Boards Router (base: `/api/v1/boards`)

### GET `/`
- Purpose: List all boards.
- Request: no body/params.
- Success: 200 with `data` array of board documents.
- Errors: 404 if none found.

### GET `/:boardId`
- Purpose: Fetch a single board by id.
- Params: `boardId` (string, required).
- Success: 200 with `data` board document.
- Errors: 400 if missing id, 404 if not found.

### POST `/`
- Purpose: Create a board.
- Body JSON:
```json
{
  "title": "string (required)",
  "description": "string (optional)",
  "tags": ["string", "..."]
}
```
- Success: 201 with `data` `{ "id": "<boardId>" }` and message "Board created successfully".
- Errors: 400 if `title` missing.

### PATCH `/:boardId`
- Purpose: Update board fields.
- Params: `boardId` (string, required).
- Body JSON: any subset of `title`, `description`, `tags`, `isDeleted`.
- Success: 200 with `data` updated board document.
- Errors: 400 if missing id, 404 if board not found.

### DELETE `/:boardId`
- Purpose: Soft-delete a board (sets `isDeleted` true).
- Params: `boardId` (string, required).
- Success: 200 with `data` `{ "id": "<boardId>" }` and message "Board archived successfully".
- Errors: 400 if missing id, 404 if not found.

---
## Tasks under Board Router (base: `/api/v1/boards`)

### POST `/:boardId/tasks`
- Purpose: Create a task under a board.
- Params: `boardId` (string, required).
- Body JSON:
```json
{
  "title": "string (required)",
  "description": "string (required)",
  "status": "created | in progress | done | bugs | testing",
  "tags": ["string", "..."]
}
```
- Success: 201 with `data` `{ "id": "<taskId>" }` and message "Task created successfully".
- Errors: 400 if any required field missing.

### GET `/:boardId/tasks`
- Purpose: List tasks for a board.
- Params: `boardId` (string, required).
- Success: 200 with `data` array of task documents belonging to the board.
- Errors: 400 if missing id.

---
## Tasks Router (base: `/api/v1/tasks`)

### GET `/:taskId`
- Purpose: Fetch one task by id.
- Params: `taskId` (string, required).
- Success: 200 with `data` task document and message "Task retrieved successfully".
- Errors: 400 if missing id, 400 if not found.

### PATCH `/:taskId`
- Purpose: Update a task.
- Params: `taskId` (string, required).
- Body JSON: any subset of `title`, `description`, `status`, `tags`, `parent_task`, `isDeleted`.
- Success: 200 with `data` updated task document.
- Errors: 400 if missing id, 400 if not found.

### DELETE `/:taskId`
- Purpose: Delete a task.
- Params: `taskId` (string, required).
- Success: 200 with `data` `{ "id": "<taskId>" }` and message "Task deleted successfully".
- Errors: 400 if missing id, 404 if not found.

## Notes
- Soft delete is implemented only for boards (sets `isDeleted` flag); task deletion is hard delete.
- Additional bulk delete handler exists but is not wired to any route.
- Response envelope always includes `success` (boolean) and may include `message` alongside `data`. Error responses use the same shape with appropriate status codes.
