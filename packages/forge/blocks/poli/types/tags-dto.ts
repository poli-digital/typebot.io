interface TagAttributes {
	name: string;
	description: string;
	color: string;
}

interface TagMetadata {
	deprecated_customer_id: number;
	created_at: string;
	updated_at: string;
}

export interface TagDTO {
	uuid: string;
	status: 'ACTIVE' | 'INACTIVE';
	category: 'DEFAULT';
	attributes: TagAttributes;
	contacts: number;
	metadata: TagMetadata;
}
