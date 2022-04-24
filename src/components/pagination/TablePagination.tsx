import React from 'react';

interface TablePaginationProps {
	total: number;
	listSize: number;
	pageSize: number;
	page: number;
	setPage: (page: number) => void;
};

function TablePagination({
	total,
  listSize,
	pageSize,
	page,
	setPage
}: TablePaginationProps) {

  /*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  | States & Variables
  |-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

	const firstPageNum = 1; // 전체 페이지의 첫번째 번호.
	const lastPageNum = Math.ceil(total / listSize);  // 전체 페이지의 마지막 번호.
	const pageRangeNum = Math.ceil(page / pageSize) - 1;  // 페이지 범위 순서 번호. ex) 0: range 1-10, 1: range 11-20, 2: range 21-30, ...
	const startPageNum = firstPageNum + ( pageRangeNum ? pageRangeNum * pageSize : 0 ); // 페이지 범위 내의 시작 페이지 번호.
	const endPageNum = pageSize + ( pageRangeNum ? pageRangeNum * pageSize : 0 ); // 페이지 범위 내의 끝 페이지 번호.
	pageSize = endPageNum * listSize > total ? lastPageNum - startPageNum + 1 : pageSize; // 페이지 사이즈.
	const pageNums = [...Array(pageSize).fill(startPageNum).map((x, y) => x + y)];  // 페이지 번호가 담긴 배열. ex) [1,2,3, ..., 8,9,10]

  /*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  | Hooks
  |-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

  /*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  | Functions
  |-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

  /*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  | Mark Up
  |-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

  return (
		<>
		  <div className="ui-table-paging">
			  <a className="btn-first" onClick={() => setPage(firstPageNum)}></a>
			  <a className="btn-prev" onClick={() => page > firstPageNum && setPage(page - 1)}></a>
			  {
				  pageNums.map(pageNum => {
					  return (
						  <a key={pageNum} onClick={() => setPage(pageNum)} aria-selected={pageNum === page}>{pageNum}</a>
					  )
				  })
			  }
			  <a className="btn-next" onClick={() => page * listSize < total && setPage(page + 1)}></a>
			  <a className="btn-last" onClick={() => setPage(lastPageNum)}></a>
		  </div>
		</>
  )
}

export default TablePagination;
