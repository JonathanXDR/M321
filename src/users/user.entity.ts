import { ApiProperty } from '@nestjs/swagger';
import { User, NoteCollection } from '@prisma/client';

// model User {
//   id              String           @id @default(uuid()) @db.VarChar(36)
//   username        String           @unique @db.VarChar(30)
//   password        String           @db.VarChar(100)
//   firstname       String           @db.VarChar(30)
//   lastname        String           @db.VarChar(30)
//   age             Int              @db.TinyInt()
//   gender          String           @db.VarChar(10)
//   noteCollections NoteCollection[]
// }

export class UserEntity implements User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  firstname: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  noteCollections: NoteCollection[];
}
