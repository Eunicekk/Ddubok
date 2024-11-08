export interface ICardProps {
	width: number;
	height: number;
	image?: string;
	content?: string;
	effect?: number;
	flip?: boolean;
}

export interface ICardDto {
	id?: number;
	content?: string;
	openedAt?: string;
	path: string;
	state?: string;
	writerName?: string;
	isRead?: boolean;
}

export interface IDetailCardDto extends ICardDto {
	width?: number;
	height?: number;
	effect?: number;
	flip?: boolean;
}

export interface IReportProps {
	cardId: number;
	title: string;
	reportType: string;
	content: string;
}

export interface IPreviewCardDto {
	nickname: string;
	cardUrl: string[];
}