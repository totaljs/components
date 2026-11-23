---
name: WebAgent
description: Chat with the visitors of an agentic website, answered by the AI of the browser (Chrome Prompt API) with the content of llms.txt and, when allowed, the MCP tools of the site
author: Gera G. Güiles
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2026-11-23 12:18
updated: 2026-11-23 12:18
jcomponent: v20
---

# WebAgent

An agent of the website that talks with its visitors. It is answered by the AI built into the browser of the visitor (the Prompt API of Chrome), so there is no server, no API key and no cost per message, and what the visitor writes stays in the browser. It knows the website from its `llms.txt` and the pages it links to, and it can use the MCP tools of the website (the same ones as the `webmcp` component).

Put it on the page and it works: everything it knows comes from your website. The quality of its answers depends on what you give it, so read **Prepare your website** below.

```html
<ui-component name="webagent" config="name:Nova">You are Nova, the guide of Componentator. You are friendly and brief.</ui-component>
```

## Who sees it

The component shows only when the browser of the visitor has an AI built in (the Prompt API). Elsewhere nothing appears and the page stays as it is. The example of this component does the same: in a browser without its AI it shows a notice instead.

- Any browser with this AI works, now and when others add it. For example, Chrome has it on computers: its page explains the versions, devices and languages, [Prompt API](https://developer.chrome.com/docs/ai/prompt-api). This changes from one version to the next, so the component asks the browser instead of keeping its own list.
- The agent answers in the language of the page (or `language`). When the AI of the browser does not have that language, it answers in English.
- The browser downloads its model once for all the websites (in Chrome, several GB). When the browser can run it but has not downloaded it yet, the chat shows too: the click that opens it starts the download, with a progress bar, and the chat answers when it ends. With `download:false` the chat waits until the model is there (another website or the browser made the download), so no visitor downloads it because of your website.

## Prepare your website

### 1. llms.txt

The component reads `/llms.txt` of your website (`llms` to change it). It is the summary of your website for language models ([llmstxt.org](https://llmstxt.org)): a title, one paragraph about the site, and the important pages as links with a short description.

If you need help to write yours, look at an example: [j-webagent.llms.txt](https://cdn.componentator.com/j-webagent.llms.txt), an llms.txt for Componentator with its sections and the pages of its components (it is in the folder of the component and is published with it on the CDN), or the [llms.txt of Componentator](https://componentator.com/llms.txt) itself.

- The whole text goes to the agent with every conversation, so put there what most visitors ask: what your website is, what it offers, how to start, how to get help. Only its first 12,000 characters are used: the model of the browser has a small context.
- Links to pages of your own website only (same origin): the agent reads only those. Links to other websites (documents on GitHub, for example) are not read, though the agent may link them in its answers: put what matters on your website, or in the text of `llms.txt`.
- For each question the agent reads up to `pages` pages (default 2) whose **title, description or address share the words of the question**. Write the descriptions with the words your visitors use, also in their languages when your visitors write in several (`table, grid, tabla`). A page is read once per conversation, its first 4,000 characters.

### 2. The pages

The pages linked from `llms.txt` are best in Markdown (`/docs/use.md`): short, with the facts first. HTML pages work too: the agent reads the text of `<main>` (or `<article>`, or the body). Keep each page about one subject: a long page is cut at 4,000 characters.

### 3. The prompt

The content of the tag is the prompt of the agent: who it is, its tone, what it helps with. For a longer text use a `<script type="text/plain">` inside the tag. The component adds its own rules after it: answer only with the content of the website, say when it does not know, never invent prices, dates or facts, answer briefly in Markdown with links to the pages.

```html
<ui-component name="webagent" config="name:Nova">
	<script type="text/plain">You are Nova, the guide of Componentator, the catalogue of UI components for Total.js. You help people find the right component for their app and explain how to use it. You are friendly and brief. When there is no component for what they need, say so and give the page that explains how to create one.</script>
</ui-component>
```

### 4. Tools (optional)

With tools the agent can do more than answer: search the catalogue, send feedback to the team, open a request for a new component. They are the MCP tools of your Total.js 5 application, as in the `webmcp` component:

```plain
$mcp : true
```

```javascript
NEWACTION('Components|find', {
	mcp: true,
	summary: 'Find components of the catalogue by what they do',
	input: '*q:String // Words to search, e.g. date, table, chart',
	action: function($, model) {
		$.callback([]);
	}
});
```

```html
<ui-component name="webagent" config="name:Nova;url:/webagent/;tools:Components_find,Feedback_send;safe:Components_find">You are Nova...</ui-component>
```

- `tools` lists the tools the agent may use (`Components|find` is the tool `Components_find`). The `summary` and the comments of the fields are what the model reads to choose a tool and to write its arguments: write them clearly.
- Before a tool runs, the visitor sees its name and its arguments and answers Yes or No. The tools in `safe` (read-only ones such as a search) run without asking, and so do tools that the server marks as read-only (`readOnlyHint`).
- The arguments are written by a small model from what the visitor asks: list only tools that are safe for any visitor, and check permissions and input in the action. On a public website do not open `/$mcp/` (its tools run as an administrator): add a route that lists and runs only the allowed tools, as the readme of `webmcp` shows, and point `url` to it.

### 5. Texts and language

The texts of the chat are in the configuration, so they can be `@(...)` translations of your application. The agent answers in `language`, or in the language of the page (`<html lang>`), or in English when the model does not support that language.

### 6. The conversation between pages

The model of the component is the conversation, `[{ role: 'user' | 'assistant', content: String }]` (an assistant message may have `tool` and `error: true`). Bind it to a path and keep it, so the conversation goes on in the next page:

```html
<ui-component name="webagent" path="agent" config="name:Nova;change:onagent">...</ui-component>
<script>
	SET('agent', CACHE('agent') || []);
	function onagent(conversation) {
		CACHE('agent', conversation, '1 day');
	}
</script>
```

### 7. Test it

- A browser with the Prompt API (see the page of Chrome above). In Chrome, `chrome://on-device-internals` shows whether the model is downloaded.
- Over HTTPS or on `localhost`. Ask the questions of your visitors and improve `llms.txt` and the descriptions with what is missing.
- With Playwright, launch Chrome with `ignoreDefaultArgs: ['--disable-component-update']`: with that flag Chrome cannot manage its model and the component never shows.

## How it answers a question

1. The text of `llms.txt` and the rules start the conversation of the model (read before the first click).
2. The pages of `llms.txt` that match the words of the question are added.
3. With `tools`, the model chooses a tool or none (an answer constrained to the names of the tools) and writes its arguments (constrained to the input schema of the tool); the result is added.
4. The answer streams into the chat as Markdown. Links go only to the home page of your website, the addresses that `llms.txt` names and the pages read: an address written by the model alone stays as text, because it may not exist.

When the conversation does not fit in the context of the model any more, it starts again with the last messages. The stop button cancels the answer.

## Security and privacy

- Nothing goes to any server but yours: `llms.txt`, its pages and the tools, with same-origin cookies and no redirects. The model runs in the browser.
- The model never writes HTML into the page: everything is escaped and only safe links are kept.
- A tool that is not in `safe` always waits for the visitor.

__Configuration__:

- `name {String}` the name of the agent, in the head of the chat and for the model (default: `Assistant`)
- `icon {String}` the icon of the button and of the head, a Total.js icon (default: `ti ti-robot`)
- `llms {String}` the address of `llms.txt`, same origin; empty uses no site content (default: `/llms.txt`)
- `pages {Number}` how many pages of `llms.txt` it reads for one question, `0` reads none (default: `2`)
- `url {String}` the same-origin MCP endpoint of the tools (default: `/$mcp/`)
- `tools {String}` the names of the tools the agent may use, separated by commas, example: `Components_find,Feedback_send`; empty uses no tools (default: `''`)
- `safe {String}` the tools that run without asking the visitor, separated by commas, example: `Components_find` (default: `''`)
- `download {Boolean}` shows the chat also when the model is not downloaded yet, and opening it starts the download of several GB; `false` shows it only when the model is there (default: `true`)
- `position {String}` `right` or `left` (a floating button in that corner opens the chat) or `inline` (the chat in its place, always open) (default: `right`)
- `height {Number}` the height of the chat in pixels with `position:inline` (default: `520`)
- `open {Boolean}` the floating chat starts open (default: `false`)
- `language {String}` the language of the answers, a code such as `es`; empty is the language of the page; English when the AI of the browser does not have it (default: `''`)
- `welcome {String}` the first message of the agent, Markdown (default: `''`)
- `placeholder {String}` the text of the empty input, also its accessible name (default: `Write a question`)
- `note {String}` a small text under the input; empty hides it (default: `The AI of your browser answers. It can make mistakes.`)
- `opener {String}` the accessible name of the floating button (default: `Open the assistant`)
- `close {String}` the accessible name of the close button (default: `Close`)
- `send {String}` the accessible name of the send button (default: `Send`)
- `stop {String}` the accessible name of the stop button while it answers (default: `Stop`)
- `preparing {String}` the text over the bar while the model downloads or starts (default: `Preparing the AI of your browser`)
- `confirm {String}` the question before a tool, followed by the name of the tool (default: `May I use`)
- `yes {String}` the button that allows the tool (default: `Yes`)
- `no {String}` the button that refuses it (default: `No`)
- `error {String}` the message when the model could not answer (default: `The assistant could not answer. Try again.`)

__Callbacks__:

- `change {String}` link to a global `function(conversation, component)`, executed after each complete answer with the conversation (the model)

__Accessibility__:

- The floating button has `aria-expanded`; Escape closes the chat and the focus goes back to the button.
- Enter sends, Shift+Enter makes a new line.
- The conversation has the role `log`. While an answer streams it is `aria-busy`, and the complete answer is read once by screen readers.
- The question about a tool takes the focus on its first button.
- Animations follow `prefers-reduced-motion`.
