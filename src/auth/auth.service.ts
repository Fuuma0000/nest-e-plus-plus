import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { SES } from '@aws-sdk/client-ses';
import { SigninUserDto } from './dto/signin-user.dto';
import { JwtService } from '@nestjs/jwt';

const SES_CONFIG = {
  region: process.env.SES_REGION,
  credentials: {
    accessKeyId: process.env.SES_ACCESS_KEY_ID,
    secretAccessKey: process.env.SES_SECRET_ACCESS_KEY,
  },
};

const AWS_SES = new SES(SES_CONFIG);

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma = new PrismaClient(),
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    const { email, password } = createUserDto;

    // 既に users テーブルに同じメールアドレスが存在するか確認
    const existingUser = await this.prisma.user.findUnique({
      where: { email: email },
    });

    // 既に存在する場合はエラーをスロー
    if (existingUser) {
      throw new ConflictException(
        '指定されたメールアドレスは既に登録されています',
      );
    }

    // 既に signup_verification テーブルに同じメールアドレスが存在するか確認
    const existingSignupVerification =
      await this.prisma.signup_verification.findUnique({
        where: { email: email },
      });

    // トークンの有効期限が切れていたら削除する
    // 有効期限内ならエラーをスロー
    // 存在しない場合は継続
    if (existingSignupVerification) {
      const now = new Date();
      if (existingSignupVerification.expired_at < now) {
        await this.prisma.signup_verification.delete({
          where: { email: email },
        });
      } else {
        throw new ConflictException(
          '指定されたメールアドレスは既に登録されています',
        );
      }
    }

    // パスワードのハッシュ化
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // トークンの作成
    const token: string = crypto.randomBytes(32).toString('hex');

    // トークンの有効期限を作成
    const expired_at = new Date();
    expired_at.setHours(expired_at.getHours() + 1);

    // メールの内容を作成
    const params = {
      Source: process.env.SES_SENDER as string,
      Destination: {
        ToAddresses: [email],
      },
      ReplyToAddresses: [],
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            // TODO: 本番環境用のURLに変更する
            // TODO: 本文をちゃんと書く
            Data: `<html><body><h1>リンクをクリックしてください</h1><p>${process.env.SITE_URL}/auth/signup/verify?email=${email}&token=${token}</p></body></html>`,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'メールアドレス確認',
        },
      },
    };

    try {
      await AWS_SES.sendEmail(params);
    } catch (err) {
      console.log(err);
      throw new Error('メールの送信に失敗しました');
    }

    // 仮登録情報をDBに保存
    const signupVerification = await this.prisma.signup_verification.create({
      data: {
        email: email,
        password: hashedPassword,
        token,
        expired_at,
      },
    });

    if (!signupVerification) {
      throw new Error('仮登録情報の保存に失敗しました');
    }

    return signupVerification;
  }

  async signIn(signINUserDto: SigninUserDto): Promise<{ accessToken: string }> {
    const { email, password } = signINUserDto;
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { sub: user.id, username: user.username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    }

    throw new UnauthorizedException('ユーザ名かパスワードが間違っています');
  }

  async verify(email: string, token: string): Promise<any> {
    //signup_verificationに同じメールアドレスが存在するか確認
    const temporaryUser = await this.prisma.signup_verification.findUnique({
      where: {
        email: email,
      },
    });

    // トークンの有効期限が切れているか確認
    const now = new Date();
    if (temporaryUser.expired_at < now) {
      // 有効期限切れならsignup_verificationから削除
      await this.prisma.signup_verification.delete({
        where: {
          email: email,
        },
      });
      throw new UnauthorizedException('有効期限が切れています');
    }

    // トークンが一致するか確認
    if (temporaryUser.token !== token) {
      throw new UnauthorizedException('トークンが一致しません');
    }
    // 一致したらusersテーブルに登録
    const user = await this.prisma.user.create({
      data: {
        email: temporaryUser.email,
        password: temporaryUser.password,
      },
    });

    // 仮登録情報は一括で削除するのでやらない
    return user;
  }
}
