const Discord = require('discord.js');
const modelhelper = require('./modelhelper');

class EmbedHelper {

	constructor() {
        this.GAME_COLOR = null;
        this.GAME_CREATOR = null;
        this.GAME_TITLE = null;
        this.GAME_ICON = null;
        this.SERVER_ICON = null;

        this.BORDER = "-".repeat(50);
    }

    gameData(user, title, icon) {
        this.GAME_CREATOR = user;
        this.GAME_TITLE = title;
        this.SERVER_ICON = icon;
        this.GAME_ICON = modelhelper.getRamdomModel();
        this.GAME_COLOR = modelhelper.getColor(this.GAME_ICON);

        return this;
    }

    messageTemplate(description) {
        let attachment = new Discord.MessageAttachment(`./assets/models/${this.GAME_ICON}`, this.GAME_ICON);

        let embed = new Discord.MessageEmbed()
            .setColor(this.GAME_COLOR)
            .setTitle(this.GAME_TITLE)
            .setDescription([this.BORDER, '', description, '', this.BORDER].join('\n'))
            .attachFiles(attachment)
            .setThumbnail(`attachment://${this.GAME_ICON}`)
            .setTimestamp()
            .setFooter(`Game started by ${this.GAME_CREATOR}`, this.SERVER_ICON);

        return embed;
    }

    startGameEmbed() {
        let start_embed = this.messageTemplate([
            'Game is now started.',
            'Please join in the voice channel and', 
            'in the room using the provided code.'
        ].join('\n'));

        return start_embed;
    }

    muteEmbed() {
        let mute_embed = this.messageTemplate([
            'All players are now muted.',
            'Do your tasks and watch out for **impostors**.',
        ].join('\n'));

        return mute_embed;
    }

    unmuteEmbed() {
        let unmute_embed = this.messageTemplate([
            'Alive players are now unmuted.',
            'The discussion will now start.',
            'Find and lynch the **impostors**.'
        ].join('\n'));

        return unmute_embed;
    }

    endGameEmbed() {
        let end_embed = this.messageTemplate([
            'Game Session now ended.',
            'All players will now be unmuted.'
        ].join('\n'));

        return end_embed;
    }
}

module.exports = new EmbedHelper();
