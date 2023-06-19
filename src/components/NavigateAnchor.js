import React from 'react'
import { Button } from 'react-bootstrap'

import { useNavigate } from 'react-router-dom'

const NavigateAnchor = ({ href, className, variant, title, children, button }) => {

  const navigate = useNavigate()

  const onClick = (event) => {
    event.preventDefault()
    navigate(href, { replace: true })
  }

  return (
    <>
      {
        !button
          ? <a href={href} className={className} onClick={onClick}>{children}</a>
          : <Button className={className} variant={variant} title={title} onClick={onClick}>{children}</Button>
      }
    </>
  )
}

export default NavigateAnchor