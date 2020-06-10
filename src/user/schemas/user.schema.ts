import { Document } from "mongoose";
import { SchemaFactory, Schema, Prop } from "@nestjs/mongoose";

@Schema()
export class User extends Document {
    @Prop()
    name: string

    @Prop()
    email: string

    @Prop()
    password: string
}

export const UserSchema = SchemaFactory.createForClass(User);