import React, {useEffect} from 'react';
import {MenuType} from '@typings/test';
import TestApiMenu1 from '@pages/test/api/menu1/test-api-menu1';
import TestApiMenu2 from '@pages/test/api/menu2/test-api-menu2';
import useTab from '@hooks/useTab';
import {CommonService} from '@services/common/commonService';

function TestApiMain() {

	/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	| States & Variables
	|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

	const tabMenu: MenuType[] = [
		{
			index: 0,
			tab: 'tabMenu1',
			content : <TestApiMenu1/>
		},
		{
			index: 1,
			tab: 'tabMenu2',
			content : <TestApiMenu2/>
		},
	];

	/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	| Hooks
	|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

	// TODO
	useEffect(() => {
		(async () => {
			try {
				const result = await CommonService.getUser();
				console.log('getUser() >>>> ', result);
			} catch (e) {
				console.log('Error!');
			}
		})();
	}, []);

	const {currentTab, changeTab} = useTab(0, tabMenu);

	/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	| Functions
	|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

	/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	| Mark Up
	|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

	return (
		<>
			{/*<!-- Top -->*/}
			<div className="view-top">
				<h2 className="page-label">
				<span className="txt-label" id="label-size">
					<em className="icon-title-notice"></em>
					API 테스트 게시판
				</span>
				</h2>
				{/*<!-- Tabs -->*/}
				<div className="ui-top-tabs">
					<div className="view-tabs">
						<ul className="list-tabs">
							{tabMenu.map((menuType, index)=>(
								<li aria-selected={currentTab.index === index}
								    onClick={() => changeTab(index)}
								    key={menuType.tab}>
									<a>{menuType.tab}</a>
								</li>
							))}
						</ul>
					</div>
				</div>
				{/*<!-- //Tabs -->*/}
			</div>
			{/*<!-- //Top -->*/}
			{/*<!-- Contents -->*/}
			<div className="wrap-contents">
				{currentTab.content}
			</div>
			{/*<!-- //Contents -->*/}
		</>
	);
};

export default TestApiMain;
