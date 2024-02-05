// import { Test, TestingModule } from '@nestjs/testing';
// import { UsersService } from './users.service';
// import { PrismaClient } from '@prisma/client';
// import { NotFoundException } from '@nestjs/common';

// describe('UsersService', () => {
//   let service: UsersService;
//   let prisma: PrismaClient;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         UsersService,
//         { provide: PrismaClient, useValue: new PrismaClient() },
//       ],
//     }).compile();

//     service = module.get<UsersService>(UsersService);
//     prisma = module.get<PrismaClient>(PrismaClient);

//     // affiliationを追加
//     const affiliations = [
//       {
//         id: 0,
//         name: 'testAffiliation0',
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         id: 1,
//         name: 'testAffiliation1',
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         id: 2,
//         name: 'testAffiliation2',
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//     ];
//     jest.spyOn(prisma.affiliation, 'findMany').mockResolvedValue(affiliations);
//     // jobを追加
//     const jobs = [
//       {
//         id: 0,
//         name: 'testJob0',
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         id: 1,
//         name: 'testJob1',
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         id: 2,
//         name: 'testJob2',
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//     ];
//     jest.spyOn(prisma.job, 'findMany').mockResolvedValue(jobs);
//     // userを追加
//     const users = [
//       {
//         id: 0,
//         email: 'test0@example.com',
//         password: 'hashedPassword',
//         username: 'testUser0',
//         affiliation_id: 0,
//         enrollment_year: 2022,
//         graduation_year: 2026,
//         is_job_hunt_completed: false,
//         self_introduction: 'Hello, I am a test user.',
//         icon_url: 'url/to/icon',
//         show_profile_in_shared_url: true,
//         show_profile_in_public_event: true,
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         id: 1,
//         email: 'test1@example.com',
//         password: 'hashedPassword',
//         username: 'testUser1',
//         affiliation_id: 1,
//         enrollment_year: 2023,
//         graduation_year: 2027,
//         is_job_hunt_completed: false,
//         self_introduction: 'Hello, I am a test1 user.',
//         icon_url: 'url/to/icon',
//         show_profile_in_shared_url: false,
//         show_profile_in_public_event: true,
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         id: 2,
//         email: 'test2@example.com',
//         password: 'hashedPassword',
//         username: 'testUser',
//         affiliation_id: 2,
//         enrollment_year: 2024,
//         graduation_year: 2028,
//         is_job_hunt_completed: false,
//         self_introduction: 'Hello, I am a test2 user.',
//         icon_url: 'url/to/icon',
//         show_profile_in_shared_url: false,
//         show_profile_in_public_event: false,
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//     ];
//     jest.spyOn(prisma.user, 'findMany').mockResolvedValue(users);
//     // eventを追加
//     const event = [
//       {
//         id: 0,
//         name: 'testEvent0',
//         start_at: new Date(),
//         end_at: new Date(),
//         icon_url: 'url/to/icon',
//         description: 'testDescription',
//         need_proofreading: true,
//         is_requires_password: true,
//         password: 'password',
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         id: 1,
//         name: 'testEvent1',
//         start_at: new Date(),
//         end_at: new Date(),
//         icon_url: 'url/to/icon',
//         description: 'testDescription',
//         need_proofreading: true,
//         is_requires_password: true,
//         password: 'password',
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         id: 2,
//         name: 'testEvent2',
//         start_at: new Date(),
//         end_at: new Date(),
//         icon_url: 'url/to/icon',
//         description: 'testDescription',
//         need_proofreading: true,
//         is_requires_password: true,
//         password: 'password',
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//     ];
//     jest.spyOn(prisma.event, 'findMany').mockResolvedValue(event);
//     // workを追加
//     const works = [
//       {
//         id: 0,
//         event_id: 0,
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         id: 1,
//         event_id: 0,
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         id: 2,
//         event_id: 1,
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//     ];
//     jest.spyOn(prisma.work, 'findMany').mockResolvedValue(works);
//     // work_dataを追加
//     const workData = [
//       {
//         id: 0,
//         work_id: 0,
//         name: 'testWorkData0',
//         catch_copy: 'testCatchCopy0',
//         description: 'testDescription0',
//         work_url: 'https://work.example0.com',
//         movie_url: 'https://movie.example0.com',
//         system_diagram_url: 'https://system.example0.com',
//         detail: 'testDetail0',
//         is_approved: true,
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         id: 1,
//         work_id: 0,
//         name: 'testWorkData1',
//         catch_copy: 'testCatchCopy1',
//         description: 'testDescription1',
//         work_url: 'https://work.example1.com',
//         movie_url: 'https://movie.example1.com',
//         system_diagram_url: 'https://system.example1.com',
//         detail: 'testDetail1',
//         is_approved: false,
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         id: 2,
//         work_id: 1,
//         name: 'testWorkData2',
//         catch_copy: 'testCatchCopy2',
//         description: 'testDescription2',
//         work_url: 'https://work.example2.com',
//         movie_url: 'https://movie.example2.com',
//         system_diagram_url: 'https://system.example2.com',
//         detail: 'testDetail2',
//         is_approved: true,
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//     ];
//     jest.spyOn(prisma.work_data, 'findMany').mockResolvedValue(workData);
//     // work_data_imageを追加
//     const workDataImages = [
//       {
//         id: 0,
//         work_data_id: 0,
//         url: 'https://image.example0.com',
//         order: 0,
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         id: 1,
//         work_data_id: 0,
//         url: 'https://image.example1.com',
//         order: 1,
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         id: 2,
//         work_data_id: 1,
//         url: 'https://image.example2.com',
//         order: 0,
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//     ];
//     jest
//       .spyOn(prisma.work_data_image, 'findMany')
//       .mockResolvedValue(workDataImages);
//     // authorityを追加
//     const authorities = [
//       {
//         id: 0,
//         name: 'admin',
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         id: 1,
//         name: 'staff',
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         id: 2,
//         name: 'general',
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//     ];
//     jest.spyOn(prisma.authority, 'findMany').mockResolvedValue(authorities);

