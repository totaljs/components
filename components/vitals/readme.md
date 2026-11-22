---
name: vitals
description: Core Web Vitals panel with the official thresholds at the 75th percentile, the state of every metric, the distribution of good, needs improvement and poor, and the overall assessment
author: Gera G. Güiles
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2026-11-22 20:24
updated: 2026-11-22 20:24
jcomponent: v20
---

# Vitals

Shows the Core Web Vitals of a site or a page the way Google evaluates them: the value at the 75th percentile, its state against the official thresholds of web.dev, how the visits are split into good, needs improvement and poor, and whether the site passes the assessment (the three core metrics good). Every state is an icon and a text, and the distribution has shapes in its legend, so nothing is told by colour alone. In narrow boxes every metric is one compact row.

The model is an `Object` with one key per metric:

```js
{
	lcp: { p75: 2140, good: 78, ni: 15, poor: 7 },   // milliseconds; good / ni / poor are percentages or counts
	inp: { p75: 168, good: 84, ni: 12, poor: 4 },
	cls: { p75: 0.04 },                               // without the distribution
	ttfb: 1950                                         // a plain value is the p75
}
```

| Metric | Unit in the model | Good | Poor |
| --- | --- | --- | --- |
| `lcp` Largest Contentful Paint | ms (shown in s) | ≤ 2.5 s | > 4.0 s |
| `inp` Interaction to Next Paint | ms | ≤ 200 ms | > 500 ms |
| `cls` Cumulative Layout Shift | none | ≤ 0.10 | > 0.25 |
| `fcp` First Contentful Paint | ms (shown in s) | ≤ 1.8 s | > 3.0 s |
| `ttfb` Time to First Byte | ms (shown in s) | ≤ 0.8 s | > 1.8 s |

- The assessment counts only `lcp`, `inp` and `cls`: passed when all the ones with data are good.
- The names of the metrics are the names of the standard, in English, as in the tools of Google; the states and the assessment are texts of the configuration.
- The label is the content of the tag, so it can contain markup and `@(...)` translations.

__Configuration__:

- `label {String}` the label when the content of the tag is empty (default: `''`)
- `style {String}` `card` (a box) or `minimal` (no box) (default: `card`)
- `metrics {String}` the metrics in their order, separated with commas: `lcp`, `inp`, `cls`, `fcp`, `ttfb` (default: `lcp,inp,cls`)
- `states {String}` the names of the states from bad to good separated with `|`, example: `Poor|Needs improvement|Good`; empty shows only the icons (default: `''`)
- `assessment {String}` the texts of the assessment, failed and passed, separated with `|`, example: `Failed|Passed`; empty hides it (default: `''`)
- `distribution {Boolean}` shows the bar of good, needs improvement and poor (default: `true`)
- `thresholds {Boolean}` shows the thresholds of every metric (default: `true`)
- `locale {String}` a language for the numbers, example: `es-ES`; empty is the language of the page (default: `''`)

__Runtime__: jComponent v20, no dependencies.
