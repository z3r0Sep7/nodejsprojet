var userSchema = new mongoose.Schema({
 first: String,
 last: String,
 email: {type: String, unique: true},
 password: {type: String, index: true}
});
mongoose.model( 'User', userSchema );
