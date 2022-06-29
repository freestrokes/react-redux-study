export interface BoardSearchParam {
	keyword: string;
	page: number;
	size: number;
};

export interface CreateBoardParam {
	title: string;
	body: string;
	userId: number;
};

export interface UpdateBoardParam {
	id: number;
	title: string;
	body: string;
	userId: number;
};
