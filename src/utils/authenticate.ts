import axios from 'axios';
import { IoauthResponse, IVerifyTokenResponse } from '../types/auth';
import { logger } from './logger';

/**
 * @param oauthcode string: oauthcode
 * @returns object containing containing auth token and status
 */
export async function verifyOauthCode(oauthcode: string): Promise<IoauthResponse | null> {
    try {
        const { UMS_AUTH_URL, UMS_AUTH_PARAM } = process.env;
        const url = `${UMS_AUTH_URL}/oauth2/token`;
        // logger.info(`oauth verification call: [${url}]`);

        const res = await axios({
            method: 'POST',
            url,
            headers: {
                Authorization: UMS_AUTH_PARAM || ''
            },
            data: {
                grantType: 'authorization_code',
                code: oauthcode
            }
        });
        const { data } = res;

        if (data.status === 'Success') {
            return {
                token: data.responseBody.accessToken,
                entityId: data.responseBody.entityId,
                userType: data.responseBody.userType
            };
        } else {
            return null;
        }
    } catch (err) {
        logger.error(err);
        return null;
    }
}

/**
 * @param oauthcode string: oauthcode
 * @returns object containing containing auth token and status
 */
export async function verifyToken(token: string): Promise<IVerifyTokenResponse | null> {
    try {
        const { UMS_AUTH_URL, UMS_AUTH_PARAM } = process.env;
        const url = `${UMS_AUTH_URL}/ums/ts/verifyToken`;
        // logger.info(`token verification call: [${url}]`);

        const res = await axios({
            method: 'GET',
            url,
            headers: {
                Authorization: UMS_AUTH_PARAM || '',
                'x-session-token': token
            }
        });
        const { data } = res;
        if (data.status === 'Success') {
            return { id: data.responseBody.entityId, userType: data.responseBody.userType };
        } else {
            return null;
        }
    } catch (err) {
        logger.error(err);
        return null;
    }
}
