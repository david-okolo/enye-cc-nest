import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Search, SearchSchema } from './schemas/search.schema';
import { Profile, ProfileSchema } from '../profile/schemas/profile.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Search.name, schema: SearchSchema}, { name: Profile.name, schema: ProfileSchema}])],
  providers: [SearchService],
  exports: [SearchService]
})
export class SearchModule {}
