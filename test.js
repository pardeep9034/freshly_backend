const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://new:pardeep@freshlycluster.kccvq.mongodb.net/freshly?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected successfully!');
  process.exit(0);
})
.catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
