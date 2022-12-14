const { InteractionType, inlineCode, italic, bold, hideLinkEmbed } = require('discord.js');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {

		if (interaction.type === InteractionType.ApplicationCommand) {
			const command = interaction.client.commands.get(interaction.commandName);
			if (!command) return;

			if (interaction.commandName !== 'faq') {
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

			else {
				// eslint-disable-next-line no-inner-declarations
				async function faqFunction() {
					if (target) {
						return `${italic(`${choice} for ${target}`)}\n`;
					}
					else {
						return '';
					}
				}
				const choice = interaction.options.getString('query');
				const target = interaction.options?.getUser('target');

				if (choice === 'ban') {
					await interaction.reply(`${await faqFunction()}As of version 2, the program is not bannable.
However, all third tools are used ${bold('at your own risk.')}`);
				}

				else if (choice === 'dll') {
					await interaction.reply(`${await faqFunction()}Create a new folder anywhere on your PC (/Desktop is recommended). Then unzip all contents of the vRY folder in there. vRY.exe needs to be inside the folder alongside the other files!
(If you want to launch the file from elsewhere then you need to make a shortcut!)`);
				}

				else if (choice === 'skins') {
					await interaction.reply(`${await faqFunction()}Running ${inlineCode('vry.exe --config')} will prompt you with the config option where you change the weapon to show. Or, within your ${inlineCode('config.json')} file, change the weapon to whichever one you desire. If you wish to see a player's entire inventory, visit: ${hideLinkEmbed('https://vry.netlify.app/matchLoadouts')}`);
				}

				else if (choice === 'win-error') {
					await interaction.reply(`${await faqFunction()}This may be because the port vRY uses (${inlineCode('1100')}) is already in use.\n\nStart off by checking your firewall settings to see if it is being blocked, temporarily disabling your firewall will confirm this.\n\nIf needed, you could then try to restart: vRY, but if that doesn't fix it then VALORANT, but then if that doesn't fix it then your computer.\n\nIf you have a slower internet connection then changing the value of ${inlineCode('cooldown')}) located in ${inlineCode('config.json')} to 0 (manual refresh) or to something > 1 may help.\n\nIf that doesn't work then changing the port located within the ${inlineCode('config.json')} file may work.`);
				}
			}
		}

		else if (interaction.isAutocomplete()) {
			if (interaction.commandName === 'faq') {
				const focusedValue = interaction.options.getFocused();
				const choices = ['ban', 'dll', 'skins', 'win-error'];
				const filtered = choices.filter(choice => choice.startsWith(focusedValue));
				await interaction.respond(
					filtered.map(choice => ({ name: choice, value: choice })),
				);
			}
		}
	},
};
