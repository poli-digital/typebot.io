import type { UserDTO } from './user-dto';

export type TeamDTO = {
	uuid: string;
	key: string;
	status: 'ACTIVE' | 'INACTIVE';
	visibility: 'PUBLIC' | 'PRIVATE';
	staging: 'ENTRYPOINT' | 'REQUESTED';
	attributes: TeamAttributes;
	users: UserDTO[];
	metadata: TeamMetadata;
};

export type TeamAttributes = {
	name: string;
	description: string;
};

export type TeamMetadata = {
	deprecated_department_id?: number;
	deprecated_customer_id?: number;
	created_at: Date;
	updated_at: Date;
};
