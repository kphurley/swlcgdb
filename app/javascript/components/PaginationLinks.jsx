import React from "react";

const PaginationLink = ({ pageNumber, isActive, setCurrentPage }) => {
  const classNames = isActive ? "page-item active" : "page-item";

  return (
    <li className={classNames} onClick={() => setCurrentPage(pageNumber)}><a className="page-link">{pageNumber}</a></li>
  )
}

const PaginationLinks = ({ paginationMetadata, setCurrentPage }) => {
  const {
    prev,
    page,
    next,
    last,
  } = paginationMetadata;

  const classNamesForPrev = page === 1 ? "page-item disabled" : "page-item";
  const classNamesForNext = page === last ? "page-item disabled" : "page-item";

  return (
    <nav aria-label="Page navigation" className="py-4">
      <ul className="pagination">
        <li className={classNamesForPrev}>
          <a className="page-link" onClick={() => setCurrentPage(1)} aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        { prev && <PaginationLink pageNumber={prev} setCurrentPage={setCurrentPage} /> }
        <PaginationLink pageNumber={page} setCurrentPage={setCurrentPage} isActive />
        { next && <PaginationLink pageNumber={next} setCurrentPage={setCurrentPage} /> }
        <li className={classNamesForNext}>
          <a className="page-link" onClick={() => setCurrentPage(last)} aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default PaginationLinks;
