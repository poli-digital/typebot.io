export interface AttendantDTO {
	uuid: string;
	attributes: AttendantAttributes;
	metadata: AttendantMetadata;
}

interface AttendantAttributes {
	name: string;
}

interface AttendantMetadata {
	deprecated_user_id?: number;
	created_at: Date;
	updated_at: Date;
}
