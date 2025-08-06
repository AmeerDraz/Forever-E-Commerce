const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        cartData: { type: Object, default: {} },
    },
    { minmize: false }
); //minmize: false to prevent mongoose from removing empty objects

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
// This code defines a Mongoose schema and model for user data in a MongoDB database.