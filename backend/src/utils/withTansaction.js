import mongoose from "mongoose";

/**
 * Runs an async function inside a transaction.
 * @param {Function} fn - async function receiving a session
 */
export const withTransaction = async (fn) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const result = await fn(session);
    await session.commitTransaction();
    return result;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
