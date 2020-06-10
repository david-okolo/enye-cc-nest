import { Document } from "mongoose";
import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { SearchSchema, Search } from "../../search/schemas/search.schema";

@Schema()
export class Profile extends Document {
    @Prop()
    _id: string

    @Prop([SearchSchema])
    pastSearches: [Search]
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);