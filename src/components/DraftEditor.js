import React, { useState, useEffect } from 'react'
import { EditorState, ContentState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

/*
SOLVED: When initializing the editor with existing value as html, if it has an
image it is shown as a photo camera emoji.
https://github.com/jpuri/react-draft-wysiwyg/issues/575
*/

const DraftEditor = ({ value, setValue, edit }) => {
  const [editorState, setEditorState] = useState(() => {
    if (!edit)
      return EditorState.createEmpty()
    else {
      const blocksFromHtml = htmlToDraft(value)
      const stateHtml = ContentState.createFromBlockArray(
        blocksFromHtml.contentBlocks,
        blocksFromHtml.entityMap
      )
      return EditorState.createWithContent(stateHtml)
    }
  })

  useEffect(() => {
    setValue(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  }, [editorState])

  return (
    <>
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        toolbar={{
          options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list',
            'colorPicker', 'link', 'emoji', 'image', 'remove', 'history'],
          image: { alt: { present: true, mandatory: true } }
        }}
        wrapperClassName="draftWrapperStyle"
        editorClassName="draftEditorStyle"
        toolbarClassName="draftToolbarStyle"
      />
    </>
  )
}

export default DraftEditor