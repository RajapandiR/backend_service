import mongoose, { ObjectId,  } from "mongoose";
import { Schema, Document, mongoosePaginate } from "../helpers/path";
import paginate from 'mongoose-paginate-v2'

let options = {
    versionKey: false,
    timestamps: true
}

interface IMark extends Document {
    mark1: number,
    mark2: number,
    mark3: number,
    user: ObjectId,
}

const MarkSchema = new Schema<IMark>({
    mark1: Number,
    mark2: Number,
    mark3: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },

}, options);
MarkSchema.plugin(mongoosePaginate);

const MarkModel = mongoose.model<IMark, mongoose.PaginateModel<IMark>>('mark', MarkSchema, );

export { IMark, MarkModel };

