export default {
  state: {
    catalogMenu: [],
    catalogReady: false,
  },
  mutations: {
    setCatalog(state, data) {
      state.catalogMenu = data
      state.catalogReady = true
    },
  },
  actions: {
    async fetchCatalog({ commit }) {
      try {
        const url = 'https://projects.koptyakov.ru/shop-server/categories.php'
        const data = await fetch(url)
          .then((response) => {
            if (response.status !== 200) {
              console.log('[Error] Status Code: ' + response.status)
            }
            return response.json()
          })
          .then((json) => {
            const data = JSON.parse(json)
            return data
          })

        commit('setCatalog', data || [])
      } catch (e) {
        console.log('[Error]: ', e)
      }
    },
  },
  getters: {
    isCatalogReady: (state) => state.catalogReady,
    getMenu: (state) => state.catalogMenu,
    getCategoryInfoByUrl: (state) => (url) => {
      // console.log(JSON.stringify(state.catalogMenu, null, ' '))
      let categoryInfo = {}
      // find ID of category or subcategory by url
      for (let i = 0; i < state.catalogMenu.length; i++) {
        // loop sections

        const section = state.catalogMenu[i]

        for (let j = 0; j < section.categories.length; j++) {
          // loop categories

          const category = section.categories[j]
          if (category.url === url) {
            categoryInfo = {
              id: category.id,
              name: category.id,
            }
            break
          } else {
            for (let k = 0; k < category.subcategories.length; k++) {
              // loop subcategories

              const subcategory = category.subcategories[k]
              if (subcategory.url === url) {
                categoryInfo = {
                  id: subcategory.id,
                  name: subcategory.name,
                }
                break
              }
            } // end loop subcategories
          }
        } // end loop categories
      } // end loop sections
      return categoryInfo
    },
  },
}
