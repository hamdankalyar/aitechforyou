# Events and handlers source notes

- **Source:** Author's Events & Handlers slides supplied on September 15, 2026.
- **Order:** What an event is, addEventListener and its two parameters, the handler can do anything, the event object and event.target, other event names, practice, and recap.
- **Demo page:** The slides use a CodePen with "Very Exciting Web Page", a box, and a "Click me" button. The runner's `page` mode reproduces that page inside the sandbox so real clicks reach the code.
- **Event object:** Print `event.type` and `event.target.tagName` instead of the whole object, because the console box cannot show a DOM element.
- **Event names:** Keep the four from the slides: click, dblclick, mouseover, mouseout.
- **Out of scope:** Selecting elements with querySelector and changing the page from a handler are later lessons.
