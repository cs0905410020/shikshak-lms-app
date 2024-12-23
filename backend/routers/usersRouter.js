import express from "express";
const usersRouter = express.Router();
import expressAsyncHandler from "express-async-handler";
import {
    actionToGetUserProfileDetailApiCall,
    actionToGetUserRoleApiCall,
    actionToGetUsersListApiCall
} from "../models/Users.js";
import authToken from "../middleware/authenticateToken.js";


usersRouter.post(
    '/actionToGetUsersListApiCall',authToken,
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
    '/actionToGetUserRoleApiCall',authToken,
    expressAsyncHandler(async (req, res) => {
        actionToGetUserRoleApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);

usersRouter.post(
    '/actionToGetUserProfileDataApiCall',authToken,
    expressAsyncHandler(async (req, res) => {
        actionToGetUserProfileDetailApiCall({id:req.user.id}).then((data) => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        })
    })
);

export default usersRouter;