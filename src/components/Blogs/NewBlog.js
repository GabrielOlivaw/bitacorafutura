import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import blogsService from '../../services/blogs'
import { isContentFieldEmpty } from '../../utils/utils'

import { useTranslation } from 'react-i18next'
import BlogForm from './BlogForm'

const NewBlog = ({ onNotification }) => {

  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState([])

  const { t } = useTranslation()

  const onAddTag = (newTag) => {
    setTags([...tags, newTag.toLowerCase()])
  }

  const onDeleteTag = (deletedTag) => {
    setTags(tags.filter(tag => tag.toLowerCase() !== deletedTag.toLowerCase()))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!title || isContentFieldEmpty(content)) {
      onNotification(t('notification-blog-new-error'), 'warning')
    }
    else {
      try {
        await blogsService.create({ title, content, tags })

        setTitle('')
        setContent('')

        navigate('/')
      } catch (error) {
        const errors = error.response.data.error.errors

        errors.forEach(error => onNotification(error.message, 'danger'))
      }
    }
  }

  return (
    <section>
      <header>
        <h2 className="pageSection text-center my-5">{t('blog-new-blog')}</h2>
      </header>
      <main>
        <BlogForm attrLabel="new"
          title={title} setTitle={setTitle}
          content={content} setContent={setContent}
          onSubmit={handleSubmit}
          tags={tags} onAddTag={onAddTag} onDeleteTag={onDeleteTag} />
      </main>
    </section>
  )
}

export default NewBlog