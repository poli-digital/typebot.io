import type { AddressDTO } from './shared/address';

export interface AccountDTO {
	uuid: string;
	attributes: Attributes;
	addresses: AddressDTO[];
	metadata: Metadata;
}

interface Attributes {
	name: string;
	segment: string;
	doc: string;
	picture: Picture;
	phone: string;
	site: string;
}

interface Picture {
	file_id: string;
}

interface Metadata {
	created_at: Date;
	updated_at: Date;
}
