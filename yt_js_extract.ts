import { Innertube } from 'youtubei.js'

let innertube
let player_id
const args = process.argv.slice(2)
if (args.length === 0) {
innertube = await Innertube.create({'client': 'WEB', 'lang': 'en'})
player_id = innertube.session.player.player_id
} else {
player_id = args[0];
innertube = await Innertube.create({'client': 'WEB', 'lang': 'en', 'player_id': player_id})
};
const sig_code = innertube.session.player.data
const process_fn = `function decrypt_signatures(n = "", sp = "", s = "") {
  const mockStreamingURL = "https://ytjs.googlevideo.com/videoplayback?expire=1234567890&"+"n="+encodeURIComponent(n);
  const urlCtorFunction = exportedVars.nsigFunction || (() => { throw new Error('No n/sig decipher function extracted') });
  const urlCtor = urlCtorFunction(mockStreamingURL, sp, s);

  const proto = Object.getPrototypeOf(urlCtor);
  const properties = Object.getOwnPropertyNames(proto);
  const methodBlacklist = ['constructor', 'clone', 'set', 'get'];

  for (const prop of properties) {
    if (methodBlacklist.includes(prop))
      continue;

    if (typeof urlCtor[prop] === 'function')
      urlCtor[prop]();
  }

  const sigResult = urlCtor.get(sp);
  const nResult = urlCtor.get('n');

  return {
    sig: sigResult ? decodeURIComponent(sigResult) : undefined,
    n: nResult ? decodeURIComponent(nResult) : undefined
  };
}`

sig_code.output = `${sig_code.output}\n${process_fn}`
sig_code.nsig_function = 'decrypt_signatures'
sig_code.nsig_function_args = 'n, sp, sig'
sig_code.player_id = player_id;
console.log(JSON.stringify(sig_code));
