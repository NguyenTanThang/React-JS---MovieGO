import React from 'react';
import { Pagination } from 'antd';

function Paginationing({pageObject, onChangePageNumber}) {
    if (!pageObject) {
        return (<></>)
    }

    const {currentPage, totalItems, pageSize} = pageObject;

    if (totalItems === 0) {
        return (<></>)
    }

    return (
        <div className="pagination-container">
            <Pagination current={currentPage} onChange={onChangePageNumber} total={totalItems} showSizeChanger={false} defaultPageSize={pageSize}/>
        </div>
    )
}

export default Paginationing

