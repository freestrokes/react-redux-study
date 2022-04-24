export interface MenuType {
	index: number;
	tab: string;
	content: any;
};

export interface PostParam {
	keyword: string;
	page: number;
	size: number;
};

export interface Post {
	userId: number;
	id: number;
	title: string;
	body: string;
};

export interface PostCreateParam {
	userId: number;
	title: string;
	body: string;
};

export interface PostUpdateParam {
	userId: number;
	title: string;
	body: string;
};
