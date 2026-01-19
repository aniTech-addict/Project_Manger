# Code Standards:

## Naming ( camelCase )

1. Folder naming: Use plurals whenever possible
2. file naming:
   a) Suffix to reflect type of file, example: `boards.service.js`
   b) use plurals if file serves more than one function

## Exports

1. AVOID using default exports
2. if a function is to be exported, declare it at function definition stage

Example:

    *PREFERRED*:
        `
        export function doSomething(){
            // fun logic
        }
    `

    *AVOID*:
    `
        function doSomething(){
            // fun logic
        }
        export {function}
    `

## Commits

    `Syntax: type(domain) : commit message`

    **types**:

        build
        chore
        ci
        docs
        feat
        fix
        perf
        refactor
        revert
        style
        test

    **domains**:

        frontend
        backend

        specific domains: (optional)
            backend/service
            backend/route

            frontend/api
            frontend/env
            frontend/component

## Response Standards

Use these HTTP status codes for API responses. Include descriptive messages.

### Success Codes
- **200 OK**: Successful GET, PUT, DELETE.
- **201 Created**: Successful POST creating a resource.

### Client Error Codes
- **400 Bad Request**: Invalid client input (missing fields, wrong types).
- **401 Unauthorized**: Authentication required/invalid.
- **403 Forbidden**: Authenticated but no permission.
- **404 Not Found**: Resource not found.

### Server Error Codes
- **500 Internal Server Error**: Unexpected server errors.

### Guidelines
- Use `ApiError` for errors, `ApiResponse` for successes.
- Log server errors internally; keep client messages generic.
