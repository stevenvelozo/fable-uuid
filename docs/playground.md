# Code Playground

fable-uuid's docs are wired to the **Fable Playground** - a live editor +
sandbox that lives in a sliding drawer at the bottom of the viewport.
Every JavaScript example in these docs has a small play button next
to its Copy and Fullscreen actions; clicking it loads the snippet into
the playground, where you can edit it and press **Run** to see the
output captured in the panel beside the editor.

For the full reference on what the playground does, how the `require`
shim works, and the caveats around module sandboxing, see the
[Fable Playground reference page](/#/playground/fable).

## Try it

The example below boots a Fable and pulls the UUID service off it.
Fable instantiates `fable-uuid` automatically - there's no separate
import needed.  Default mode is RFC v4 (the long `xxxxxxxx-xxxx-...`
form); the random-mode toggle below shows the alternative.

```javascript
const Fable = require('fable');

// Default Fable - fable-uuid is already preinit'd and reachable
// at app.UUID (or via the app.getUUID() shortcut).
const app = new Fable({ Product: 'UUIDPlaygroundDemo' });

// Generate a few v4 UUIDs.
for (let i = 0; i < 5; i++)
{
    app.log.info('Generated v4', { Index: i, UUID: app.getUUID() });
}

// Switch the SAME service into "Random Mode" - short opaque IDs
// drawn from a configurable dictionary.  Useful for slugs / cache
// keys where collision risk is fine and length matters.
app.UUID._UUIDModeRandom = true;
app.UUID._UUIDLength     = 12;
for (let i = 0; i < 3; i++)
{
    app.log.info('Generated random', { Index: i, UUID: app.UUID.getUUID() });
}

// Or stand up a SECOND Fable with random-mode baked in via settings.
const tmpRandomApp = new Fable({
    Product:       'UUIDPlaygroundDemo-RandomVariant',
    UUIDModeRandom: true,
    UUIDLength:     8,
    UUIDDictionary: 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'   // crockford-ish, no I/O/1/0
});
app.log.info('From a second Fable', { UUID: tmpRandomApp.getUUID() });
```
