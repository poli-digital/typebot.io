import type { ChannelProviderEnum } from './enums/ChannelProviderEnum';

export interface AccountChannelDTO {
	uuid: string;
	uid: string;
	name: string;
	status: 'ACTIVE' | 'INACTIVE';
	provider: ChannelProviderEnum;
	integrator: ChannelIntegrator;
	config?: any;
	metadata?: Metadata;
}

type ChannelIntegrator = 'POLI' | 'INTERNAL' | 'ZAPI' | 'CLOUD_API';

interface Metadata {
	external_connection_status: string;
	deprecated_customer_id: number;
	deprecated_account_channel_id: number;
	display_on_webchat: boolean;
	created_at: Date;
	updated_at: Date;
}
