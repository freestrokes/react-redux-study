import React, {useEffect, useState} from 'react';
import {Volume} from '@typings/volume';
import {Pageable} from '@typings/paging';
import {useHistory} from 'react-router';
import {useAppDispatch, useAppSelector} from '@store/config';
import {ConsoleParam} from '@typings/common';
import {postSelectorFamily, postsSelectorWaitForAll, postsSelectorWaitForNone} from '@services/common/commonState';
import {useRecoilValueLoadable} from 'recoil';
// import {VolumeService} from '@services/volumeService';
// import {CommonConstant} from '@constant/common-constant';
// import Pagination from '@components/pagination/Pagination';
// import {show} from '@store/slices/popupSlice';
// import CreateVolumePopup from '@pages/resource/volume/popup/CreateVolumePopup';
// import SelectBoxSingle from '@components/select-box/SelectBoxSingle';
// import {SelectValue} from '@typings/select';
// import {ListUtil, CommonUtil} from '@utils/commonUtils';
// import produce from 'immer';
// import _ from 'lodash';
// import cn from 'classnames';

// type VolumeScreenState = {
// 	volumeList: Volume[];
// 	selectedVolumeList: Volume[];
// 	allChecked: boolean;
// 	showCreateVolumePopup: boolean;
// 	page: Pageable;
// 	consoleParam: ConsoleParam;
// };

const TestApiMenu2 = () => {

	/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	| States & Variables
	|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

	// const [state, setState] = useState<VolumeScreenState>({
	// 	volumeList: [],
	// 	selectedVolumeList: [],
	// 	allChecked: false,
	// 	showCreateVolumePopup: false,
	// 	page: new Pageable(),
	// 	consoleParam: new ConsoleParam(),
	// });

	// const instanceInfo: object = {};

	/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	| Hooks
	|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

	const history = useHistory();
	const dispatch = useAppDispatch();

	useEffect(() => {
		// init();
	}, []);

	const [postId, setPostId] = useState('0');

	/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	| Functions
	|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

	// waitForAll
	const postsWaitForAllLoadable = useRecoilValueLoadable(postsSelectorWaitForAll);
	let postsWaitForAll = '';
	switch (postsWaitForAllLoadable.state) {
		case 'hasValue':
			postsWaitForAll = JSON.stringify(postsWaitForAllLoadable.contents);
			break;
		case 'hasError':
			postsWaitForAll = postsWaitForAllLoadable.contents.message;
			break;
		case 'loading':
			postsWaitForAll = 'Loading...';
			break;
		default:
			postsWaitForAll = 'Loading...';
	}

	// waitForNone
	const postsWaitForNoneLoadable = useRecoilValueLoadable(postsSelectorWaitForNone);
	let postsWaitForNone = '';
	switch (postsWaitForNoneLoadable.state) {
		case 'hasValue':
			postsWaitForNone = JSON.stringify(postsWaitForNoneLoadable.contents);
			break;
		case 'hasError':
			postsWaitForNone = postsWaitForNoneLoadable.contents.message;
			break;
		case 'loading':
			postsWaitForNone = 'Loading...';
			break;
		default:
			postsWaitForNone = 'Loading...';
	}

	// selectorFamily
	const userLoadable = useRecoilValueLoadable(postSelectorFamily(postId));
	let post = '';
	switch (userLoadable.state) {
		case 'hasValue':
			post = JSON.stringify(userLoadable.contents);
			break;
		case 'hasError':
			post = userLoadable.contents.message;
			break;
		case 'loading':
			post = 'Loading...';
			break;
		default:
			post = 'Loading...';
	}

	/**
	 * Get Post
	 */
	const getPost = () => {
		setPostId(postId + 1);
	};

	/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	| Mark Up
	|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

	return (
		<>
			<div className="wrap-table">
				<table className="component-table">
					<colgroup>
						<col width="*"/>
						<col width="240px"/>
						<col width="240px"/>
						<col width="100px"/>
					</colgroup>
					<thead>
					<tr>
						<th>무료 신청 크래딧<a href="#" className="arrow-sort "></a></th>
						<th>신청 상태<a href="#" className="arrow-sort "></a></th>
						<th colSpan={2}>신청 일시<a href="#" className="arrow-sort "></a></th>
					</tr>
					</thead>
					<tbody>
					<tr className="is-disabled">
						<td>
							<div className="txt-ellipsis">100,000원</div>
						</td>
						<td>
							<span className="data-status type-wait">대기</span>
						</td>
						<td>
							2022.01.11 11:11
						</td>
						<td className="txt-right">
							{/*<!-- More -->*/}
							{/*<!-- 클릭시 aria-selected="true" -->*/}
							<div className="ui-more" aria-selected="true">
								<a href="#" className="btn-more"></a>
								{/*<!-- Popup Dropdown -->*/}
								<div className="popup-dropdown">
									<ul className="list-dropdown">
										<li>
											<a href="#">신청 취소</a>
										</li>
									</ul>
								</div>
								{/*<!-- //Popup Dropdown -->*/}
							</div>
							{/*<!-- //More -->*/}
						</td>
					</tr>
					</tbody>
				</table>
				{/*<!-- paging -->*/}
				<div className="ui-table-paging">
					<a href="#" className="btn-first"></a>
					<a href="#" className="btn-prev"></a>
					<a href="#" aria-selected="false">1</a>
					<a href="#" aria-selected="false">2</a>
					<a href="#" aria-selected="true">3</a>
					<a href="#" aria-selected="false">4</a>
					<a href="#" aria-selected="false">5</a>
					<a href="#" aria-selected="false">6</a>
					<a href="#" aria-selected="false">7</a>
					<a href="#" aria-selected="false">8</a>
					<a href="#" aria-selected="false">9</a>
					<a href="#" aria-selected="false">10</a>
					<a href="#" className="btn-next"></a>
					<a href="#" className="btn-last"></a>
				</div>
				{/*<!-- //paging -->*/}
			</div>
		</>
	);
};

export default TestApiMenu2;
