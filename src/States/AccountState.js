import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import React from 'react';
import UserPool from "../CognitoConfig";

const AccountState = () => {

    const getSession = async () =>{
        return await new Promise((resolve, reject)=>{
            const user = UserPool.getCurrentUser();
            if(user){
                user.getSession(async (err, session) =>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(session);
                    }
                })
            }else{
                reject();
            }
        })
    }


    return (
        <div>Account Cotext</div>
    );
};

export default AccountState;


