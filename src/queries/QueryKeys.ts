export const boardKeys = {
	all: ['board'] as const,
	list: () => [...boardKeys.all, 'list'] as const,
	detail: () => [...boardKeys.all, 'detail'] as const,
	create: () => [...boardKeys.all, 'create'] as const,
	update: () => [...boardKeys.all, 'update'] as const,
	delete: () => [...boardKeys.all, 'delete'] as const,
	listWithParam: () => [...boardKeys.all, 'listWithParam'] as const,
	detailWithParam: () => [...boardKeys.all, 'detailWithParam'] as const,
	createWithParam: () => [...boardKeys.all, 'createWithParam'] as const,
	// list: (filters: string) => [...boardKeys.lists(), { filters }] as const,
	// detail: (id: number) => [...boardKeys.details(), id] as const,
}
