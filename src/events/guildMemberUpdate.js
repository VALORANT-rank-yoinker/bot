module.exports = {
	name: 'guildMemberUpdate',
	async execute(oldMember, newMember) {
		if (oldMember.pending === true && newMember.pending !== true) {

			//	@Verified: 966799898852872302
			await newMember.roles.add('966799898852872302');
		}
	},
};
