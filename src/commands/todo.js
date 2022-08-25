const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { todoChannelId } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('todo')
		.setDescription('Series of commands for the ToDo function')
		.addSubcommand(subcommand =>
			subcommand
				.setName('add')
				.setDescription('Adds a ToDo')
				.addStringOption(option =>
					option
						.setName('todo')
						.setDescription('The ToDo')
						.setRequired(true))
				.addAttachmentOption(option =>
					option
						.setName('attachment')
						.setDescription('Related resource')))
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

	async execute(interaction) {
		if (interaction.options.getSubcommand() === 'add') {

			const todoInput = interaction.options?.getString('todo');
			const fileInput = interaction.options?.getAttachment('attachment');

			await interaction.client.channels.cache.get(todoChannelId)
				.send({
					content: `ToDo: ${todoInput}`,
					files: [fileInput],
				});
		}
	},
};
