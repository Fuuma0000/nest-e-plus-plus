import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { GetUserResponseDto } from './dto/get-user-resopnse.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaClient) {}

  async findOne(userId: number): Promise<GetUserResponseDto> {
    try {
      // TODO: 検索したユーザが同じイベントに参加していなければ、403エラーを返す
      // TODO: 同じ参加しているイベントのeventのis_requires_passwordがtrueなら、テーブルのshow_profile_in_public_eventを確認し、falseなら403エラーを返す

      // ユーザ情報を取得
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          email: true,
          username: true,
          enrollment_year: true,
          graduation_year: true,
          is_job_hunt_completed: true,
          self_introduction: true,
          icon_url: true,
          // 所属
          affiliation: {
            select: {
              id: true,
              name: true,
            },
          },
          // 希望職種
          user_jobs: {
            select: {
              jobs: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          // 外部URL
          user_urls: {
            select: {
              name: true,
              url: true,
            },
          },
        },
      });

      if (!user) {
        // ユーザが存在しない場合、NotFoundExceptionをスロー
        throw new NotFoundException(`ユーザが見つかりませんでした`);
      }
      // ユーザの参加イベント情報を取得
      const getWorks = await this.prisma.event_user_authority.findMany({
        where: {
          user_id: userId,
        },
        select: {
          events: {
            select: {
              works: {
                select: {
                  work_data: {
                    where: {
                      is_approved: true, // 校閲済みの作品のみ取得
                    },
                    orderBy: {
                      updated_at: 'desc', // 更新日時の降順で取得
                    },
                    take: 1, // 最新の1件のみ取得
                    select: {
                      id: true,
                      name: true,
                      catch_copy: true,
                      work_data_images: {
                        // 作品画像
                        select: {
                          url: true,
                          order: true,
                        },
                        where: {
                          order: 1, // 1枚目はサムネイルなので画像のみ取得
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });

      // 作品情報を整形
      const works = getWorks
        .map((eventAuthority) => {
          const events = eventAuthority?.events;
          console.log('events', events);
          if (events?.works) {
            // イベントが複数ある場合、それぞれの最新の作品を取得
            return events.works
              .map((work) => {
                const workData = work.work_data[0]; // 最新の1件を取得
                if (workData) {
                  return {
                    id: workData.id,
                    name: workData.name,
                    catch_copy: workData.catch_copy,
                    thumbnail: workData.work_data_images?.[0]?.url || null,
                  };
                }
                return null;
              })
              .filter(Boolean); // null を取り除く
          }
          return [];
        })
        .flat(); // ネストした配列を平坦化

      const responseDto = new GetUserResponseDto();
      responseDto.id = user.id;
      responseDto.email = user.email;
      responseDto.username = user.username;
      responseDto.enrollment_year = user.enrollment_year;
      responseDto.graduation_year = user.graduation_year;
      responseDto.is_job_hunt_completed = user.is_job_hunt_completed;
      responseDto.self_introduction = user.self_introduction;
      responseDto.icon_url = user.icon_url;
      responseDto.affiliation = user.affiliation[0];
      responseDto.user_jobs = user.user_jobs[0].jobs[0];
      responseDto.user_urls = user.user_urls;
      responseDto.works = works;
      return responseDto;
    } catch (error) {
      console.error(error);
      throw new Error('ユーザ情報の取得に失敗しました');
    }
  }

  update(userId: number, updateUserDto: UpdateUserDto) {
    console.log('updateUserDto', updateUserDto);
  }

  remove(userId: number) {
    return this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
