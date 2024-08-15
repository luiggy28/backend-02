
import { studentModel } from "./models/student.model.js";

const getAll = async () => {
    const students = await studentModel.find({ status: true });
    return students;
};

const getById = async (id) => {
    const student = await studentModel.findById(id);
    return student;
};

const create = async (data) => {
    const student = await studentModel.create(data);
    return student;
};

const update = async (id, data) => {
    const studentUpdate = await studentModel.findByIdAndUpdate(id, data, { new: true });
    return studentUpdate;
};

const deleteOne = async (id) => {
    const student = await studentModel.findByIdAndUpdate(id, { status: false }, { new: true });
    return student;
};

export default {
    getAll,
    getById,
    create,
    update,
    deleteOne
}