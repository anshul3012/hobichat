import { DB, type Group } from '@/fake/DB'

export const API = () => {
  return {
    login: () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('Successfully signed in')
        }, 1000)
      })
    },
    getChatGroups: () => {
      return DB.groups
    },
    addGroup: (group: { name: string; createdDate: string; }) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const newId = DB.groups.length + 1
          DB.groups.push({
            id: newId.toString(),
            ...group
          })
          DB.chatLogs[newId.toString()] = []
          resolve('Created new group')
        }, 1000)
      })
    },
    fetchChatLogs: (id: string) => {
      const groupDetail: Group = DB.groups.find(group => group.id === id) ?? { id: '', name: '', createdDate: '' }
      return {
        ...groupDetail,
        logs: DB.chatLogs[id] ?? []
      }
    },
    sentChat: (user: string, id: string, text: string) => {
      DB.chatLogs[id].push({
        user,
        milliseconds: new Date().getTime(),
        text,
      })
    }
  } 
}
