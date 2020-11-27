# Styling guide

## JS

### Comments

There are three styles of comments:
- `/* */` - use it for declaring code sections. If the text within is quite long - newline opening and ending tags so it could be folded in the IDE.
- `//` - use it for the comments in the context of the code flow, aka everything that's read along the code. Do not use capital letters and reduce the amount of punctuation to the minimum. If the line gets too long split it into several lines.
- `/** */` - these are JSDoc comments and should be used for general documenting purpose. VSCode comes pre-bundled with JSDoc parser and thus can also infer types from those. They tend to be read outside of the code flow context and therefore should be formatted as separate entities, aka proper sentences with punctuation and capitalization. Also supports Markdown.

**DO NOT USE** `/** **/` as it will be treated as a JSDoc comment and appear as a tooltip to the nearest declaration without accompanied JSDoc comment.