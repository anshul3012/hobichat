export type Group = { id: string; name: string; createdDate: string }
export type chat = { user: string; text: string; milliseconds: number }
type ChatLogs = { [key: string]: chat[] }

const initialDB = {
  groups: [
    {
      id: '1',
      name: 'Coding Pals',
      createdDate: '4 Feb 2022'
    },
    {
      id: '2',
      name: 'Scouting',
      createdDate: '4 Feb 2022'
    },
    {
      id: '3',
      name: 'Sports',
      createdDate: '4 Feb 2022'
    },
    {
      id: '4',
      name: 'Music',
      createdDate: '4 Feb 2022'
    }
  ],
  chatLogs: {
    '1': [
      {
        user: 'ironman@avengers.com',
        text: 'Thanos is here, we need to plan a strategy to defeat him, Come on guys let\'s save the mother earth',
        milliseconds: 1705246882512
      },
      {
        user: 'natasha@avengers.com',
        text: 'Bruce is still not here',
        milliseconds: 1705246959736
      },
      {
        user: 'anshul@avengers.com',
        text: 'He has been very troublesome for us',
        milliseconds: 1705247001824
      }
    ],
    '2': [],
    '3': [],
    '4': [],
  }
}

type DbType = {
  groups: Group[],
  chatLogs: ChatLogs
}

let DB: DbType = initialDB

const localStorageDB = window.localStorage.getItem('DB')
if (localStorageDB) {
  const ObjDB = JSON.parse(localStorageDB)
  if (ObjDB as DbType) {
    DB = ObjDB
  }
}

export { DB }

export function clearDB() {
  DB = initialDB
}
