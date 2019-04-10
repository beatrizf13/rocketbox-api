/* eslint-disable class-methods-use-this */
const Box = require('../models/Box');

class BoxController {
  async index(req, res) {
    const boxes = await Box.find();

    return res.send(boxes);
  }

  async store(req, res) {
    const box = await Box.create(req.body);

    return res.send(box);
  }

  async show(req, res) {
    const box = await Box.findById(req.params.id).populate({
      path: 'files',
      options: { sort: { createdAt: -1 } },
    });

    return res.send(box);
  }

  async destroy(req, res) {
    await Box.findByIdAndDelete(req.params.id);

    return res.send();
  }
}

module.exports = new BoxController();
