const { SlashCommandBuilder, hyperlink, italic } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('website')
		.setDescription('Returns the companion website')
		.addUserOption(option =>
			option
				.setName('target')
				.setDescription('User to mention')),
	async execute(interaction) {
		const target = interaction.options?.getUser('target');
		if (!target) {
			return await interaction.reply(`${hyperlink('Companion website', 'https://vry.netlify.app/matchLoadouts')}`);
		}

		await interaction.reply(`${italic(`${hyperlink('Companion website', 'https://vry.netlify.app/matchLoadouts')} for ${target}`)}`);
	},
};
