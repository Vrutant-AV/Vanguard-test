const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const pool = require('./database');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user already exists with this Google ID
    let userResult = await pool.query(
      'SELECT * FROM users WHERE google_id = $1',
      [profile.id]
    );

    if (userResult.rows.length > 0) {
      // User exists, return the user
      return done(null, userResult.rows[0]);
    }

    // Check if user exists with the same email
    userResult = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [profile.emails[0].value]
    );

    if (userResult.rows.length > 0) {
      // User exists with same email, link Google account
      const updatedUser = await pool.query(
        'UPDATE users SET google_id = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
        [profile.id, userResult.rows[0].id]
      );
      return done(null, updatedUser.rows[0]);
    }

    // Create new user
    const newUser = await pool.query(`
      INSERT INTO users (name, email, google_id, role, email_verified)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `, [
      profile.displayName,
      profile.emails[0].value,
      profile.id,
      'customer',
      true
    ]);

    return done(null, newUser.rows[0]);
  } catch (error) {
    console.error('Google OAuth error:', error);
    return done(error, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, role, created_at FROM users WHERE id = $1',
      [id]
    );
    done(null, result.rows[0]);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;