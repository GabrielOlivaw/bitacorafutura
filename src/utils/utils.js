export const timestampFormat = (timestamp) => {
  return timestamp.split('T')[0]
}

export const roles = ['USER', 'AUTHOR', 'ADMIN', 'SUPERADMIN']

export const canModifyTargetUser = (modifierRole, targetUserRole, newRole) => {

  const modifierRoleIndex = roles.indexOf(modifierRole)
  const targetRoleIndex = roles.indexOf(targetUserRole)
  const newRoleIndex = roles.indexOf(newRole)

  /*
  Restrictions defined in the return:
  - All roles must exist AND modifier user role has to be higher than user to modify
  - If modifier user is ADMIN, he can only grant roles up to AUTHOR
  - If modifier user is SUPERADMIN, he can only grant roles up to ADMIN
  */

  return ((modifierRoleIndex !== -1 && targetRoleIndex !== -1 && newRoleIndex !== -1 &&
          modifierRoleIndex > targetRoleIndex) &&
    (modifierRoleIndex === roles.indexOf('ADMIN') && newRoleIndex <= roles.indexOf('AUTHOR')) ||
    (modifierRoleIndex === roles.indexOf('SUPERADMIN') && newRoleIndex <= roles.indexOf('ADMIN')))
}

export const isContentFieldEmpty = (content) => {
  return !content || content === '<p><br></p>' || content.replace(/\s+/g, '') === '<p></p>'
}

export const getErrorMessage = (error) => {
  return error.response.status === 500 ? error.response.statusText : error.response.data.error
}