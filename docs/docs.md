# Documentation

## TODOs: 
- figure out VSCode emmet snippets.
- replace `lodash` usages with native methods.
- replace `bluebird` with native Promises (outside of converting methods).
- rename anything related to `React` into `Reactions`.
- create a jsdoc typing system.
- switch to Dart SASS
- research on [native lazy loading](https://caniuse.com/loading-lazy-attr).
- add `helmet` npm package
- create invite system
- research Mongoose schema types for possibly streamlined validation constraints

## HTML/PUG

Mixins are are stored in `mixins.pug`, which then get included in `layout.pug`. Therefore all mixins are available to all templates extending it.

Mongoose Schema instances have an `obj` property which stores all its keys and their options. Might come in handy for semi-automated form generation, although a mixin for that will be quite massive.

<!-- ## CSS -->
<!-- ## JS -->
<!-- ## Database -->

## Endpoints

### Invite-related:

- `GET` `/admin/invites` - the list of all invites in the database.
- `GET` `/admin/invites/create` - the invite creation page.
- `GET` `/admin/invites/:code`- the expanded details of a given invite.
- `GET` `/admin/invites/:code/edit` - edit a given invite.

- `POST` `/admin/invites/create` - API for creating invites, outside of its `GET` page.
- `POST` `/admin/invites/edit` - API for editing existing invites.
