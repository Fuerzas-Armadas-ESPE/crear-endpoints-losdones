
import * as mongoose from 'mongoose';

export const RequestLogSchema = new mongoose.Schema({
  method: String,
  path: String,
});

export interface RequestLogModel extends mongoose.Document {
  method: string;
  path: string;
}

export const RequestLogModel = mongoose.model<RequestLogModel>(
  'RequestLog',
  RequestLogSchema,
);
