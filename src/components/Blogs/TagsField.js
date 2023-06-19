import React, { useState } from 'react'
import TagsList from './TagsList'

import { Form, Button } from 'react-bootstrap'

import { useTranslation } from 'react-i18next'

const TagsField = ({ tags, onAdd, onDelete }) => {

  const [tag, setTag] = useState('')

  const { t } = useTranslation()

  const onAddTag = (event) => {
    event.preventDefault()

    onAdd(tag)

    setTag('')
  }

  const onDeleteTag = (tag) => {
    onDelete(tag)
  }

  return (
    <>
      <Form.Control type="text" className="d-inline me-1 w-25" placeholder={t('blog-form-tag')} value={tag}
        onChange={({ target }) => setTag(target.value)} />
      <Button onClick={onAddTag}>{t('blog-form-tag-add')}</Button>
      <TagsList tags={tags} editable onDelete={onDeleteTag} />
    </>
  )
}

export default TagsField