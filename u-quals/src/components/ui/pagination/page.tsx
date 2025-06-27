import React, { useState } from "react";

interface PaginationProps {
  totalPages: number;
  initialPage?: number;
  onPageChange: (page: number) => void;
}

const PaginationWithText: React.FC<PaginationProps> = ({
  totalPages,
  initialPage = 1,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= Math.min(totalPages, 5); i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-3 py-1 rounded ${
            currentPage === i
              ? "bg-brand-500 text-sm text-white"
              : "text-gray-700 text-sm hover:text-brand-500"
          }`}
        >
          {i}
        </button>
      );
    }
    if (totalPages > 5) {
      pages.push(
        <span key="dots" className="px-2 text-brand-500 ">
          ...
        </span>,
        <button
          key={totalPages}
          onClick={() => handlePageClick(totalPages)}
          className={`px-3 py-1 rounded ${
            currentPage === totalPages
              ? "bg-brand-500 text-sm text-white"
              : "text-gray-700 text-sm hover:text-brand-500 "
          }`}
        >
          {totalPages}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-end gap-2 mt-6">
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 border rounded-lg text-sm text-gray-500 disabled:opacity-50"
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border rounded-lg text-sm text-gray-500 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationWithText;
