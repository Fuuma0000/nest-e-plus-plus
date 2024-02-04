import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaClient } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaClient, useValue: new PrismaClient() },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaClient>(PrismaClient);
  });

  afterEach(async () => {
    // テストが終了したら PrismaClient を閉じる
    await prisma.$disconnect();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('正常系', async () => {
      const courses = [
        {
          id: 1,
          name: 'testCourse1',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'testCourse2',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];
      jest.spyOn(prisma.course, 'findMany').mockResolvedValue(courses);
      const jobs = [
        {
          id: 1,
          name: 'testJob1',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'testJob2',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];
      jest.spyOn(prisma.job, 'findMany').mockResolvedValue(jobs);

      const result = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
        username: 'testUser',
        courses_id: 1,
        enrollment_year: 2022,
        graduation_year: 2026,
        is_job_hunt_completed: false,
        self_introduction: 'Hello, I am a test user.',
        icon_url: 'url/to/icon',
        is_public_profile: true,
        created_at: new Date(),
        updated_at: new Date(),
      };
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(result);
      // workを追加
      const work = {
        work_id: 1,
        user_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      };
      jest.spyOn(prisma.bookmark, 'findUnique').mockResolvedValue({
        work_id: 1,
        user_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      });
      const user = await service.findOne(1);
      console.log(user);

      expect(user).toBe(result);
    });

    it('異常系', async () => {
      // PrismaClient の findUnique メソッドを null を返すようにモック
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);

      // サービスメソッドがスローする例外を async/await を使用して捕捉
      await expect(service.findOne(1)).rejects.toThrowError(NotFoundException);
    });
  });

  // describe('update', () => {
  //   it('should log the updateUserDto', () => {
  //     const updateUserDto: UpdateUserDto = {
  //       /* your update DTO here */
  //     };
  //     const spy = jest.spyOn(console, 'log');

  //     service.update(1, updateUserDto);

  //     expect(spy).toHaveBeenCalledWith('updateUserDto', updateUserDto);
  //   });
  // });

  // describe('remove', () => {
  //   it('should delete a user by id', async () => {
  //     jest.spyOn(prisma.user, 'delete').mockResolvedValue({
  //       id: 1,
  //       email: 'test@example.com',
  //       password: 'hashedPassword',
  //       username: 'testUser',
  //       courses_id: 1,
  //       enrollment_year: 2022,
  //       graduation_year: 2026,
  //       is_job_hunt_completed: false,
  //       self_introduction: 'Hello, I am a test user.',
  //       icon_url: 'url/to/icon',
  //       is_public_profile: true,
  //       created_at: new Date(),
  //       updated_at: new Date(),
  //     });

  //     expect(await service.remove(1)).toEqual({ id: 1 });
  //   });
  // });
});
