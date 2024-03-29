import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@modules/authentication/authentication.module';
import { UserController } from '@modules/user/controllers/user.controller';
import { UserService } from '@modules/user/services/user.service';
import { USER_REPOSITORY } from '@shared/constants/constants';
import { User } from '@modules/user/models/user.model';
import { MessageModule } from '@modules/message/message.module';
import { LoggerModule } from '@modules/logger/logger.module';

export const usersProvider = {
  provide: USER_REPOSITORY,
  useValue: User,
};

@Module({
  imports: [MessageModule,AuthenticationModule, LoggerModule],
  controllers: [UserController],
  providers: [UserService, usersProvider],
  exports: [UserService, usersProvider],
})
export class UserModule {}
