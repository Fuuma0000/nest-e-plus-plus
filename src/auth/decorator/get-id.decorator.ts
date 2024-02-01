import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetId = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user.userId; // ユーザーオブジェクトから 'userId' を取得して返す
  },
);
