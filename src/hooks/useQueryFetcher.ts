import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
// import { queryFunctions } from '@services';
// import { TodoType } from 'src/types/todoType';
// import { queryKeys } from 'src/types/commonType';

export default function useQueryFetcher<TData>(
	queryKey,
	queryFn,
	options?: UseQueryOptions<TData, AxiosError, TData>
): UseQueryResult<TData, AxiosError> {
	return useQuery(queryKey, queryFn, options);
}
