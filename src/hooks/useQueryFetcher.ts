import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';

// useQuery Generics
// ex)
// function useGroups() {
// 	return useQuery<Group[], Error>('groups', fetchGroups)
// }
// TQueryFnData: queryFn에서 반환된 타입. ex) Group[]
// TError: queryFn에서 예상되는 오류 타입. ex) Error | AxiosError
// TData: 데이터 프로퍼티가 갖게 될 타입. (기본값은 queryFn이 반환하는 타입)
// TQueryKey: queryKey 타입.

export default function useQueryFetcher<TData = any>(
	queryKey,
	queryFn,
	options?: UseQueryOptions<TData, AxiosError, TData>
): UseQueryResult<TData, AxiosError> {
	return useQuery(
		queryKey,
		queryFn,
		options
	);
};
