import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import PostItem from "module/post/PostItem";

export default function Pagination(props) {
  const { items, className = "", amount } = props;
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = amount || 8;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  const Product = () => {
    return (
      <div
        className={`grid lg:grid-cols-4 grid-cols-2 mx-auto gap-4 lg:gap-x-10 lg:gap-y-12 ${className}`}
      >
        {currentItems.map((item) => {
          return <PostItem key={item.id} data={item}></PostItem>;
        })}
      </div>
    );
  };

  if (items.length <= itemsPerPage) {
    return <Product />;
  }

  return (
    <>
      <Product />

      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="<<"
        renderOnZeroPageCount={null}
        containerClassName="pagination flex justify-center item-center mb-2 mt-[50px] gap-x-2"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="page-active"
      />
    </>
  );
}
