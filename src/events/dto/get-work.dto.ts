import { ApiProperty } from '@nestjs/swagger';

export class GetWorkDto {
  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        event_id: {
          type: 'number',
        },
        work_id: {
          type: 'number',
        },
        name: {
          type: 'string',
        },
        catch_copy: {
          type: 'string',
        },
        thumbnail_url: {
          type: 'string',
        },
      },
    },
  })
  works: Array<{
    event_id: number;
    work_id: number;
    name: string;
    catch_copy: string;
    thumbnail_url: string;
  }>;
}
