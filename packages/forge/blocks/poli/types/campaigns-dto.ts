export interface CampaignDTO {
	uuid: string;
	attributes: CampaignAttributes;
	template: CampaignTemplate;
	account_channel: AccountChannel;
	tag: Tag;
	settings: CampaignSettings;
	metadata: CampaignMetadata;
}

interface CampaignAttributes {
	name: string;
	description: string;
}

interface CampaignTemplate {
	uuid: string;
	key: string;
	status: string;
	message: string;
}

interface AccountChannel {
	uuid: string;
	uid: string;
	name: string;
	status: string;
	provider: string;
}

interface Tag {
	uuid: string;
}

interface CampaignSettings {
	end: number;
	mode: string;
	start: number;
	targets: CampaignTarget[];
	open_new_chat: boolean;
	allowed_sending_times: AllowedSendingTime[];
	send_if_has_active_chat: boolean;
}

interface CampaignTarget {
	tags: string[];
	users: string[];
}

interface AllowedSendingTime {
	days: string[];
	hours: HourRange[];
}

interface HourRange {
	end: string;
	start: string;
}

interface CampaignMetadata {
	deprecated_campaign_id?: number;
	created_at: Date;
	updated_at: Date;
}
