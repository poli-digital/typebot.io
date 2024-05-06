import type { AccountDTO } from './account-dto';
import type { AddressDTO } from './shared/address';
import type { TeamDTO } from './team-dto';

export type UserDTO = {
	uuid: string;
	status: 'ONLINE' | 'OFFLINE';
	status_of_service: StatusOfService;
	email: string;
	attributes: UserAttributes;
	active_account: AccountDTO;
	accounts: AccountDTO[];
	teams: TeamDTO[];
	addresses: AddressDTO[];
	metadata: UserMetadata;
};

export type UserAttributes = {
	name: string;
	phone?: string;
	doc?: string;
	picture?: {
		url?: string;
		mime_type?: string;
	};
};

export type UserMetadata = {
	deprecated_user_id?: number;
	created_at: Date;
	updated_at: Date;
};

export enum StatusOfService {
	AVAILABLE = 'AVAILABLE',
	UNAVAILABLE = 'UNAVAILABLE',
}
