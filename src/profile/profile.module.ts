import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from './schemas/profile.schema';
import { SearchModule } from '../search/search.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Profile.name, schema: ProfileSchema}]),
    SearchModule
  ],
  providers: [ProfileService],
  controllers: [ProfileController],
  exports: [ProfileService]
})
export class ProfileModule {}
