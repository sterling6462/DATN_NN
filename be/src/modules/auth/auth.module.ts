import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '../../config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports:[JwtModule.register({
    global: true,
    secret: ConfigService.getInstance().get("JWT_SECRET"),
    signOptions: { expiresIn: '60s' },
  }),],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
