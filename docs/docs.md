# Documentation

## TODOs: 
- figure out VSCode emmet snippets.
- rename anything related to `React` into `Reactions`.
- create a jsdoc typing system.
- merge `main.scss` and `alt-styles.scss` into one sheet
- research on [native lazy loading](https://caniuse.com/loading-lazy-attr).
- create invitation system.
- add invitation-related properties to `AdminAction` model.
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

Model: `Invitation` - `Invitation.js`

- `GET` `/admin/invitations` - the list of all invitations in the database.
- `GET` `/admin/invitations/:code`- the expanded details of a given invitation.
- `GET` `/admin/invitations/:code/edit` - edit a given invitation.

- `POST` `/admin/invitations` - API for fetching invitations.
- `POST` `/admin/invitations/create` - API for creating invitations.
- `POST` `/admin/invitations/edit` - API for editing existing invitations.

TODOs:
- automate status checks on the model itself or write a lib/middleware so the endpoints would only compare against `status` property.

## Packages

TODOs:

- phase out `express-flash`.
- replace `lodash` usages with native methods.
- replace `bluebird` with native Promises (outside of converting methods).
- add `helmet` npm package.
- switch to `Dart SASS`
- research [`randomstring`](https://www.npmjs.com/package/randomstring) and [`nanoid`](https://github.com/ai/nanoid#readme) functionality clash
- update `javascript-time-ago` to the latest version