//     // event_user_authorityを追加
//     const eventUserAuthority = [
//       {
//         event_id: 0,
//         user_id: 0,
//         authority_id: 0,
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         event_id: 0,
//         user_id: 1,
//         authority_id: 1,
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         event_id: 1,
//         user_id: 0,
//         authority_id: 2,
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//     ];
//     jest
//       .spyOn(prisma.event_user_authority, 'findMany')
//       .mockResolvedValue(eventUserAuthority);

//     // user_jobを追加
//     const userJobs = [
//       {
//         user_id: 0,
//         job_id: 0,
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         user_id: 1,
//         job_id: 1,
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         user_id: 2,
//         job_id: 2,
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//     ];
//     jest.spyOn(prisma.user_job, 'findMany').mockResolvedValue(userJobs);
//     // workを追加
//     const bookmarks = [
//       {
//         work_id: 0,
//         user_id: 0,
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         work_id: 1,
//         user_id: 0,
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         work_id: 2,
//         user_id: 1,
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//     ];
//     jest.spyOn(prisma.bookmark, 'findMany').mockResolvedValue(bookmarks);

//     // user_urlを追加
//     const userUrls = [
//       {
//         id: 0,
//         user_id: 0,
//         name: 'user_url0',
//         url: 'https://example.com',
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         id: 1,
//         user_id: 0,
//         name: 'user_url1',
//         url: 'https://example.com',
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         id: 2,
//         user_id: 1,
//         name: 'user_url2',
//         url: 'https://example.com',
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//     ];
//     jest.spyOn(prisma.user_url, 'findMany').mockResolvedValue(userUrls);
//     // toolを追加
//     const tools = [
//       {
//         id: 0,
//         name: 'tool0',
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         id: 1,
//         name: 'tool1',
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         id: 2,
//         name: 'tool2',
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//     ];
//     jest.spyOn(prisma.tool, 'findMany').mockResolvedValue(tools);
//     // work_data_toolを追加
//     const workDataTools = [
//       {
//         work_data_id: 0,
//         tool_id: 0,
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         work_data_id: 0,
//         tool_id: 1,
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         work_data_id: 1,
//         tool_id: 2,
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         work_data_id: 1,
//         tool_id: 2,
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//     ];
//     jest
//       .spyOn(prisma.work_data_tool, 'findMany')
//       .mockResolvedValue(workDataTools);
//     // genreを追加
//     const genres = [
//       {
//         id: 0,
//         name: 'genre0',
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         id: 1,
//         name: 'genre1',
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         id: 2,
//         name: 'genre2',
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//     ];
//     jest.spyOn(prisma.genre, 'findMany').mockResolvedValue(genres);
//     // work_data_genreを追加
//     const workDataGenres = [
//       {
//         work_data_id: 0,
//         genre_id: 0,
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         work_data_id: 0,
//         genre_id: 1,
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         work_data_id: 1,
//         genre_id: 2,
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         work_data_id: 1,
//         genre_id: 2,
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//     ];
//     jest
//       .spyOn(prisma.work_data_genre, 'findMany')
//       .mockResolvedValue(workDataGenres);
//     // technologyを追加
//     const technologies = [
//       {
//         id: 0,
//         name: 'technology0',
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         id: 1,
//         name: 'technology1',
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         id: 2,
//         name: 'technology2',
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//     ];
//     jest.spyOn(prisma.technology, 'findMany').mockResolvedValue(technologies);
//     // work_data_technologyを追加
//     const workDataTechnologies = [
//       {
//         work_data_id: 0,
//         technology_id: 0,
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         work_data_id: 0,
//         technology_id: 1,
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         work_data_id: 1,
//         technology_id: 2,
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         work_data_id: 1,
//         technology_id: 2,
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//     ];
//     jest
//       .spyOn(prisma.work_data_technology, 'findMany')
//       .mockResolvedValue(workDataTechnologies);
//     // work_data_userを追加
//     const workDataUsers = [
//       {
//         work_data_id: 0,
//         user_id: 0,
//         role_explanation: 'testRoleExplanation0',
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         work_data_id: 0,
//         user_id: 1,
//         role_explanation: 'testRoleExplanation1',
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         work_data_id: 1,
//         user_id: 2,
//         role_explanation: 'testRoleExplanation2',
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         work_data_id: 1,
//         user_id: 3,
//         role_explanation: 'testRoleExplanation3',
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//     ];
//     jest
//       .spyOn(prisma.work_data_user, 'findMany')
//       .mockResolvedValue(workDataUsers);
//     // work_share_urlを追加
//     const workShareUrls = [
//       {
//         id: '7e1d5031-8365-98d3-9e6e-e55552fd5d1f',
//         work_id: 0,
//         token: 'testToken0',
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         id: '38055554-b901-0a66-ab9a-a52b16e473a9',
//         work_id: 1,
//         token: 'testToken1',
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         id: 'fad34bca-153a-0ed5-db2d-4f3c0c4863e7',
//         work_id: 2,
//         token: 'testToken2',
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//     ];
//     jest
//       .spyOn(prisma.work_share_url, 'findMany')
//       .mockResolvedValue(workShareUrls);
//   });

