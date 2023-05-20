import { CategoryEntity } from '~/bundles/categories/categories.js';
import {
    defaultCategories,
    userCategoryRepository,
} from '~/bundles/user-categories/user-categories.js';
import {
    type UserSignInRequestDto,
    type UserSignInResponseDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from '~/bundles/users/types/types.js';
import { type UserService } from '~/bundles/users/user.service.js';
import { type IConfig } from '~/common/config/config.js';
import { ExceptionMessage } from '~/common/enums/enums.js';
import { HttpError } from '~/common/exceptions/exceptions.js';
import { getTemplate } from '~/common/helpers/helpers.js';
import { HttpCode } from '~/common/http/enums/enums.js';
import { type CryptService } from '~/common/services/crypt/crypt.service.js';
import { emailService } from '~/common/services/services.js';
import { type TokenService } from '~/common/services/token/token.service.js';

type User = {
    id: string;
    email: string;
};

type ConstructorType = {
    userService: UserService;
    cryptService: CryptService;
    tokenService: TokenService;
    config: IConfig;
};

class AuthService {
    private userService: UserService;
    private cryptService: CryptService;
    private tokenService: TokenService;
    private config: IConfig;

    public constructor({
        userService,
        cryptService,
        tokenService,
        config,
    }: ConstructorType) {
        this.userService = userService;
        this.cryptService = cryptService;
        this.tokenService = tokenService;
        this.config = config;
    }

    public async signUp(
        userRequestDto: UserSignUpRequestDto,
    ): Promise<UserSignUpResponseDto | undefined> {
        const isVerifyUser = await this.verifySignUpCredentials(userRequestDto);
        if (isVerifyUser) {
            const newUser = await this.userService.create(userRequestDto);
            const { id, email } = newUser.toObject();
            const token = this.tokenService.createToken({ id });
            void this.sendAfterSignUpEmail(email);

            await userCategoryRepository.createDefaultUserCategory(
                id,
                defaultCategories.map((item) =>
                    CategoryEntity.initializeNew(item),
                ),
            );

            return {
                token,
            };
        }
    }

    private async sendAfterSignUpEmail(email: string): Promise<void> {
        const htmlToSend = getTemplate({
            name: 'sign-up-email-template',
            context: {
                title: 'Atticus',
                dashboardLink: this.config.ENV.EMAIL.DASHBOARD_LINK,
                logoLink: this.config.ENV.EMAIL.APP_LOGO_LINK,
            },
        });
        await emailService.sendEmail({
            to: email,
            subject: 'Welcome to Atticus',
            text: 'Welcome to Atticus',
            html: htmlToSend,
        });
    }

    public async getUserByToken(token: string): Promise<User | undefined> {
        const { id } = this.tokenService.verifyToken(token) as User;
        if (!id) {
            throw new HttpError({
                message: ExceptionMessage.INVALID_CREDENTIALS,
                status: HttpCode.UNAUTHORIZED,
            });
        }
        const user = await this.userService.findById(id);
        return user?.toObject();
    }

    public async signIn(
        userRequestDto: UserSignInRequestDto,
    ): Promise<UserSignInResponseDto | undefined> {
        const user = await this.verifySignInCredentials(userRequestDto);
        const token = this.tokenService.createToken(user);
        return {
            token,
        };
    }

    /**
     * Verification of input data for creating a new user.
     * Returns true if the user can be registered
     *
     * @param requestUser UserSignUpRequestDto User model
     */
    private async verifySignUpCredentials(
        requestUser: UserSignUpRequestDto,
    ): Promise<boolean> {
        const { email } = requestUser;
        const user = await this.userService.findByEmail(email);
        if (user) {
            throw new HttpError({
                message: ExceptionMessage.EMAIL_ALREADY_EXISTS,
                status: HttpCode.UNPROCESSED_ENTITY,
            });
        }
        return true;
    }

    private async verifySignInCredentials(
        requestUser: UserSignInRequestDto,
    ): Promise<User> {
        const { email, password } = requestUser;
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new HttpError({
                message: ExceptionMessage.INVALID_CREDENTIALS,
                status: HttpCode.UNAUTHORIZED,
            });
        }
        const userNewObject = user.toNewObject();
        const userObject = user.toObject();
        const isEqualPassword = this.cryptService.compareSyncPassword(
            password,
            userNewObject.passwordHash,
        );
        if (!isEqualPassword) {
            throw new HttpError({
                message: ExceptionMessage.INVALID_CREDENTIALS,
                status: HttpCode.UNAUTHORIZED,
            });
        }
        return userObject;
    }
}

export { AuthService };
