import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const affiliations = [
    {
      name: 'testAffiliation1',
    },
    {
      name: 'testAffiliation2',
    },
    {
      name: 'testAffiliation3',
    },
  ];

  const jobs = [
    {
      name: 'testJob1',
    },
    {
      name: 'testJob2',
    },
    {
      name: 'testJob3',
    },
  ];

  const users = [
    {
      email: 'test1@example.com',
      password: '$2b$10$xrkG.1.hbnQxxab1jyCwJuObkvqsmy42I9q5HIaCHDTzGKyjORyim',
      username: 'testUser1',
      affiliation_id: 1,
      enrollment_year: 2022,
      graduation_year: 2026,
      is_job_hunt_completed: false,
      self_introduction: 'Hello, I am a test1 user.',
      icon_url: 'url/to/icon',
      show_profile_in_shared_url: true,
      show_profile_in_public_event: true,
    },
    {
      email: 'test2@example.com',
      password: 'hashedPassword',
      username: 'testUser2',
      affiliation_id: 1,
      enrollment_year: 2023,
      graduation_year: 2027,
      is_job_hunt_completed: false,
      self_introduction: 'Hello, I am a test2 user.',
      icon_url: 'url/to/icon',
      show_profile_in_shared_url: false,
      show_profile_in_public_event: true,
    },
    {
      email: 'test3@example.com',
      password: 'hashedPassword',
      username: 'testUser',
      affiliation_id: 3,
      enrollment_year: 2024,
      graduation_year: 2028,
      is_job_hunt_completed: false,
      self_introduction: 'Hello, I am a test3 user.',
      icon_url: 'url/to/icon',
      show_profile_in_shared_url: false,
      show_profile_in_public_event: false,
    },
  ];
  const events = [
    {
      name: 'testEvent1',
      start_at: new Date(),
      end_at: new Date(),
      icon_url: 'url/to/icon',
      description: 'testDescription1',
      need_proofreading: true,
      is_requires_password: true,
      password: 'password',
    },
    {
      name: 'testEvent2',
      start_at: new Date(),
      end_at: new Date(),
      icon_url: 'url/to/icon',
      description: 'testDescription2',
      need_proofreading: true,
      is_requires_password: true,
      password: 'password',
    },
    {
      name: 'testEvent3',
      start_at: new Date(),
      end_at: new Date(),
      icon_url: 'url/to/icon',
      description: 'testDescription3',
      need_proofreading: true,
      is_requires_password: true,
      password: 'password',
    },
  ];
  const works = [
    {
      event_id: 1,
    },
    {
      event_id: 1,
    },
    {
      event_id: 2,
    },
  ];
  const workData = [
    {
      work_id: 1,
      name: 'testWorkData1',
      catch_copy: 'testCatchCopy1',
      description: 'testDescription1',
      work_url: 'https://work.example1.com',
      movie_url: 'https://movie.example1.com',
      system_diagram_url: 'https://system.example1.com',
      detail: 'testDetail1',
      is_approved: true,
    },
    {
      work_id: 1,
      name: 'testWorkData2',
      catch_copy: 'testCatchCopy2',
      description: 'testDescription2',
      work_url: 'https://work.example2.com',
      movie_url: 'https://movie.example2.com',
      system_diagram_url: 'https://system.example2.com',
      detail: 'testDetail2',
      is_approved: false,
    },
    {
      work_id: 2,
      name: 'testWorkData3',
      catch_copy: 'testCatchCopy3',
      description: 'testDescription3',
      work_url: 'https://work.example3.com',
      movie_url: 'https://movie.example3.com',
      system_diagram_url: 'https://system.example3.com',
      detail: 'testDetail3',
      is_approved: true,
    },
  ];
  const workDataImages = [
    {
      work_data_id: 1,
      url: 'https://image.example1.com',
      order: 1,
    },
    {
      work_data_id: 1,
      url: 'https://image.example2.com',
      order: 2,
    },
    {
      work_data_id: 2,
      url: 'https://image.example3.com',
      order: 1,
    },
  ];
  const authorities = [
    {
      name: 'admin',
    },
    {
      name: 'staff',
    },
    {
      name: 'general',
    },
  ];
  const eventUserAuthority = [
    {
      event_id: 1,
      user_id: 1,
      authority_id: 1,
    },
    {
      event_id: 1,
      user_id: 2,
      authority_id: 2,
    },
    {
      event_id: 2,
      user_id: 1,
      authority_id: 3,
    },
  ];
  const userJobs = [
    {
      user_id: 1,
      job_id: 1,
    },
    {
      user_id: 2,
      job_id: 2,
    },
    {
      user_id: 3,
      job_id: 3,
    },
  ];
  const bookmarks = [
    {
      work_id: 1,
      user_id: 1,
    },
    {
      work_id: 2,
      user_id: 1,
    },
    {
      work_id: 3,
      user_id: 2,
    },
  ];
  const userUrls = [
    {
      user_id: 1,
      name: 'user_url1',
      url: 'https://example1.com',
    },
    {
      user_id: 1,
      name: 'user_url2',
      url: 'https://example2.com',
    },
    {
      user_id: 2,
      name: 'user_url3',
      url: 'https://example3.com',
    },
  ];
  const tools = [
    {
      name: 'tool1',
    },
    {
      name: 'tool2',
    },
    {
      name: 'tool3',
    },
  ];
  const workDataTools = [
    {
      work_data_id: 1,
      tool_id: 1,
    },
    {
      work_data_id: 1,
      tool_id: 2,
    },
    {
      work_data_id: 2,
      tool_id: 3,
    },
    {
      work_data_id: 2,
      tool_id: 2,
    },
  ];
  const genres = [
    {
      name: 'genre1',
    },
    {
      name: 'genre2',
    },
    {
      name: 'genre3',
    },
  ];
  const workDataGenres = [
    {
      work_data_id: 1,
      genre_id: 1,
    },
    {
      work_data_id: 1,
      genre_id: 2,
    },
    {
      work_data_id: 2,
      genre_id: 3,
    },
    {
      work_data_id: 2,
      genre_id: 2,
    },
  ];
  const technologies = [
    {
      name: 'technology1',
    },
    {
      name: 'technology2',
    },
    {
      name: 'technology3',
    },
  ];
  const workDataTechnologies = [
    {
      work_data_id: 1,
      technology_id: 1,
    },
    {
      work_data_id: 1,
      technology_id: 2,
    },
    {
      work_data_id: 2,
      technology_id: 3,
    },
    {
      work_data_id: 2,
      technology_id: 2,
    },
  ];
  const workDataUsers = [
    {
      work_data_id: 1,
      user_id: 1,
      role_explanation: 'testRoleExplanation1',
    },
    {
      work_data_id: 1,
      user_id: 2,
      role_explanation: 'testRoleExplanation2',
    },
    {
      work_data_id: 2,
      user_id: 1,
      role_explanation: 'testRoleExplanation1',
    },
    {
      work_data_id: 2,
      user_id: 3,
      role_explanation: 'testRoleExplanation3',
    },
    {
      work_data_id: 3,
      user_id: 1,
      role_explanation: 'testRoleExplanation3-1',
    },
  ];
  const workShareUrls = [
    {
      work_id: 1,
      token: 'testToken1',
    },
    {
      work_id: 2,
      token: 'testToken2',
    },
    {
      work_id: 3,
      token: 'testToken3',
    },
  ];

  // データをデータベースに挿入
  await prisma.affiliation.createMany({
    data: affiliations,
  });

  await prisma.job.createMany({
    data: jobs,
  });

  await prisma.user.createMany({
    data: users,
  });

  await prisma.event.createMany({
    data: events,
  });

  await prisma.work.createMany({
    data: works,
  });

  await prisma.work_data.createMany({
    data: workData,
  });

  await prisma.work_data_image.createMany({
    data: workDataImages,
  });

  await prisma.authority.createMany({
    data: authorities,
  });

  await prisma.event_user_authority.createMany({
    data: eventUserAuthority,
  });

  await prisma.user_job.createMany({
    data: userJobs,
  });

  await prisma.bookmark.createMany({
    data: bookmarks,
  });

  await prisma.user_url.createMany({
    data: userUrls,
  });

  await prisma.tool.createMany({
    data: tools,
  });

  await prisma.work_data_tool.createMany({
    data: workDataTools,
  });

  await prisma.genre.createMany({
    data: genres,
  });

  await prisma.work_data_genre.createMany({
    data: workDataGenres,
  });

  await prisma.technology.createMany({
    data: technologies,
  });

  await prisma.work_data_technology.createMany({
    data: workDataTechnologies,
  });

  await prisma.work_data_user.createMany({
    data: workDataUsers,
  });

  await prisma.work_share_url.createMany({
    data: workShareUrls,
  });

  console.log('Seed completed.');
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
