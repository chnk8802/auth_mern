const removeVersionKeyPlugin = (schema) => {
  const transform = (doc, ret) => {
    delete ret?.id;
    delete ret.__v;
    return ret;
  };

  schema.set("toJSON", { virtuals: true, transform });
  schema.set("toObject", { virtuals: true, transform });
}

export default removeVersionKeyPlugin;