import { AxiosError } from 'axios';
import {
	useMutation,
	UseMutationOptions,
	UseMutationResult,
} from 'react-query';

export default function useQueryMutator<TData = any>(
	mutationKey,
	mutationFn,
	options?: UseMutationOptions<TData, AxiosError, TData>
): UseMutationResult<TData, AxiosError, TData> {
	return useMutation(
		mutationKey,
		mutationFn,
		options
	);
};
