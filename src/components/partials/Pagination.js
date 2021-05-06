import React, { Component } from 'react';
import { Pagination } from 'antd';

export default class Paginationing extends Component {
    render() {
        const {pageObject, onChangePageNumber} = this.props;
        console.log(this.props.pageObject);

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
}
