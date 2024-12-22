import express from "express";
const usersRouter = express.Router();
import expressAsyncHandler from "express-async-handler";
import {actionToGetUserRoleApiCall, actionToGetUsersListApiCall} from "../models/Users.js";


usersRouter.post(
    '/actionToGetUsersListApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetUsersListApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
usersRouter.post(
    '/actionToGetUserRoleApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetUserRoleApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);

export default usersRouter;