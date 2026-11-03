# Log: swiper

Result of converting the old component with `tools/convert.js` and checking it with `node tools/check.js swiper --legacy`. Type: **component**, jComponent: **v20**. This file is evidence for the review; it is not part of the format of a component (`component.html`, `readme.md`, `preview.jpg`).

## What was done

- `component.css` -> `<style component>`, `component.js` -> `<script component>`, `example.html` -> the example, `dependencies.html` -> the `<head>`, `component.json` -> the frontmatter of `readme.md`. The code of the component was not changed (only the `self.nocompile()` call, which does nothing, was removed).
- Description: written by the AI from the readme and the code, check it.
- Preview: picture.jpg.

## Browser (Chrome, from disk)

- It opens in Chrome from disk without JavaScript errors of its own.

## Warnings

3 warning(s). They are style rules for new components that the old code does not follow; nothing was rewritten because converting must not change the behaviour.

### 3 x selector "..." is not scoped under .ui-swiper

- `selector ".ui-wiper-button-next.swiper-button-next:after" is not scoped under .ui-swiper`
- `selector ".ui-wiper-button-prev.swiper-button-prev:after" is not scoped under .ui-swiper`
- `selector ".ui-wiper-pagination .swiper-pagination-bullet-active" is not scoped under .ui-swiper`

**How to fix**: rename the class so it starts with `.ui-swiper` (for example `.ui-name-part`), in the CSS **and** in every place of the JavaScript or the example that writes or searches that class. If the class is a public one that applications already style (for example `.markdown`), leave it: renaming it changes the markup that other code depends on.

## Still to finish

Nothing: `check.js --legacy` reports no errors.

