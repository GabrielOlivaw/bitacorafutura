import React, { useState, useEffect } from 'react'
import {
  useSearchParams
} from 'react-router-dom'
import { Stack } from 'react-bootstrap'

import blogsService from '../../services/blogs'

import parse from 'html-react-parser'

import SearchForm from '../SearchForm'
import Pagination from '../Pagination'
import NavigateAnchor from '../NavigateAnchor'

import { timestampFormat } from '../../utils/utils'

import { useTranslation } from 'react-i18next'

/*
Blogs are filtered by two ways.
The first one is inputting anything in the search bar. The input value is
searched in the blog title.
The second one is by clicking on a tag inside a blog page. It will go back to
the blogs list, filtering the ones that have the clicked tag in their arrays.
In the second way, when tag is being filtered, you can still search titles from
blogs having that tag.
*/
const BlogsList = ({ onNotification }) => {

  const [searchParams, setSearchParams] = useSearchParams()
  const [page, setPage] = useState(parseInt(searchParams.get('page')) || 1)
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [tag, setTag] = useState(searchParams.get('tag') || '')
  const [totalPages, setTotalPages] = useState(1)
  const [blogs, setBlogs] = useState([])

  const { t } = useTranslation()

  useEffect(() => {
    blogsService.getAll(page, search, tag).then(blogs => {
      setBlogs(blogs.docs)
      setTotalPages(blogs.totalPages)
      setSearchParams({ page, search, tag })
    }).catch(() => {
      onNotification(t('notification-blogslist-error'), 'danger')
    })
  }, [page, search, tag])

  if ((!blogs || Object.keys(blogs).length === 0) && !search) {
    return null
  }

  const goToPage = (event, page) => {
    event.preventDefault()

    setSearchParams({ page, search })
    setPage(page)
  }

  const searchBlog = (search) => {
    setSearch(search)
    setSearchParams({ page: 1, search })
    setPage(1)
  }

  const resetFilters = () => {
    setSearch('')
    setSearchParams('')
    setTag('')
    setPage(1)
  }

  return (
    <section className="blogsList">
      <header>
        <h2 className="pageSection text-center my-5">{t('blogslist-title')}</h2>

        <SearchForm attrLabel={t('blogslist-filter-label')} placeholder={t('blogslist-filter-title')}
          onNotification={onNotification} onReset={resetFilters}
          onSubmit={searchBlog} />

        {(tag || search) &&
          <p className="mt-3">
            {tag && t('blogslist-filter-tag', { tag })}
            {search && t('blogslist-filter-search', { search })}
          </p>
        }
      </header>
      <main>
        {
          blogs.length === 0
            ? <p>{search ? t('blogslist-filter-search-noblogs', { search }) : t('blogslist-noblogs')}</p>
            :
            blogs.map(blog =>
              <article key={blog.id}>
                <Stack id={blog.id} className="my-4 p-3 futura-light">
                  <header>
                    <NavigateAnchor href={`./blogs/${blog.id}`}>
                      <h2>{blog.title}</h2>
                    </NavigateAnchor>
                  </header>
                  <main className="text-break mb-3">
                    {parse(blog.shortenedContent)}
                  </main>
                  <footer className="my-1 col align-self-end">
                    <small className="text-break">
                      {t('blogslist-author-date', { author: blog.user?.name, date: timestampFormat(blog.createdAt) })}
                    </small>
                  </footer>
                </Stack>
              </article>
            )
        }
      </main>
      <footer>
        <Pagination className="blogListPagination" page={page} maxPages={totalPages} onPageChange={goToPage} />
      </footer>
    </section>
  )
}

export default BlogsList
