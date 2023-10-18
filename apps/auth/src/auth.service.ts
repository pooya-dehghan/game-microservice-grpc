import { Injectable } from '@nestjs/common';
import {
  RessetPasswordRequest,
  RessetPasswordResponse,
  SignUpRequest,
  SignUpResponse,
  LoginReqeust,
  LoginResponse,
} from '@app/common';
import { DatabaseService } from '../../../libs/common/src/database/database.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  GrpcNotFoundException,
  GrpcAlreadyExistsException,
  GrpcInvalidArgumentException,
} from 'nestjs-grpc-exceptions';

@Injectable()
export class AuthService {
  constructor(
    private dataBaseService: DatabaseService,
    private jwtService: JwtService,
  ) {}
  saltRounds: number = 10;

  async signUp(SignUpRequest: SignUpRequest): Promise<SignUpResponse> {
    const { username, password } = SignUpRequest;
    const uesrFound = await this.dataBaseService.user.findUnique({
      where: {
        username: username,
      },
    });
    if (uesrFound) {
      throw new GrpcAlreadyExistsException('User Found with this user name.');
    }

    const salt = await bcrypt.genSalt(this.saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const createdUser = await this.dataBaseService.user.create({
      data: {
        username: username,
        password: hashedPassword,
      },
    });
<<<<<<< HEAD
    console.log('createdUser: ', createdUser);
=======
>>>>>>> develop
    const token = await this.assignToken(createdUser);
    return { username, token };
  }

  async login(loginRequest: LoginReqeust): Promise<LoginResponse> {
    const { username, password } = loginRequest;
    const userFound = await this.dataBaseService.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!userFound) {
      throw new GrpcNotFoundException('there is no user with this username');
    }
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      throw new GrpcInvalidArgumentException(
        'password provided is not match with the credentials',
      );
    }
    const token = await this.assignToken(userFound);
    return { username, token };
  }

  async ressetPassword(
    request: RessetPasswordRequest,
  ): Promise<RessetPasswordResponse> {
    const { username, password, newPassword, newPasswordRepeat } = request;
    const userFound = await this.dataBaseService.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!userFound) {
      throw new GrpcNotFoundException('there is not a user with this username');
    }
    if (newPassword != newPasswordRepeat) {
      throw new GrpcInvalidArgumentException(
        'there is a mis match for new password and confirm password',
      );
    }
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      throw new GrpcInvalidArgumentException(
        'password provided is invalid please try again',
      );
    }
    const salt = await bcrypt.genSalt(this.saltRounds);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    const updatedUser = await this.dataBaseService.user.update({
      where: {
        username: username,
      },
      data: {
        password: hashedPassword,
      },
    });
    const token = await this.assignToken(updatedUser);
    return { username, token };
  }

  async verifyAccessToken(request: any): Promise<any> {
    const verified = this.jwtService.verify(request.token);
    if (verified) {
      return verified;
    }
  }

  async validateUserById(userId: number): Promise<any> {
    return this.dataBaseService.user.findUnique({ where: { id: userId } });
  }

  async assignToken(user: any): Promise<string> {
    const token = this.jwtService.sign({
      id: user.id,
      username: user.username,
    });
    return token;
  }

  async isUserAdmin({ userID, gameID }) {
    const userFound = await this.dataBaseService.user.findUnique({
      where: {
        id: userID,
      },
    });
    if (!userFound) {
      throw new GrpcNotFoundException('there is no user with this id');
    }
    const gameFound = await this.dataBaseService.game.findUnique({
      where: {
        id: gameID,
      },
    });
    if (!gameFound) {
      throw new GrpcNotFoundException('there is no game with this id');
    }
    const gamesCreateID = gameFound.id;
    if (userID != gamesCreateID) {
      return false;
    }
    return true;
  }
}
