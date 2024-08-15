
import { studentModel } from "./models/student.model.js";

const getAll = async (query) => {
    return await studentModel.find(query);
};

const getOne = async (query) => {
    return await studentModel.findOne(query);
};

const create = async (data) => {
    return await studentModel.create(data);
};

const update = async (id, data) => {
    return await studentModel.findByIdAndUpdate(id, data, { new: true });
};

const deleteOne = async (id) => {
    return await studentModel.findByIdAndDelete(id);
};

export default {
    getAll,
    getOne,
    create,
    update,
    deleteOne
}