/*
 * @Author: Karim DALAIZE
 * @Date: 2019-03-10 01:13:11
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-03-10 19:11:14
 */

//@flow

export interface TribeProviders {
    githubToken: ?any;
    googleToken: ?any;
    trelloToken: ?any;
}
export interface TribeUser {
    token: string;
    providers: ?TribeProviders;
}
