import mongoose from 'mongoose';

interface TaskAttrs {
  name: string;
  description: string;
  done: boolean;
  userId: string;
}

interface TaskDoc extends mongoose.Document {
  name: string;
  description: string;
  done: boolean;
  updatedAt: string;
  user: string;
}

interface TaskModel extends mongoose.Model<TaskDoc> {
  build(attrs: TaskAttrs): TaskDoc;
}

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    done: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

taskSchema.statics.build = (attrs: TaskAttrs) => {
  return new Task(attrs);
};

const Task = mongoose.model<TaskDoc, TaskModel>('Task', taskSchema);

export { Task };
