import { Innertube, Platform, Types } from 'youtubei.js'

let sig_code;
Platform.shim.eval = async (data: Types.BuildScriptResult, env: Record<string, Types.VMPrimative>) => {
  const properties = [];

  if(env.n) {
    properties.push(`n: exportedVars.nFunction("${env.n}")`)
  }

  if (env.sig) {
    properties.push(`sig: exportedVars.sigFunction("${env.sig}")`)
  }

  const code = `${data.output}\nreturn { ${properties.join(', ')} }`;

  sig_code = data;
  return new Function(code)();
}
let innertube
let player_id
const args = process.argv.slice(2)
if (args.length === 0) {
innertube = await Innertube.create({'client': 'TV', 'lang': 'en'})
player_id = innertube.session.player.player_id
} else {
player_id = args[0];
innertube = await Innertube.create({'client': 'TV', 'lang': 'en', 'player_id': player_id})
};
var video_id = 'jNQXAC9IVRw'
var info = await innertube.getStreamingData(video_id, '')
sig_code.player_id = player_id;
console.log(JSON.stringify(sig_code));
