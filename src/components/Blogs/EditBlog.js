import React, { useState, useEffect } from 'react'

import { useMatch, useNavigate } from 'react-router-dom'

import blogsService from '../../services/blogs'
import { isContentFieldEmpty } from '../../utils/utils'

import { useTranslation } from 'react-i18next'
import BlogForm from './BlogForm'

const EditBlog = ({ onNotification }) => {

  const navigate = useNavigate()

  const [id, setId] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState([])

  const blogMatch = useMatch('/blogs/:id/edit')

  const { t } = useTranslation()

  useEffect(() => {
    const matchedBlog = blogMatch
      ? blogMatch.params.id
      : null

    if (matchedBlog) {
      blogsService.getOne(matchedBlog).then(blog => {
        setId(blog.id)
        setTitle(blog.title)
        setContent(blog.content)
        setTags(blog.tags)
      })
    }
  }, [])

  const onAddTag = (newTag) => {
    setTags([...tags, newTag.toLowerCase()])
  }

  const onDeleteTag = (deletedTag) => {
    setTags(tags.filter(tag => tag.toLowerCase() !== deletedTag.toLowerCase()))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!title || isContentFieldEmpty(content)) {
      onNotification(t('notification-blog-edit-error'), 'warning')
    }
    else {
      try {
        await blogsService.update(id, { title, content, tags })

        setTitle('')
        setContent('')
        setTags([])

        navigate(blogMatch.pathname.replace('/edit', ''))
      } catch (error) {
        const errors = error.response.data.error.errors

        errors.forEach(error => onNotification(error.message, 'danger'))
      }
    }
  }

  return (
    <section>
      <header>
        <h2 className="pageSection text-center my-5">{t('blog-edit-blog')}</h2>
      </header>
      <main>
        <BlogForm attrLabel="edit"
          title={title} setTitle={setTitle}
          content={content} setContent={setContent}
          onSubmit={handleSubmit}
          tags={tags} onAddTag={onAddTag} onDeleteTag={onDeleteTag} edit />
      </main>
    </section>
  )
}

export default EditBlog