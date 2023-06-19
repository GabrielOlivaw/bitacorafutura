import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

import { useTranslation } from 'react-i18next'

const NewComment = ({ onSubmit }) => {

  const [comment, setComment] = useState('')

  const { t } = useTranslation()

  const handleNewComment = async (event) => {
    event.preventDefault()

    if (await onSubmit(comment)) {
      setComment('')
    }
  }

  return (
    <>
      <Form id="createCommentForm" onSubmit={(event) => handleNewComment(event)}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="comment">{t('blog-comment')}</Form.Label>
          <Form.Control name="comment" as="textarea" rows={3} placeholder={t('blog-comment')}
            value={comment} onChange={({ target }) => setComment(target.value)} required />
        </Form.Group>
        <Button id="newCommentButton" type="submit">{t('blog-comment-new')}</Button>
      </Form>
    </>
  )
}

export default NewComment