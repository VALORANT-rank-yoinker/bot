const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('faq')
		.setDescription('Send an FAQ by name')
		.addStringOption(option =>
			option
				.setName('query')
				.setDescription('FAQ name')
				.setRequired(true)
				.setAutocomplete(true))
		.addUserOption(option =>
			option
				.setName('target')
				.setDescription('User to mention')),
};
