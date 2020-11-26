# Documentation

## Frontend

### HTML

#### PUG

Mixins are are stored in `mixins.pug`, which then get included in `layout.pug`. Therefore all mixins are available to all templates extending it.

### CSS

### TODOs: 
- figure out vscode emmet snippets.
- replace `lodash` usages with native methods.
- replace `bluebird` with native Promises (outside of converting methods).
- rename anything related to `React` into `Reaction`.
- create a jsdoc typing system.
- <del>switch to Dart SASS</del> <ins>Complete</ins>
- research on [native lazy loading](https://caniuse.com/loading-lazy-attr).

## Backend

### TODOs:
- add `helmet` npm package
- create invite system

### Endpoints

Invite-related:

- `/admin/invites` - the list of all invites in the database.
- `/admin/invites/create` - responsible for creation of new invites.
- `/admin/invites/:code`- the expanded details of a given invite.
- `/admin/invites/:code/edit` - edit a given invite.
- `/admin/invites/:code/delete` - delete a given invite.
