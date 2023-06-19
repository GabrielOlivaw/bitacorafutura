import React, { useState } from 'react'

import { Button, Form, Stack } from 'react-bootstrap'

import { useTranslation } from 'react-i18next'

const SearchForm = ({ attrLabel, placeholder, onNotification, onReset, onSubmit }) => {

  const [searchField, setSearchField] = useState('')

  const { t } = useTranslation()

  const handleLogin = (event) => {
    event.preventDefault()

    try {
      onSubmit(searchField)

      setSearchField('')
    } catch (error) {
      onNotification(error.response.data.error, 'danger')
    }
  }

  const resetFilters = (event) => {
    event.preventDefault()

    onReset()
  }

  return (
    <div className="">
      <Form id={`${attrLabel}SearchForm`} className="" onSubmit={handleLogin}>
        <Stack direction="horizontal" className="" gap={1}>
          {onReset &&
            <Button id="resetFiltersButton" variant="secondary" className="ms-auto"
              title={t('searchform-resetfilters')} onClick={resetFilters}>
              {t('searchform-resetfilters')}
            </Button>
          }

          <Form.Control type="text"
            id={`search${attrLabel}`}
            name={`search${attrLabel}`}
            className={`searchFormBar ${!onReset && 'ms-auto'} w-25`}
            placeholder={`${placeholder}`}
            value={searchField}
            onChange={({ target }) => setSearchField(target.value)}
          />

          <Button id="searchButton" variant="light" className="btn-lg"
            type="submit" title={t('searchform-search-label', { attrLabel })}>&#128270;</Button>
        </Stack>
      </Form>
    </div>
  )
}

export default SearchForm