const Storage = require('../Storage')

const store = new Storage('recipes')

const list = (req, res) => {
  const { page: pageParam, pageSize: pageSizeParam, search: searchParam } = req.swagger.params
  const { value: page } = pageParam
  const { value: pageSize } = pageSizeParam
  const { value: search } = searchParam
  res.json({
    page, pageSize, search
  })
}

const get = (req, res) => {
  const { id: idParam} = req.swagger.params
  const { value: id } = idParam

  console.log(store.has(id))

  res.json({
    id
  })
}

const add = (req, res) => {
  console.log(req.swagger.params)
  res.json({})
}

module.exports = {
  add,
  list,
  get
}