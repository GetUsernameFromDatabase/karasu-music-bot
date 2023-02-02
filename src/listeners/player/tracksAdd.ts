import { container, Listener } from '@sapphire/framework';
import { PermissionsBitField } from 'discord.js';

export class PlayerEvent extends Listener {
	public constructor(context: Listener.Context, options: Listener.Options) {
		super(context, {
			...options,
			emitter: container.client.player,
			event: 'tracksAdd'
		});
	}

	public run(queue, track) {
		const resolved = new PermissionsBitField([PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel]);
		const missingPerms = queue.metadata.channel.permissionsFor(queue.metadata.client).missing(resolved);
		if (missingPerms.length) return;

		queue.metadata.channel.send(
			`${container.client.dev.success} | Enqueued multiple tracks from: **${track[0].playlist?.title || 'Unknown Playlist'}**`
		);
	}
}