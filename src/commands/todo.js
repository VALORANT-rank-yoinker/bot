const { SlashCommandBuilder, PermissionFlagsBits, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('todo')
		.setDescription('Series of commands for the ToDo function')
		.addSubcommand(subcommand =>
			subcommand
				.setName('add')
				.setDescription('Adds a ToDo'))
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

	async execute(interaction) {
		if (interaction.options.getSubcommand() === 'add') {

			const todoModal = new ModalBuilder()
				.setCustomId('todo-modal-add')
				.setTitle('Add ToDo');

			const todoInput = new TextInputBuilder()
				.setCustomId('todo-input-add')
				.setLabel('✏️ ToDo')
				.setStyle(TextInputStyle.Paragraph)
				.setMinLength(3)
				.setRequired(true);

			const firstActionRow = await new ActionRowBuilder().addComponents([todoInput]);
			await todoModal.addComponents([firstActionRow]);

			await interaction.showModal(todoModal);
		}
	},
};
