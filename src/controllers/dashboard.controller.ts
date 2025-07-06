import { NextFunction, Request,Response } from "express";
import {AppError} from '../utils/errors'
import { OK,FORBIDDEN,INTERNAL_SERVER_ERROR } from '../utils/http-status';
import UserCollection , { UserDocument} from "../models/user.model";
import { getAllLeaves, getStudentLeaves, getLeavesForStudents } from './leave.controller';
import { getAllAttendance, getAttendanceByClassIds, getAttendanceByStudentId } from './attendance.controller';
import {fetchClassesForUser,getStudentsByClass, fetchClassTeachers} from '../services/class.service'
import { authRequest } from "../middleware/auth.middleware";
//gets dashboard based on user role 
const getDashboardData = async (req: authRequest, res: Response): Promise<void> => {
  const user = req.user;

  try {
    let data;

    if (user.role === 'admin') {
      const UsersList = await fetchClassTeachers(user);
      const HelpersList = await getPrincipal();
      const DangersList = await getStudentsByClass(user)
      const ServicesList = await fetchClassesForUser(user);

      data = { UsersList, HelpersList, DangersList, ServicesList};

    } else if (user.role === 'helper') {
      const HelpedUsers = await fetchClassTeachers(user);
      const HelperHistory = await getStudentsByClass(user)
      const HelperEarnings = await fetchClassesForUser(user);

      data = { HelpedUsers, HelperHistory, HelperEarnings };

    } else if (user.role === 'user') {
      const UserHistory = await fetchClassesForUser(user); 
      const UserAddedDanger = fetchClassesForUser(user); 

      data = { UserHistory, UserAddedDanger};

    } else {
       res.status(FORBIDDEN).json({ message: 'Role not authorized' });
    }

     res.status(OK).json({ status: 'success', data });

  } catch (err: any) {
     res.status(INTERNAL_SERVER_ERROR).json({ message: 'Error fetching dashboard data', error: err.message });
  }
};

export{
    getDashboardData
}