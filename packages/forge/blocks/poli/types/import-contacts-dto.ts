export interface ImportContactsDTO {
	uuid: string;
	status: string;
	category: string;
	attributes: Attributes;
	contacts: number;
	metadata: Metadata;
}

interface Attributes {
	name: string;
	description: string;
	color: string;
}

interface Metadata {
	deprecated_tag_id: number;
	deprecated_customer_id: number;
	created_at: string;
	updated_at: string;
}
