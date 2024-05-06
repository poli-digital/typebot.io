interface TemplateMetadata {
	deprecated_customer_id: number;
	created_at: string;
	updated_at: string;
}

export interface TemplateDTO {
	uuid: string;
	key: string;
	version: string;
	status: 'VALIDATED' | 'PENDING' | 'REJECTED';
	message: string;
	team: null | string;
	variables: TemplateVariablesDTO[];
	metadata: TemplateMetadata;
}

export interface TemplateVariablesDTO {
	name: string;
	type: string;
}
