import React, { useState, useEffect } from 'react'

import { useUserContext } from '../../UserContext'

import Pagination from '../Pagination'

import blogsService from '../../services/blogs'

import { getErrorMessage, timestampFormat } from '../../utils/utils'
import NewComment from './NewComment'

import { Button } from 'react-bootstrap'

import ModalConfirm from '../ModalConfirm'

import { useTranslation } from 'react-i18next'

const CommentsList = ({ blogId, onNotification }) => {

  const [page, setPage] = useState(parseInt(1))
  const [totalPages, setTotalPages] = useState(1)
  const [comments, setComments] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [commentToDelete, setCommentToDelete] = useState('')

  const userCtx = useUserContext()

  const { t } = useTranslation()

  const getComments = (currentPage) => {
    blogsService.getAllComments(blogId, currentPage).then(comments => {
      setComments(comments.docs)
      setTotalPages(comments.totalPages)
    }).catch(() => {
      onNotification(t('notification-blog-comments-error'), 'danger')
    })
  }

  useEffect(() => {
    getComments(page)
  }, [page])

  const goToPage = (event, page) => {
    if (event) {
      event.preventDefault()
    }

    setPage(page)
  }

  const handleNewComment = async (comment) => {
    let done = false

    try {
      await blogsService.createComment(blogId, comment)

      if (page !== 1) setPage(1)
      else getComments(1)

      done = true
    } catch (error) {
      onNotification(getErrorMessage(error), 'danger')
    }

    return done
  }

  const onDeleteConfirm = (comment) => {
    setCommentToDelete(comment)
    setShowDeleteModal(true)
  }

  const handleDeleteComment = async () => {
    try {
      await blogsService.removeComment(blogId, commentToDelete)

      setShowDeleteModal(false)

      if (page !== 1) setPage(1)
      else getComments(1)
    } catch (error) {
      onNotification(error.response.data.error, 'danger')
    }
  }

  return (
    <div className="my-4">
      {userCtx.user.isLogged
        ? <NewComment onSubmit={handleNewComment} />
        : null
      }
      {
        (comments && Object.keys(comments).length > 0) &&
        <div className="commentsList">
          {
            comments?.map(comment =>
              <div id={comment.id} className="comment border mt-3 p-3 futura-light position-relative" key={comment.id}>
                <div className="commentContent me-5">
                  <p className="text-break">{comment.comment}</p>
                  <small>
                    {t('blog-comment-author-date', {
                      author: comment.user.name,
                      date: timestampFormat(comment.createdAt) })}
                  </small>
                </div>
                {
                  userCtx.user.isAdmin &&
                  <Button className="deleteComment mt-2 me-2 position-absolute top-0 end-0"
                    title={t('blog-comment-delete')} variant="danger"
                    onClick={() => onDeleteConfirm(comment.id)}>&#128465;</Button>
                }
              </div>
            )
          }
          <Pagination className="commentsListPagination" page={page} maxPages={totalPages} onPageChange={goToPage} />
          {userCtx.user.isAdmin && commentToDelete &&
            <ModalConfirm
              show={showDeleteModal}
              onClose={() => setShowDeleteModal(false)}
              onAccept={handleDeleteComment}
              confirmTitle={t('blog-comment-delete')}
              confirmText={t('modal-text-delete-comment')}
            />
          }
        </div>
      }
    </div>
  )
}

export default CommentsList