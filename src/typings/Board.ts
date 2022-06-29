export interface boardSearchParam {
	keyword: string;
	page: number;
	size: number;
};

export interface createBoardParam {
	title: string;
	body: string;
	userId: number;
};

export interface updateBoardParam {
	id: number;
	title: string;
	body: string;
	userId: number;
};
