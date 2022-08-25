const { InteractionType, inlineCode, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const { todoChannelId } = require('../config.json');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {

		if (interaction.type === InteractionType.ApplicationCommand && !interaction.isContextMenuCommand()) {

			const command = interaction.client.commands.get(interaction.commandName);
			if (!command) return;

			try {
				await command.execute(interaction);
			}
			catch (error) {
				console.error(error);
				await interaction.reply({
					content: 'There was an error while executing this command!',
					ephemeral: true,
				});
			}
		}

		else if (interaction.type === InteractionType.ModalSubmit) {
			if (interaction.customId === 'todo-modal-add') {
				const todoInput = interaction.fields.getTextInputValue('todo-input-add');

				await interaction.client.channels.cache.get(todoChannelId)
					.send({
						content: `ToDo: ${todoInput}`,
					});

				await interaction.reply({
					content: `Added: ${inlineCode(todoInput)}`,
					ephemeral: true,
				});
			}

			if (interaction.customId === 'todo-modal-edit') {
				const todoInput = interaction.fields.getTextInputValue('todo-input-edit');

				const todoChannel = await interaction.client.channels.cache.get(todoChannelId);
				const toDoMessages = await todoChannel.messages
					.fetch()
					.then(messages => messages.filter(m => m.content === 'Editing ToDo...'));

				await toDoMessages.first()
					.edit(`ToDo: ${todoInput}`);

				await interaction.reply({
					content: `Edited to: ${inlineCode(todoInput)}`,
					ephemeral: true,
				});
			}
		}

		else if (interaction.isContextMenuCommand()) {
			if (interaction.commandName === 'Edit ToDo') {
				if (interaction.targetMessage.author.id !== interaction.client.application.id) {
					interaction.reply({
						content: 'I cannot edit this message.',
						ephemeral: true,
					});
				}

				const todoModal = new ModalBuilder()
					.setCustomId('todo-modal-edit')
					.setTitle('Edit ToDo');

				const todoInput = new TextInputBuilder()
					.setCustomId('todo-input-edit')
					.setLabel('✏️ ToDo')
					.setStyle(TextInputStyle.Paragraph)
					.setMinLength(3)
					.setRequired(true);

				const firstActionRow = await new ActionRowBuilder().addComponents([todoInput]);
				await todoModal.addComponents([firstActionRow]);

				await interaction.showModal(todoModal);

				await interaction.targetMessage
					.edit('Editing ToDo...');
			}
		}
	},
};
