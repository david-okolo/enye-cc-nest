import { Document } from "mongoose";
import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";

@Schema()
export class Search extends Document {
    @Prop()
    keyword: string

    @Prop()
    radius: number

    @Prop()
    timestamp: number
}

export const SearchSchema = SchemaFactory.createForClass(Search);