import mongoose from "mongoose";
export const openTransaction = async (param, func) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const funcResponse = await func(param, { session }).catch(async (error) => {
    await session.abortTransaction();
    session.endSession();
    // throw new Error(${func.name}: ${error}, 400);
    throw error;
  });
  
  await session.commitTransaction();
  session.endSession();
  return funcResponse;
};
