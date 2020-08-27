const env = require('dotenv').config();

class Amongity {

	constructor() {
		this.CLIENT = null;
		this.TEXT_CHANNEL = null;
		this.VOICE_CHANNEL = null;

		this.GAME_SESSION_ACTIVE = false;
		
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

	sendMessage(msg) {
		this.CLIENT.channels.cache.get(this.TEXT_CHANNEL).send(msg);
	}

	startGame(channel, voice) {
		this.GAME_SESSION_ACTIVE = true;

		this.TEXT_CHANNEL = channel;
		this.VOICE_CHANNEL = voice;

		this.sendMessage("Game is now started.\nPlease join in the voice " +
			"channel and in the room using the provided code.");
	}

	endGame() {
		this.GAME_SESSION_ACTIVE = false;
		this.clearDeadData();
		this.unmuteAlivePlayers();

		this.sendMessage("Game Session now ended.");
		this.sendMessage("All players will now be unmuted. Feel free to discuss your regrets and failures.");
	}

	addDeadPlayer(user_id) {
		let dead_msg = `Player <@!${user_id}> is now dead. Do not lose hope.`; 
		let dead_crew = "If you are a **survivor**, please do your task even as a ghost.";
		let dead_imp = "If you are an **imposter**, you can help your teammate by using sabotage.";
		
		this.dead.push(user_id);
		this.sendMessage([dead_msg, dead_crew, dead_imp].join('\n'));
	}

	muteAllPlayers() {
		let channel = this.CLIENT.channels.cache.get(this.VOICE_CHANNEL);
		let members = channel.members;

		for (let [memberID, member] of  members) {
			member.voice.setMute(true)
		}

		this.sendMessage("All players are now muted.")
	}

	unmuteAlivePlayers() {
		let channel = this.CLIENT.channels.cache.get(this.VOICE_CHANNEL);
		let members = channel.members;

		for (let [memberID, member] of  members) {
			if (!this.dead.includes(memberID)) {
				member.voice.setMute(false)
			}
		}

		this.sendMessage("Alive players are now unmuted. \nThe discussion will now start. \nFind and lynch the **impostors**.")
	}

	helpCommands() {
		let help = [
			"```",
			"===================COMMANDS===================",
			"",
			"/start /startgame",
			"- Create a new game session",
			"",
			"/end /endgame",
			"- Ends the current game session",
			"",
			"/task /mute",
			"- Mute all players in the active voice channel.",
			"",
			"/talk /unmute",
			"- Unmute all alive players in the active voice channel.",
			"",
			"/dead",
			"- Add player to the dead list. ",
			"  They will not be unmuted during discussions",
			"",
			"==============================================",
			"```"
		];

		return help.join('\n');
	}
}

module.exports = new Amongity();