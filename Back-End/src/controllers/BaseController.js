import { validationResult } from 'express-validator';

class BaseController {
  constructor(model) {
    this.model = model;

    // Bind methods to the class instance
    this.create = this.create.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.getAll = this.getAll.bind(this);
  }

  async create(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const data = req.body;
      const newDocument = new this.model(data);
      const result = await newDocument.save();
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ message: "Error creating document", error });
    }
  }

  async getById(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    try {
      const document = await this.model.findById(id);

      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }

      return res.status(200).json(document);
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving document", error });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const data = req.body;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    try {
      const updatedDocument = await this.model.findByIdAndUpdate(id, data, { new: true });

      if (!updatedDocument) {
        return res.status(404).json({ message: "Document not found" });
      }

      return res.status(200).json(updatedDocument);
    } catch (error) {
      return res.status(500).json({ message: "Error updating document", error });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    try {
      const deletedDocument = await this.model.findByIdAndDelete(id);

      if (!deletedDocument) {
        return res.status(404).json({ message: "Document not found" });
      }

      return res.status(200).json({ message: "Document deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Error deleting document", error });
    }
  }

  async getAll(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const startIndex = (page - 1) * limit;

      const total = await this.model.countDocuments();
      const data = await this.model.find().skip(startIndex).limit(parseInt(limit));

      const results = {
        total,
        data,
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
      };

      return res.status(200).json(results);
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving documents", error });
    }
  }
}

export default BaseController;
