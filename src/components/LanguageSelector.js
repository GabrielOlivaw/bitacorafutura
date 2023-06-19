import React from 'react'

import { setLang } from '../services/headers'

import { Dropdown } from 'react-bootstrap'

import { useTranslation } from 'react-i18next'

const LanguageSelector = () => {

  const currentLanguage = window.localStorage.getItem('i18nextLng').split('-')[0]

  const { i18n } = useTranslation()

  const flags = {
    'en': { title: 'English', flag: '🇬🇧' },
    'es': { title: 'Español', flag: '🇪🇸' }
  }

  const changeLanguage = (language) => {
    i18n.changeLanguage(language)
    setLang(language)
  }

  return (
    <>
      <Dropdown className="" drop="up">
        <Dropdown.Toggle title={flags[currentLanguage].title}
          className="p-0 px-3 fs-2">
          {flags[currentLanguage].flag}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {
            Object.keys(flags)
              .filter(lng => lng !== currentLanguage)
              .map(lng =>
                <Dropdown.Item key={lng}
                  title={flags[lng].title}
                  className="fs-2"
                  onClick={() => changeLanguage(lng)}>
                  {flags[lng].flag}
                </Dropdown.Item>)
          }
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

export default LanguageSelector