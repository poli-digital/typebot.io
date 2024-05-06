import type { AccountChannelDTO } from './account-channel-dto';
import type { ContactDTO } from './contact-dto';
import type { MessageDTO } from './message-dto';
import type { UserDTO } from './user-dto';

export interface AttendanceDTO {
	uuid: string;
	status: AttendanceStatus;
	type: AttendanceType;
	closed_reason: AttendanceClosedReason;
	participants: [];
	account_channel: AccountChannelDTO;
	attendant: UserDTO;
	contact: ContactDTO;
	messages: MessageDTO[];
	metadata: {
		deprecated_attendance_id: number;
		created_at: string;
		updated_at: string;
	};
}

export type AttendanceClosedReason =
	| 'OLD'
	| 'FINISHED_BY_USER'
	| 'FORWARDED'
	| 'CONTACT_DELETED'
	| 'TIMEOUT'
	| 'FINISHED_BY_SYSTEM'
	| 'FINISHED_BY_DISTRIBUTION'
	| 'FINISHED_OPENING_NEW_ATTENDANCE';

export type AttendanceStatus = 'CLOSED' | 'IN_PROGRESS' | 'QUEUE';

export type AttendanceType =
	| 'INITIATED_BY_CONTACT'
	| 'INITIATED_BY_BUSINESS'
	| 'INITIATED_BY_FORWARDING';
