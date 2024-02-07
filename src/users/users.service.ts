import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateMeDto } from './dto/update-me.dto';
import { PrismaClient } from '@prisma/client';
import { GetUserResponseDto } from './dto/get-user-resopnse.dto';
import { UpdateMeResponseDto } from './dto/update-me-response.dto';
import { GetMeResponseDto } from './dto/get-me-resopnse.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaClient) {}

  async findOne(userId: number): Promise<GetMeResponseDto> {
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
          show_profile_in_shared_url: true,
          show_profile_in_public_event: true,
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
              id: true,
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
          if (events?.works) {
            // イベントが複数ある場合、それぞれの最新の作品を取得
            return events.works
              .map((work) => {
                const workData = work.work_data[0]; // 最新の1件を取得
                if (workData) {
                  return {
                    event_id: events.id,
                    work_id: workData.id,
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

      const responseDto = new GetMeResponseDto();
      responseDto.id = user.id;
      responseDto.email = user.email;
      responseDto.username = user.username;
      responseDto.enrollment_year = user.enrollment_year;
      responseDto.graduation_year = user.graduation_year;
      responseDto.is_job_hunt_completed = user.is_job_hunt_completed;
      responseDto.self_introduction = user.self_introduction;
      responseDto.icon_url = user.icon_url;
      responseDto.show_profile_in_shared_url = user.show_profile_in_shared_url;
      responseDto.show_profile_in_public_event =
        user.show_profile_in_public_event;
      responseDto.affiliation = user.affiliation;
      responseDto.user_jobs = user.user_jobs[0].jobs[0];
      responseDto.user_urls = user.user_urls;
      responseDto.works = works;
      return responseDto;
    } catch (error) {
      console.error(error);
      throw new Error('ユーザ情報の取得に失敗しました');
    }
  }

  async findMe(userId: number): Promise<GetUserResponseDto> {
    try {
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
              id: true,
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
          if (events?.works) {
            // イベントが複数ある場合、それぞれの最新の作品を取得
            return events.works
              .map((work) => {
                const workData = work.work_data[0]; // 最新の1件を取得
                if (workData) {
                  return {
                    event_id: events.id,
                    work_id: workData.id,
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
      responseDto.affiliation = user.affiliation;
      responseDto.user_jobs = user.user_jobs[0].jobs[0];
      responseDto.user_urls = user.user_urls;
      responseDto.works = works;
      return responseDto;
    } catch (error) {
      console.error(error);
      throw new Error('ユーザ情報の取得に失敗しました');
    }
  }

  async update(
    userId: number,
    updateMeDto: UpdateMeDto,
  ): Promise<UpdateMeResponseDto> {
    // データベースからユーザーを取得
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {},
    });

    // ユーザーが存在しない場合の処理
    if (!user) {
      throw new NotFoundException('ユーザが見つかりませんでした');
    }

    // ユーザーの情報を更新
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username: updateMeDto.username,
        enrollment_year: updateMeDto.enrollment_year,
        graduation_year: updateMeDto.graduation_year,
        is_job_hunt_completed: updateMeDto.is_job_hunt_completed,
        self_introduction: updateMeDto.self_introduction,
        icon_url: updateMeDto.icon_url,
        show_profile_in_shared_url: updateMeDto.show_profile_in_shared_url,
        show_profile_in_public_event: updateMeDto.show_profile_in_public_event,
        // 希望職種に関するフィールド
        user_jobs: {
          deleteMany: {
            // 中間テーブルのデータを削除
            // skipDuplicatesでは過去のデータを削除しないので使えなかった
            user_id: userId,
          },
          createMany: {
            data: updateMeDto.user_jobs.map((jobId) => {
              return {
                job_id: jobId,
              };
            }),
          },
        },
        user_urls: {
          deleteMany: {
            // 削除条件を指定（今回は全て削除）
            user_id: userId,
          },
          createMany: {
            data: updateMeDto.user_urls.map((url) => {
              return {
                name: url.name,
                url: url.url,
              };
            }),
          },
        },
        affiliation: {
          connect: {
            id: updateMeDto.affiliation_id,
          },
        },
      },
    });

    // 希望職種と外部URLを含めたユーザー情報を取得
    // idしか受け取っていないので、nameはここで取得する
    const updatedUserWithRelations = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        username: true,
        enrollment_year: true,
        graduation_year: true,
        is_job_hunt_completed: true,
        self_introduction: true,
        icon_url: true,
        show_profile_in_shared_url: true,
        show_profile_in_public_event: true,
        affiliation: true,
        user_jobs: {
          include: {
            jobs: true,
          },
        },
        user_urls: true,
      },
    });

    const responseDto = new UpdateMeResponseDto();

    responseDto.username = updatedUserWithRelations.username;
    responseDto.enrollment_year = updatedUserWithRelations.enrollment_year;
    responseDto.graduation_year = updatedUserWithRelations.graduation_year;
    responseDto.is_job_hunt_completed =
      updatedUserWithRelations.is_job_hunt_completed;
    responseDto.self_introduction = updatedUserWithRelations.self_introduction;
    responseDto.icon_url = updatedUserWithRelations.icon_url;
    responseDto.show_profile_in_shared_url =
      updatedUserWithRelations.show_profile_in_shared_url;
    responseDto.show_profile_in_public_event =
      updatedUserWithRelations.show_profile_in_public_event;
    console.log(updatedUserWithRelations.affiliation);
    responseDto.affiliation = {
      id: updatedUserWithRelations.affiliation.id,
      name: updatedUserWithRelations.affiliation.name,
    };
    responseDto.user_jobs = updatedUserWithRelations.user_jobs.map(
      (userJob) => {
        return {
          id: userJob.jobs.id,
          name: userJob.jobs.name,
        };
      },
    );
    responseDto.user_urls = updatedUserWithRelations.user_urls.map(
      (userUrl) => {
        return {
          name: userUrl.name,
          url: userUrl.url,
        };
      },
    );

    return responseDto;
  }

  // remove(userId: number) {
  // Foreign key constraint failed on the field:になる
  // onDelete: Cascadeとかにするか、deleteManyで削除する

  //   return this.prisma.user.delete({
  //     where: {
  //       id: userId,
  //     },
  //   });
  // }
}
