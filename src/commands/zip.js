const { SlashCommandBuilder, hyperlink, italic } = require('discord.js');
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

		const releaseName = latestRelease.data.assets[0].name;
		const releaseLink = latestRelease.data.assets[0].browser_download_url;

		const target = interaction.options?.getUser('target');
		if (!target) {
			return await interaction.reply(hyperlink(releaseName, releaseLink));
		}

		await interaction.reply({
			content: `${italic(`Zip for ${target}`)}:
${hyperlink(releaseName, releaseLink)}`,
		});
	},
};
