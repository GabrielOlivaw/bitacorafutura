import React from 'react'

const Pagination = ({ className, page, maxPages, onPageChange }) => {

  const paginationLinks = () => {
    const pages = []
    const offset = 2

    if (maxPages <= offset + 2) {
      for (let i = 1; i <= maxPages; i++) {
        pages.push(i)
      }
    }
    else {
      pages.push(1)
      if (page <= offset + 2) {
        for (let i = 2; i <= page + offset; i++)
          pages.push(i)
      }
      else {
        pages.push('')

        for (let i = page - offset; i <= page + offset && i < maxPages; i++)
          pages.push(i)
      }
      if (page + offset < maxPages - 1)
        pages.push('')
      pages.push(maxPages)
    }

    const links = []
    for (let i = 0; i < pages.length; i++) {
      if (Number.isInteger(pages[i])) {
        links.push(
          <a
            href={`?page=${pages[i]}`}
            onClick={(event) => onPageChange(event, pages[i])}>
            <div className={`paginationPage ${(pages[i] === page) ? 'bg-primary text-light' : 'bg-light'}`}>
              {pages[i]}
            </div>
          </a>
        )
      }
      else {
        links.push(<span>.  .  .</span>)
      }
    }

    return links.map((pageLink, i) => {
      return (
        <span key={`${className}n${pages[i]}${i}`}>{pageLink}</span>
      )
    })
  }

  return (
    <div className={`${className} my-5`}>
      {
        (maxPages) ? paginationLinks() : ''
      }
    </div>
  )
}

export default Pagination