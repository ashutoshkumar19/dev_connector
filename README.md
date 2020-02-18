**Steps to follow**
Add "default.json" file in config/ directory.

```
{
  "mongodb_Atlas_URI": "",
  "mLab_db_URI": "",
  "jwtSecret": "mysecrettoken",
  "githubClientId": "",
  "githubSecret": ""
}

```

***For Production***
Add following in scripts section of 'package.json':
```
  "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client" 
```

Add Following Code in server.js file:
```
const express = require('express');
const connectDB = require('./config/db');

const path = require('path');

const app = express();

// Connect Database
connectDB();

// Initialize Middleware
app.use(express.json({ extended: false }));

// app.get('/', (req, res) => res.send('API running'));

// Define Routes
app.use('/api/user', require('./routes/api/user.routes'));
app.use('/api/auth', require('./routes/api/auth.routes'));
app.use('/api/profile', require('./routes/api/profile.routes'));
app.use('/api/post', require('./routes/api/post.routes'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

```
