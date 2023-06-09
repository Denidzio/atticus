import {
    type UserProfileResponseDto,
    type UserUpdateRequestDto,
    type UserUpdateResponseDto,
} from 'shared/build/';

import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { HttpApi } from '~/framework/api/api.js';
import { type IHttp } from '~/framework/http/http.js';
import { type IStorage } from '~/framework/storage/storage.js';

import { UsersApiPath } from './enums/enums.js';
import { type UserGetAllResponseDto } from './types/types.js';

type uploadPayload = {
    email: string;
    userProfile: Partial<UserUpdateRequestDto>;
};

type Constructor = {
    baseUrl: string;
    http: IHttp;
    storage: IStorage;
};

class UserApi extends HttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.USERS, baseUrl, http, storage });
    }

    public async getAll(): Promise<UserGetAllResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(UsersApiPath.ROOT, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: false,
            },
        );

        return await response.json<UserGetAllResponseDto>();
    }

    public async loadUser(): Promise<UserProfileResponseDto | undefined> {
        const response = await this.load(
            this.getFullEndpoint(UsersApiPath.GET_USER, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        setTimeout(() => false, 5000);
        return await response.json<UserProfileResponseDto>();
    }

    public async updateUser(
        payload: uploadPayload,
    ): Promise<UserUpdateResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(UsersApiPath.ROOT, {}),
            {
                method: 'PUT',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );

        return response.json<UserUpdateResponseDto>();
    }

    public async delete(
        token: string,
    ): Promise<Response & { json<T = unknown>(): Promise<T> }> {
        return await this.load(
            this.getFullEndpoint(UsersApiPath.ROOT, { token }),
            {
                method: 'DELETE',
                contentType: ContentType.JSON,
                hasAuth: true,
                payload: JSON.stringify({ token }),
            },
        );
    }
}

export { UserApi };
