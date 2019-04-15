const getAll = (model) => (req, res, next) => {
  model
    .find()
    .then((docs) => res.json(docs))
    .catch((err) => next(err));
};

const getOne = (model) => (req, res, next) => {
  model
    .findById(req.params.id)
    .then((doc) => res.json(doc))
    .catch((err) => next(err));
};

const createOne = (model) => (req, res, next) => {
  model
    .create(req.body)
    .then((docs) => res.json(docs))
    .catch((err) => next(err));
};

const updateOne = (model) => async (req, res, next) => {
  model
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((doc) => res.json(doc))
    .catch((err) => next(err));
};

const deleteOne = (model) => (req, res, next) => {
  model
    .findByIdAndRemove(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => next(err));
};

const generateControllers = (model, overrides = {}) => {
  const defaults = {
    getAll: getAll(model),
    getOne: getOne(model),
    createOne: createOne(model),
    updateOne: updateOne(model),
    deleteOne: deleteOne(model)
  };

  return { ...defaults, ...overrides };
};

module.exports = generateControllers;
