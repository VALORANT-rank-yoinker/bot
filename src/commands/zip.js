const { SlashCommandBuilder, hyperlink } = require('discord.js');
const { Octokit } = require('@octokit/core');
const { githubPersonalAccessToken } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('zip')
		.setDescription('Returns the latest bundled .zip')
		.addUserOption(option =>
			option
				.setName('target')
				.setDescription('User to mention')),
	async execute(interaction) {
		const octokit = new Octokit({
			auth: githubPersonalAccessToken,
		});

		const latestRelease = await octokit.request('GET /repos/{owner}/{repo}/releases/latest', {
			owner: 'zayKenyon',
			repo: 'VALORANT-rank-yoinker',
		});

		await interaction.reply({
			content: hyperlink(latestRelease.data.assets[0].name, latestRelease.data.assets[0].browser_download_url),
		});
	},
};
