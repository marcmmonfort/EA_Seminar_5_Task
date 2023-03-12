import { Types } from "mongoose";
import { Subject } from "../interfaces/subject.interface";
import SubjectModel from "../models/subject";
import UserModel from "../models/user";

const insertSubject=async(item:Subject)=>{
    const responseInsert=await SubjectModel.create(item);
    return responseInsert;
};

const getSubjects=async()=>{
    const responseItem=await SubjectModel.find({}).populate('users');
    return responseItem;
};

const getSubject=async(id:string)=>{
    const responseItem=await SubjectModel.findOne({_id:id}).populate('users');
    return responseItem;
};

const updateSubject=async(id:string,data:Subject)=>{
    const responseItem=await SubjectModel.findOneAndUpdate(
        {_id:id},
        data,
        {
            new:true,
        }
    ).populate('users');
    return responseItem;
};

const deleteSubject=async(id:string)=>{
    const responseItem=await SubjectModel.deleteOne({_id:id});
    return responseItem;
}

const matriculateSubject=async(idUser:string,idSubject:string)=>{
    const responseItem = await SubjectModel.findOneAndUpdate(
        {_id:idSubject},
        {$addToSet: {users: new Types.ObjectId(idUser)}},
        {new: true}
    ).populate('users');
    console.log(responseItem?.users);
    return responseItem;
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// < DEBERES SEMINARIO 5 >

const subjectsMatriculatedByUser = async (idUser:string) => {
    const subjects = await SubjectModel.find({ idUser });
    console.log('Subjects matriculated by a user:');
    subjects.forEach((subject) => {console.log(`- ${subject.name} (semestre ${subject.semester}, dificultad ${subject.difficulty})`);});
}

const usersMatriculatedToSubject = async (idSubject:string) => {
    const subject = await SubjectModel.findOne({_id:idSubject});
    const usersInSubject = subject?.users ?? [];
    const usersList = await UserModel.find({ _id: { $in: usersInSubject } });
    console.log('Users matriculated to a subject:', usersList);
    return usersList;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export { insertSubject, getSubject, getSubjects, updateSubject, deleteSubject, matriculateSubject, subjectsMatriculatedByUser, usersMatriculatedToSubject };
