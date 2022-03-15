import React, {useEffect, useState} from 'react';
import TestApiPagination from '@pages/test/api/pagination/test-api-pagination';
import TestApiMenu1Table from '@pages/test/api/menu1/table/test-api-menu1-table';
import {useRecoilValueLoadable} from 'recoil';
import {postsSelectorFamily} from '@services/common/commonState';
import produce from 'immer';
import {Post} from '@typings/test';

function TestApiMenu1() {

	/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	| State Variables
	|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

	const [posts, setPosts] = useState<any>([]);
	const [total, setTotal] = useState(0);
	const [page, setPage] = useState(1);
	const [listSize, setLisSize] = useState(10);
	const [pageSize, setPageSize] = useState(5);
	const [keyword, setKeyword] = useState('');

	const [postParam, setPostParam] = useState({
		keyword: '',
		page: page,
		size: listSize
	});

	const postsLoadable = useRecoilValueLoadable(postsSelectorFamily(postParam));

	/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	| Hooks
	|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

	useEffect(() => {
		setPostParam(produce(postParam, draft => {
			draft.page = page;
		}));
	}, [page]);

	useEffect(() => {
		switch (postsLoadable.state) {
			case 'hasValue':
				console.log('hasValue >>>> ', postsLoadable.contents);
				setPosts(postsLoadable.contents.data);
				setTotal(postsLoadable.contents.headers['x-total-count']);
				break;
			case 'hasError':
				console.log('hasError >>>> ', postsLoadable.contents.message);
				break;
			case 'loading':
				console.log('loading >>>> ', 'Loading...');
				break;
			default:
				break;
		};
	}, [postsLoadable.contents]);

	/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	| Functions
	|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

	/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	| Mark Up
	|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

	return (
		<>
			<div className="wrap-table">
				{/*<!-- Table -->*/}
				<TestApiMenu1Table
					list={posts}
				/>
				{/*<!-- //Table -->*/}
				{/*<!-- Pagination -->*/}
				<TestApiPagination
					total={total}
					listSize={listSize}
					pageSize={pageSize}
					page={page}
					setPage={setPage}
				/>
				{/*<!-- //Pagination -->*/}
			</div>
		</>
	);
};

export default TestApiMenu1;
