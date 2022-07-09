import { ApplyOptions } from '@sapphire/decorators';
import { type CommandOptions, Command, ChatInputCommand } from '@sapphire/framework';
import type { CommandInteraction } from 'discord.js';
@ApplyOptions<CommandOptions>({
	description: 'Invite me!',
	name: 'invite'
})
export class UserCommand extends Command {
	public async chatInputRun(interaction: CommandInteraction) {
        interaction.reply(`Invite me using [this url](${process.env.WEB_DOMAIN}/discordBot/invite)`)
	}
	public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
		registry.registerChatInputCommand((builder) =>
		  builder
		  .setName(this.name)
		  .setDescription(this.description)
		);
	  }
}
