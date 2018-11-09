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

const add = async (req, res) => {
  const { body: bodyParam} = req.swagger.params
  const { value, valid, error } = bodyParam

  console.log(value, valid, error)

  if (!valid) {
    // throw new Error(error)
  }


  res.end()
}

module.exports = {
  add,
  list,
  get
}