import { useState, useRef } from 'react'

import { v4 as uuidv4 } from 'uuid'

import i18next from 'i18next'

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([])
  const notificationsRef = useRef(notifications)
  notificationsRef.current = notifications

  let notificationTimeout

  const dismissNotification = (id) => {
    if (notificationTimeout) {
      clearTimeout(notificationTimeout)
    }

    setNotifications(notificationsRef.current.filter(notification => notification.id !== id))
  }

  const newNotification = (message = i18next.t('notification-unknown'), variant = 'danger', duration = 2000) => {
    if (notificationTimeout) {
      clearTimeout(notificationTimeout)
    }

    const id = uuidv4()
    const notification = {
      id,
      message,
      variant,
      dismiss: () => dismissNotification(id)
    }
    notificationTimeout = setTimeout(
      () => dismissNotification(id), duration)
    setNotifications([...notificationsRef.current, notification])
  }

  return {
    notifications,
    newNotification
  }
}