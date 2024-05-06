import type { MessageACK } from './message-dto';

export interface Page<T> {
	data: T[];
	meta?: {
		next_page_url: string;
		current_page: number;
		last_page: number;
	};
}

export interface RequestParams {
	order?: string;
	include?: string;
	page?: number;
	search?: string;
}

export interface WebhookEventReceived<T> {
	object: EventObject;
	event: EventType;
	account_uuid?: string;
	uuid?: string;
	value?: T;
	status?: MessageACK | string;
	changes?: Partial<T>;
}

export interface WebhookEventReceivedForStatusUpdate<T> {
	object: EventObject;
	event: EventType;
	account_uuid?: string;
	uuid?: string;
	status?: T;
}

type EventObject = 'message' | 'contact' | 'chat' | 'user' | 'account';
type EventType = 'created' | 'updated' | 'deleted' | 'received' | 'sent';
