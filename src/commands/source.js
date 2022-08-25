const { SlashCommandBuilder, hyperlink, italic, inlineCode, hideLinkEmbed } = require('discord.js');
const { Octokit } = require('@octokit/core');
const { githubPersonalAccessToken } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('source')
		.setDescription('Returns the latest source .zip')
		.addUserOption(option =>
			option
				.setName('target')
				.setDescription('User to mention')),
	async execute(interaction) {
		const octokit = new Octokit({
			auth: githubPersonalAccessToken,
		});

		const latestRelease = await octokit.request('GET /repos/{owner}/{repo}/zipball/{ref}', {
			owner: 'zayKenyon',
			repo: 'VALORANT-rank-yoinker',
			ref: 'main',
		});

		const target = interaction.options?.getUser('target');
		if (!target) {
			return await interaction.reply({
				content: `${hyperlink('Source .zip', latestRelease.url)}\n• Download ${hyperlink('Python 3.10', hideLinkEmbed('https://www.python.org/downloads/release/python-3100'))} and add it to PATH during installation\n• Download the source.zip ^^\n• Open a terminal within the source folder\n• ${inlineCode('pip install -r requirements.txt')}\n• ${inlineCode('main.py')}`,
			});
		}

		await interaction.reply({
			content: `${italic(`Zip for ${target}`)}:\n${hyperlink('Source .zip', latestRelease.url)}\n• Download ${hyperlink('Python 3.10', hideLinkEmbed('https://www.python.org/downloads/release/python-3100'))} and add it to PATH during installation\n• Download the source.zip ^^\n• Open a terminal within the source folder\n• ${inlineCode('pip install -r requirements.txt')}\n• ${inlineCode('main.py')}`,
		});
	},
};
