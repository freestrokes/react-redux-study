import React from 'react';

interface TableProps {
	list: any[];
};

function TestApiMenu2Table({
	list
}: TableProps) {

	/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	| States & Variables
	|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

	/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	| Hooks
	|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

	/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	| Functions
	|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

	/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	| Table & Pagination
	|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

	/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	| Mark Up
	|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

	return (
		<>
			<table className="component-table">
				<colgroup>
					<col width="140px"/>
					<col width="*"/>
					<col width="140px"/>
					<col width="140px"/>
				</colgroup>
				<thead>
				<tr>
					<th>ID</th>
					<th>Title<a className="arrow-sort "></a></th>
					{/*<th>신청 상태<a href="#" className="arrow-sort "></a></th>*/}
					<th colSpan={2}>등록 일시<a className="arrow-sort "></a></th>
				</tr>
				</thead>
				<tbody>
				{
					list.map((post) => (
						<tr className="is-disabled" key={post.id}>
							<td>
								<div className="txt-ellipsis">{post.id}</div>
							</td>
							<td>
								<div className="txt-ellipsis">{post.title}</div>
							</td>
							{/*<td>*/}
							{/*	<span className="data-status type-wait">신청대기</span>*/}
							{/*</td>*/}
							<td>{post.createdAt}</td>
							<td className="txt-right">
								{/*<!-- More -->*/}
								{/*<!-- 클릭시 aria-selected="true" -->*/}
								<div className="ui-more" aria-selected="false">
									<a className="btn-more"></a>
									{/*<!-- Popup Dropdown -->*/}
									<div className="popup-dropdown">
										<ul className="list-dropdown">
											<li>
												<a>신청 취소</a>
											</li>
										</ul>
									</div>
									{/*<!-- //Popup Dropdown -->*/}
								</div>
								{/*<!-- //More -->*/}
							</td>
						</tr>
					))
				}
				</tbody>
			</table>
		</>
	);
};

export default TestApiMenu2Table;
