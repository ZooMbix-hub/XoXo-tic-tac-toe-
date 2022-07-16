import React, { useEffect, useState } from 'react';
import './PaginationStyle.scss';

const Pagination = ({totalCount, limit, page, setPage}) => {
    const [pages, setPages] = useState([]);

    const pageCount = Math.ceil(totalCount / limit);
    
    function getPagination(page, total) {
        if (page < 5) return [1, 2, 3, 4, 5, '...', total];
        if (page < total - 2) return [1, '...',  page - 1, page, page + 1, '...', total];
        return [1, '...', total - 3, total - 2, total - 1, total];
    }

    const nextPage = () => {
        if (page < pageCount) {
            if (page + 1 >= 5) {
                const newPages = getPagination(page + 1, pageCount)
                setPages(newPages)
            }
            setPage(page + 1);
        }
    }

    const backPage = () => {
        if (page > 1) {
            const newPages = getPagination(page - 1, pageCount)
            setPages(newPages)
            setPage(page - 1);
        }
    }

    const clickPage = (numPage) => {
        if (numPage !== "...") {
            setPage(numPage);
            const newPages = getPagination(numPage, pageCount)
            setPages(newPages)
        } 
    }
    
    const checkNumPAge = (numPage) => {
        if (numPage !== '...') {
            return numPage === page ? "active-page" : "page";
        } else {
            return "nullPage"
        }
    }
 
    useEffect(() => {
        setPages(getPagination(page, pageCount))
    }, [])
    
    return (
        <div className='pagination-container'>
            <p className='pagination-btn' onClick={backPage}>{"<"}</p>
            {pages.map((element, i) => 
                <p key={i} 
                    onClick={() => clickPage(element)}
                    className={checkNumPAge(element)}    
                >
                    {element}
                </p>
            )}
            <p className='pagination-btn' onClick={nextPage}>{">"}</p>
        </div>
    )
}

export default Pagination