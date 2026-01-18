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
