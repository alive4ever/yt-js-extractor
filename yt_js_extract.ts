import { Innertube } from 'youtubei.js'

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
const sig_code = innertube.session.player.data
sig_code.player_id = player_id;
console.log(JSON.stringify(sig_code));
