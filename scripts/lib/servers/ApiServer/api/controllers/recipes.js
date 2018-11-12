const Storage = require('../Storage')

const store = new Storage('recipes')

const list = (req, res) => {
  const { page: pageParam, pageSize: pageSizeParam, search: searchParam } = req.swagger.params
  const { value: page } = pageParam
  const { value: pageSize } = pageSizeParam
  let { value: search } = searchParam

  const start = (page - 1) * pageSize
  search = search && search.trim() || ''
  const searches = search.toLowerCase().split(/\s+/)
  const list = store.list()
    .filter(item => {
      if (!searches.length) {
        return true
      }

      let include = false
      const text = [
        item.title,
        item.description,
        item.ingredients.reduce((acc, item) => acc + ' ' + item, '')
      ].join(' ').toLowerCase()

      searches.forEach(search => {
        include = include || text.includes(search)
      })

      return include
    })
  const recipes = list.slice(start, start + pageSize)

  res.json({
    currentPage: page,
    totalPages: Math.ceil(list.length / pageSize),
    recipes
  })
}

const get = (req, res) => {
  const { id: idParam} = req.swagger.params
  const id = idParam.value.toString()

  if (!store.has(id)) {
    return res.status(404).json({
      message: `${id} not found`
    })
  }

  res.json(store.get(id))
}

const del = (req, res) => {
  const { id: idParam} = req.swagger.params
  const id = idParam.value.toString()

  if (!store.has(id)) {
    return res.status(404).json({
      message: `${id} not found`
    })
  }

  const deleted = store.get(id)
  store.del(id)

  res.json(deleted)
}

const update = (req, res) => {
  const { id: idParam} = req.swagger.params
  const id = idParam.value.toString()

  const { body: bodyParam} = req.swagger.params
  const { value } = bodyParam

  if (!store.has(id)) {
    return res.status(404).json({
      message: `${id} not found`
    })
  }

  res.json(store.update(id, value))
}

const add = async (req, res) => {
  const { body: bodyParam} = req.swagger.params
  const { value } = bodyParam
  res
    .status(201)
    .json(store.add(value))
}

module.exports = {
  add,
  delete: del,
  get,
  list,
  update
}