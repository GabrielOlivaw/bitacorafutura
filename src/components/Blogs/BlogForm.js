import React from 'react'
import { Button, Form } from 'react-bootstrap'

import TagsField from './TagsField'

import DraftEditor from '../DraftEditor'

import { useTranslation } from 'react-i18next'

const BlogForm = ({
  attrLabel,
  title, setTitle,
  content, setContent,
  onSubmit,
  tags, onAddTag, onDeleteTag,
  edit
}) => {

  const { t } = useTranslation()

  return (
    <Form id={`${attrLabel}BlogForm`} onSubmit={onSubmit}>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="title">{t('blog-form-title')}</Form.Label>
        <Form.Control name="title" type="text" placeholder={t('blog-form-title')} value={title}
          onChange={({ target }) => setTitle(target.value) } />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="content">{t('blog-form-content')}</Form.Label>
        {(!edit || (edit && content)) &&
          <DraftEditor name="content" value={content} setValue={setContent} edit={edit} />
        }
      </Form.Group>
      <TagsField tags={tags} onAdd={onAddTag} onDelete={onDeleteTag} />
      <Button id={`${attrLabel}BlogButton`} variant="primary" type="submit">
        {!edit ? t('blog-new-blog') : t('blog-edit-blog')}
      </Button>
    </Form>
  )
}

export default BlogForm