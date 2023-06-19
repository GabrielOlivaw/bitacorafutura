import React from 'react'
import { useNavigate } from 'react-router-dom'

const TagsList = ({ tags, editable, onDelete }) => {

  const navigate = useNavigate()

  const deleteTag = (tag) => {
    if (onDelete) onDelete(tag)
  }

  const onClickTag = (tag) => {
    if (!editable) navigate(`/?tag=${tag}`)
  }

  return (
    <ol className="mt-5 blogTagList">
      {
        tags.map(tag =>
          <li key={tag} className={`me-3 p-2 blogTag ${!editable && 'cursorPointer'}`}
            onClick={!editable ? () => onClickTag(tag) : null}>
            {tag}
            {editable &&
              <span className="blogTagDeleteButton"
                onClick={editable ? () => deleteTag(tag) : null}>x</span>
            }
          </li>
        )
      }
    </ol>
  )
}

export default TagsList