//   afterEach(async () => {
//     // テストが終了したら PrismaClient を閉じる
//     await prisma.$disconnect();
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   describe('findOne', () => {
//     it('正常系', async () => {
//       const result = {
//         id: 0,
//       };
//       const test = await service.findOne(0);
//       console.log(test);

//       expect(test).toBe(result);
//     });

//     it('異常系', async () => {
//       // PrismaClient の findUnique メソッドを null を返すようにモック
//       jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);

//       // サービスメソッドがスローする例外を async/await を使用して捕捉
//       await expect(service.findOne(0)).rejects.toThrowError(NotFoundException);
//     });
//   });

//   // describe('update', () => {
//   //   it('should log the updateUserDto', () => {
//   //     const updateUserDto: UpdateUserDto = {
//   //       /* your update DTO here */
//   //     };
//   //     const spy = jest.spyOn(console, 'log');

//   //     service.update(0, updateUserDto);

//   //     expect(spy).toHaveBeenCalledWith('updateUserDto', updateUserDto);
//   //   });
//   // });

//   // describe('remove', () => {
//   //   it('should delete a user by id', async () => {
//   //     jest.spyOn(prisma.user, 'delete').mockResolvedValue({
//   //       id: 0,
//   //       email: 'test@example.com',
//   //       password: 'hashedPassword',
//   //       username: 'testUser',
//   //       courses_id: 0,
//   //       enrollment_year: 1011,
//   //       graduation_year: 1016,
//   //       is_job_hunt_completed: false,
//   //       self_introduction: 'Hello, I am a test user.',
//   //       icon_url: 'url/to/icon',
//   //       is_public_profile: true,
//   //       created_at: new Date(),
//   //       updated_at: new Date(),
//   //     });

//   //     expect(await service.remove(0)).toEqual({ id: 0 });
//   //   });
//   // });
// });
