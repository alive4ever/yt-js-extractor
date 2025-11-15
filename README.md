# yt-js-extractor

## Description

A simple Youtube player js (`base.js`) minifier to extract required functions to solve url query transformation challenge, based on [youtubei.js](https://github.com/LuanRT/youtube.js).

## Requirements

A proper js runtime[^1] is needed to perform the extraction, but a lightweight js engine (such as `quickjs` or `dukpy`) is enough to run the extracted js code.

Clone the repository and install the required packages.

```sh
git clone https://github.com/alive4ever/yt-js-extractor
cd yt-js-extractor
# Use npm with nodejs to install dependencies
npm install
# Use the main js executable for deno and bun
# deno install
# bun install
```

## Usage

An optional argument `player_id` can be used to instruct extraction for specific `player_id`. If not specified, the `player_id` will be determined by `youtube.js`.

```sh
# For node 22 or later
PLAYER_ID="ef5f17ca"
node yt_js_extractor.ts "$PLAYER_ID" | jq -r .output > js_sigfuncs_${PLAYER_ID}.js
# For node 20 (untested)
npx --yes tsx yt_js_extractor.ts "$PLAYER_ID" | jq -r .output > js_sigfuncs_${PLAYER_ID}.js
# node and bun can execute the ts file directly
```

## Acknowledgements

Thanks `@LuanRT` for `youtubei.js` project.

## License

MIT License

---

[^1]: One of `['deno', 'node', 'bun']`
