import { ApplyOptions } from '@sapphire/decorators';
import { type CommandOptions, Command, ChatInputCommand } from '@sapphire/framework';
import { CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';
import { IkeaAPI } from '../lib/constants';
@ApplyOptions<CommandOptions>({
	description: 'Search the API!'
})
export class UserCommand extends Command {
	public async chatInputRun(interaction: CommandInteraction) {
		const productId: any = interaction.options.getString('productid');
		const countryCode: any = interaction.options.getString('countrycode');
		const res = await IkeaAPI.get(countryCode, productId)
		const row = new MessageActionRow()
		.addComponents(
			new MessageButton()
			.setLabel("View on the website.")
			.setStyle("LINK")
			.setURL(`${process.env.WEB_DOMAIN}/${productId}?country=${countryCode}`)
		)
		const embed = new MessageEmbed()
		.setTitle("IkeaStock")
		.setDescription("This is the stock infomation")
		.setColor("GREEN")
		.setFooter({text: `ProductId: ${productId}`})
		.setTimestamp()
		res.map((val) => {
			if (val.availableStocks == undefined) {
				return
			}
			if(val.store == undefined) {
			}
			embed.addField(val.store.name, `${val.availableStocks.quantity}`, true)
			return
		})
		interaction.reply({embeds: [embed], components: [row]})
	}
	public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
		registry.registerChatInputCommand((builder) =>
		  builder
		  .setName(this.name)
		  .setDescription(this.description)
		  .addStringOption((option) =>
		  	option
				.setName('productid')
				.setDescription("What is the Product ID?")
				.setRequired(true)
		  )
		  .addStringOption((option) =>
			option
				.setName('countrycode')
				.setDescription('What country do you want to check? (You can check the site for the list!)')	
				.setRequired(true)
		  )
		);
	  }
	
}
