export type AddressDTO = {
	uuid: string;
	type: string;
	country: string;
	postal_code: string;
	state: string;
	city: string;
	street: string;
	number: string;
	neighborhood: string;
	complement: string;
	reference: string;
	metadata: AddressMetadata;
};

export type AddressMetadata = {
	created_at: Date;
	updated_at: Date;
};
