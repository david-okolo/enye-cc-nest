import { Document } from "mongoose";
import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";

@Schema()
export class Search extends Document {
    @Prop()
    keyword: string

    @Prop()
    radius: number

    @Prop(Date)
    timestamp: Date
}

export const SearchSchema = SchemaFactory.createForClass(Search);