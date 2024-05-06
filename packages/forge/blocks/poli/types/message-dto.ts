import type { AccountChannelDTO } from './account-channel-dto';
import type { ContactDTO } from './contact-dto';
import type { ChannelProviderEnum } from './enums/ChannelProviderEnum';

export type Author = {
	type: string;
	uuid: string;
	attributes: {
		name: string;
		picture?: {
			url: string;
		};
	};
};

export type MessageDTO = {
	uuid?: string;
	event?: MessageEvents;
	type: MessageTypes;
	provider?: ChannelProviderEnum;
	account_channel_uuid?: string;
	account_channel?: AccountChannelDTO;
	version: 'v3';
	direction?: 'IN' | 'OUT' | 'SYSTEM';
	ack?: MessageACK;
	timestamp?: number;
	template?: Template;
	author?: Author;
	contact?: ContactDTO;
	context?: Context;
	preview?: Preview[];
	components?: Components;
	interactive?: Interactive[];
	metadata?: Metadata;
};

export type MessageEvents = 'MESSAGE' | 'HISTORY' | 'SYSTEM' | 'CALL';

export type MessageACK =
	| 'ERROR'
	| 'CREATED'
	| 'QUEUED_BY_PROVIDER'
	| 'RECEIVED_BY_PROVIDER'
	| 'RECEIVED_BY_CLIENT'
	| 'READ_BY_CLIENT'
	| 'AUDIO_LISTENED'
	| 'UNDEFINED'
	| 'UNKNOWN';

export type MessageTypes =
	| 'TEXT'
	| 'CHAT'
	| 'LOCATION'
	| 'VCARD'
	| 'MULTI_VCARD'
	| 'AD_REPLY'
	| 'UNSUPPORTED'
	| 'TEMPLATE'
	| 'PRODUCT'
	| 'PAYMENT_LINK'
	| 'LINK'
	| 'AUDIO'
	| 'PTT'
	| 'VIDEO'
	| 'CALL_VIDEO'
	| 'CALL_MISSED_VIDEO'
	| 'CALL_MISSED_VOICE'
	| 'CALL_VOICE'
	| 'DOCUMENT'
	| 'STICKER'
	| 'IMAGE'
	| 'MEDIA'
	| 'MEDIA_URL'
	| 'MEDIA_DEPRECATED'
	| 'CHAT_CLOSED'
	| 'CHAT_REDIRECTED'
	| 'CONTACT_UPDATED'
	| 'DEPRECATED_CONTACT_UPDATED'
	| 'REACTION'
	| 'NOTIFICATION'
	| 'UNDEFINED';

export type Template = {
	uuid: string;
	key: string;
	status: string;
	message: string;
};

export type Context = {
	type: string;
	message?: MessageDTO;
	ad?: {
		title: string;
		body: string;
		thumbnailUrl: string;
		sourceId: string;
		sourceUrl: string;
	};
	story?: {
		url: string;
		mimetype: string;
		type: string;
	};
	payment_link?: {
		reference_type: string;
		reference_id: number;
		link: string;
		picture: string;
		description: string;
		value: string;
	};
};

export type Preview = {
	type: string;
	website?: {
		link: string;
	};
};

export type Interactive = {
	type: string;
	action: string;
};

export type Attachment = {
	type: MessageTypes;
	product?: Media;
	media?: Media;
	deprecated_media?: Media;
	document?: Media;
	link?: Media;
	video?: Media;
	image?: Media;
	sticker?: Media;
	audio?: Media;
	ptt?: Media;
	location?: Location;
	vcard?: string;
	multi_vcard?: string;
};

export type Media = {
	id?: string;
	url?: string;
	mime_type?: string;
	uploaded?: boolean;
	file_id?: string;
	caption?: string;
};

export type Location = {
	latitude: string;
	longitude: string;
	name?: string;
};

export type Components = {
	header?: {
		text: string;
		parameters?: Parameters[];
	};
	body?: {
		text: string;
		parameters?: Parameters[];
	};
	footer?: {
		text: string;
		parameters?: Parameters[];
	};
	attachments?: Attachment[];
};

export type Parameters = {
	type: string;
	text?: string;
	date_time?: string;
	currency?: string;
	variable?: string;
};

export type Metadata = {
	deprecated_customer_id?: number;
	deprecated_message_id?: number;
	direction: string;
	created_at: string;
	updated_at?: string;
};
