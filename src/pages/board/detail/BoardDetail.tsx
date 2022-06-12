import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router';
import {useRecoilValueLoadable} from 'recoil';
import {postSelectorFamily} from '@states/selector/PostSelector';

const TestApiMenu1Detail = () => {

	/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	| States & Variables
	|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

	const [post, setPost] = useState<any>({
		userId: 0,
		id: 0,
		title: '',
		body: ''
	});

	/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	| Hooks
	|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

	const {id} = useParams<{ id: string }>();
	const history = useHistory();
	const postLoadable = useRecoilValueLoadable(postSelectorFamily(id));
	// const query = qs.parse(location.search, { ignoreQueryPrefix: true });

	useEffect(() => {
		switch (postLoadable.state) {
			case 'hasValue':
				console.log('hasValue >>>> ', postLoadable.contents);
				setPost(postLoadable.contents);
				break;
			case 'hasError':
				console.log('hasError >>>> ', postLoadable.contents.message);
				break;
			case 'loading':
				console.log('loading >>>> ', 'Loading...');
				break;
			default:
				break;
		};
	}, [postLoadable.contents]);

	/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	| Functions
	|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

	/**
	 * Go List Page
	 */
	const goListPage = () => {
		history.push(`/app/test/api`);
	};

	/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	| Mark Up
	|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

	return (
		<>
			<div className="wrap-detail">
				{/*<!-- top detail -->*/}
				<div className="ui-top-detail">
					{/*<!-- btn top -->*/}
					<div className="btn-top">
						{/*<!-- Component : Dropdown -->*/}
						{/*<!--*/}
						{/*		클릭시 aria-expanded="true"*/}
						{/*		선택 전 : is-placeholder 클래스 추가*/}
						{/*-->*/}
						{/*<div className="component-dropdown " aria-expanded="false">*/}
						{/*	<div className="ui-dropdown">*/}
						{/*		<span className="txt-dropdown">답변 완료</span>*/}
						{/*		/!*<!-- Popup Dropdown -->*!/*/}
						{/*		<div className="popup-dropdown">*/}
						{/*			<ul className="list-dropdown">*/}
						{/*				<li>*/}
						{/*					<a href="#">답변 대기</a>*/}
						{/*				</li>*/}
						{/*				<li>*/}
						{/*					<a href="#">답변 완료</a>*/}
						{/*				</li>*/}
						{/*			</ul>*/}
						{/*		</div>*/}
						{/*		/!*<!-- //Popup Dropdown -->*!/*/}
						{/*	</div>*/}
						{/*</div>*/}
						{/*<!-- //Component : Dropdown -->*/}
						<a href="#" className="btn-edit"></a>
						<a href="#" className="btn-del"></a>
					</div>
					{/*<!-- //btn top -->*/}
					<div className="txt-title">
						{post.title}
						{/*<span className="tag-complete-reply">답변완료</span>*/}
					</div>
					{/*<div className="data-tag">*/}
					{/*	<span>소식</span><span>2021.07.20 15:32</span>*/}
					{/*</div>*/}
				</div>
				{/*<!-- //top detail -->*/}
				<div className="data-detail">
					{post.body}
				</div>
				{/*<!-- file -->*/}
				{/*<div className="component-file">*/}
				{/*	<div className="txt-file-label">첨부파일</div>*/}
				{/*	<div className="view-file">*/}
				{/*		<span className="data-file">test01.png</span>*/}
				{/*	</div>*/}
				{/*</div>*/}
				{/*<!-- //file -->*/}
			</div>
			{/*<!-- Bottom Button -->*/}
			<div className="wrap-bottom-button">
				<div className="ui-buttons">
					{/*<div className="ui-bottom-left">*/}
					{/*	<button className="component-button type-gray type-size-m">*/}
					{/*		이전*/}
					{/*	</button>*/}
					{/*	<button className="component-button type-gray type-size-m">*/}
					{/*		다음*/}
					{/*	</button>*/}
					{/*</div>*/}
					<div className="ui-bottom-right">
						<button className="component-button type-dark type-size-m" onClick={goListPage}>
							목록
						</button>
					</div>
				</div>
			</div>
			{/*<!-- //Bottom Button -->*/}
		</>
	);
};

export default TestApiMenu1Detail;
