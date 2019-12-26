import authReducer from './authReducer';
import { AUTH_START, AUTH_SUCCESS, AUTH_FAILED, AUTH_LOGOUT, AUTH_EMAIL } from '../actions/types';

describe('authReducer', () => {
    it('should return the initial state', () => {
        expect(authReducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            email: null
        });
    });

    it('should store token and userId after login', () => {
        expect(authReducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            email: null
        }, {
            type: AUTH_SUCCESS,
            idToken: 'some-token',
            userId: 'some-id'       
        })).toEqual({
            token: 'some-token',
            userId: 'some-id',
            error: null,
            loading: false,
            email: null
        });
    });

    it('should store error', () => {
        expect(authReducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            email: null
        }, {
            type: AUTH_FAILED,
            error: 'some-error',
            loading: false       
        })).toEqual({
            token: null,
            userId: null,
            error: 'some-error',
            loading: false,
            email: null
        });
    });
});