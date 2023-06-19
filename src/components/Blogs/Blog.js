import React, { useState, useEffect } from 'react'
import { useMatch, useNavigate } from 'react-router-dom'

import CommentsList from './CommentsList'

import blogsService from '../../services/blogs'

import parse from 'html-react-parser'

import { useUserContext } from '../../UserContext'

import { timestampFormat } from '../../utils/utils'
import { Button } from 'react-bootstrap'
import ModalConfirm from '../ModalConfirm'
import TagsList from './TagsList'

import { useTranslation } from 'react-i18next'

const Blog = ({ onNotification }) => {

  const [blog, setBlog] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const userCtx = useUserContext()

  const blogMatch = useMatch('/blogs/:id')
  const navigate = useNavigate()

  const { t } = useTranslation()

  // useEffect fires twice due to React.StrictMode, stops happening in production build
  useEffect(() => {
    const matchedBlog = blogMatch
      ? blogMatch.params.id
      : null

    if (matchedBlog && !blog) {
      blogsService.getOne(matchedBlog).then(blog => {
        setBlog(blog)
      })
    }
  }, [])

  const onEditBlog = () => {
    navigate(`${blogMatch.pathname}/edit`)
  }

  const onDeleteConfirm = () => {
    setShowDeleteModal(true)
  }

  const onDeleteBlog = async () => {

    setShowDeleteModal(false)

    await blogsService.remove(blog.id)

    navigate('/')
  }

  if (!blog) {
    return null
  }

  return (
    <section className="blog">
      <div className="blogDetails position-relative">
        <header>
          <h2 className="pageSection text-center my-5">{blog.title}</h2>
        </header>
        <main>
          <div className="my-5 text-break">{parse(blog.content)}</div>
        </main>
        <footer>
          <div className="mt-5 w-50">
            <small className="text-break">
              {t('blog-author-date', {
                author: blog.user?.name,
                date: timestampFormat(blog.createdAt)
              })}
            </small>
          </div>
          {userCtx.user.beAuthor
            ?
            <div className="blogButtons position-absolute bottom-0 end-0">
              <Button className="editBlog me-2"
                title={t('blog-edit-blog')} variant="warning" onClick={onEditBlog}>&#9998;</Button>
              <Button className="deleteBlog"
                title={t('blog-delete-blog')} variant="danger" onClick={onDeleteConfirm}>&#128465;</Button>
            </div>
            :
            null
          }
        </footer>
      </div>
      <aside>
        <TagsList tags={blog.tags} />
      </aside>
      <CommentsList blogId={blog.id} onNotification={onNotification} />
      <ModalConfirm
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onAccept={() => onDeleteBlog(blog.id)}
        confirmTitle={t('blog-delete-blog')}
        confirmText={t('modal-text-delete-blog', { blog: blog.title })}
      />
    </section>
  )
}

export default Blog