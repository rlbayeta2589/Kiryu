const embedhelper = require('./embedhelper');

class Amongity {

	constructor() {
		this.CLIENT = null;
		this.TEXT_CHANNEL = null;
		this.VOICE_CHANNEL = null;

		this.GAME_SESSION_ACTIVE = false;
		this.PLAYERS_MUTED = false;
		this.GAME_TITLE = "AmongUs Game";
		
		this.players = [];
		this.dead = [];
		this.lynched = [];
		this.framed = [];
	}

	bindClient(client) {
		this.CLIENT = client;
	}

	isGameActive() {
		return this.GAME_SESSION_ACTIVE;
	}

	clearDeadData() {
		this.dead = [];
		this.lynched = [];
		this.framed = [];
	}

	getDefaultTitle() {
		return this.GAME_TITLE;
	}

	sendMessage(msg) {
		return this.CLIENT.channels.cache.get(this.TEXT_CHANNEL).send(msg);
	}

	startGame(channel, voice, icon, user, title) {
		this.GAME_SESSION_ACTIVE = true;
		this.TEXT_CHANNEL = channel;
		this.VOICE_CHANNEL = voice;

		const startEmbed = embedhelper.gameData(user, title, icon).startGameEmbed();
		this.sendMessage(startEmbed).then(async embedMessage => {
			await embedMessage.react('🔊');
			await embedMessage.react('🔇');
			await embedMessage.react('☠️');
			await embedMessage.react('🚫');
		});
	}

	endGame(msg = null) {
		if (!this.GAME_SESSION_ACTIVE) return;

		this.GAME_SESSION_ACTIVE = false;
		this.PLAYERS_MUTED = false;
		this.clearDeadData();
		this.unmuteAlivePlayers(false);

		if (msg != null) {
			msg.edit(embedhelper.endGameEmbed());
		}
	}

	addDeadPlayer(user_id) {
		let dead_msg = `Player <@!${user_id}> is now dead. Do not lose hope.`; 
		let dead_crew = "If you are a **survivor**, please do your task even as a ghost.";
		let dead_imp = "If you are an **imposter**, you can help your teammate by using sabotage.";
		
		this.dead.push(user_id);
		// this.sendMessage([dead_msg, dead_crew, dead_imp].join('\n'));
	}

	muteAllPlayers(msg = null) {
		if (this.PLAYERS_MUTED || !this.GAME_SESSION_ACTIVE) return;

		let channel = this.CLIENT.channels.cache.get(this.VOICE_CHANNEL);
		let members = channel.members;

		for (let [memberID, member] of  members) {
			member.voice.setMute(true)
		}

		if (msg != null) {
			msg.edit(embedhelper.muteEmbed());
		}
		this.PLAYERS_MUTED = true;
	}

	unmuteAlivePlayers(msg = null, display_msg = true) {
		if (!this.PLAYERS_MUTED || !this.GAME_SESSION_ACTIVE) return;

		let channel = this.CLIENT.channels.cache.get(this.VOICE_CHANNEL);
		let members = channel.members;

		for (let [memberID, member] of  members) {
			if (!this.dead.includes(memberID)) {
				member.voice.setMute(false)
			}
		}

		this.PLAYERS_MUTED = false;
		if (display_msg && msg != null) {
			msg.edit(embedhelper.unmuteEmbed());
		}
	}

	helpCommands() {
		let help = [
			"```",
			"===================COMMANDS===================",
			"",
			"/start /startgame",
			"- Create a new game session",
			"  Please react using designated emojis for the game function",
			"  You can customize the game title via '/start <title>'",
			// "",
			// "/end /endgame",
			// "- Ends the current game session",
			// "",
			// "/task /mute",
			// "- Mute all players in the active voice channel.",
			// "",
			// "/talk /unmute",
			// "- Unmute all alive players in the active voice channel.",
			"",
			"/dead",
			"- Manually add player to the dead list. ",
			"  They will not be unmuted during discussions",
			"",
			"==============================================",
			"```"
		];

		return help.join('\n');
	}
}

module.exports = new Amongity();