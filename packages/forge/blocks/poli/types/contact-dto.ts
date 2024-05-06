import type { AccountDTO } from './account-dto';
import type { ChannelProviderEnum } from './enums/ChannelProviderEnum';
import type { MessageDTO } from './message-dto';
import type { AddressDTO } from './shared/address';
import type { UserDTO } from './user-dto';

export interface ContactDTO {
	uuid: string;
	type: ContactType;
	read_status: ReadStatus;
	chat_status: ChatStatus;
	attributes: Attributes;
	account: AccountDTO;
	attendant?: UserDTO;
	addresses: AddressDTO[];
	current_chat: null | string;
	last_message?: MessageDTO | null;
	tags: TagDTO[];
	contact_channels: ContactChannel[];
	metadata: Metadata;
}

export type ContactType = 'PERSON' | 'GROUP';

export type ReadStatus = 'READ' | 'UNREAD' | 'NO_CHAT';
export type ChatStatus = 'CHAT_IN_PROGRESS' | 'CHAT_CLOSED' | 'WITHOUT_CHAT';

export interface Attributes {
	name: string;
	email: string;
	phone: string;
	doc: string;
	picture?: {
		url: string;
		mime_type: string;
	};
}

export interface TagDTO {
	uuid: string;
	attributes: {
		name: string;
		color: string;
		description: string;
	};
	assignment: {
		created_at: string;
		updated_at: string;
		deleted_at?: string; //Ainda não está em uso
	};
}

export interface ContactChannel {
	uid: string;
	provider: ChannelProviderEnum;
}

export interface Metadata {
	created_at: string;
	updated_at: string;
	deprecated_customer_id: number;
	deprecated_contact_id: number;
}
