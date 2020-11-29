# Documentation

## TODOs: 
- figure out VSCode emmet snippets.
- replace `lodash` usages with native methods.
- replace `bluebird` with native Promises (outside of converting methods).
- rename anything related to `React` into `Reactions`.
- create a jsdoc typing system.
- switch to Dart SASS
- merge `main.scss` and `alt-styles.scss` into one sheet
- research on [native lazy loading](https://caniuse.com/loading-lazy-attr).
- add `helmet` npm package.
- create invitation system.
- research Mongoose schema types for possibly streamlined validation constraints.
- lock admin scripts behind auth somehow.
- research [`randomstring`](https://www.npmjs.com/package/randomstring) and [`nanoid`](https://github.com/ai/nanoid#readme) functionality clash
- check out `sitedown.pug`
- add "verified" status to admin users
- check why `postCreateSocialPost` hangs
- check if admin can ban himself
- client-side validation for invite-related endpoints

## HTML/PUG

Mixins are are stored in `mixins.pug`, which then get included in `layout.pug`. Therefore all mixins are available to all templates extending it.

Mongoose Schema instances have an `obj` property which stores all its keys and their options. Might come in handy for semi-automated form generation, although a mixin for that will be quite massive.

<!-- ## CSS -->
<!-- ## JS -->
<!-- ## Database -->

## Endpoints

### Invitation-related:

- `GET` `/admin/invitations` - the list of all invitations in the database.
- `GET` `/admin/invitations/:code`- the expanded details of a given invitation.
- `GET` `/admin/invitations/:code/edit` - edit a given invitation.

- `POST` `/admin/invitations` - API for fetching invitations.
- `POST` `/admin/invitations/create` - API for creating invitations.
- `POST` `/admin/invitations/edit` - API for editing existing invitations.
