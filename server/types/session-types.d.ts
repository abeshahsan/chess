
import 'express-session';

declare module 'express-session' {
  interface SessionData {
    user?: {
      id: string;
      name: string;
      email: string;
      password: string; // include any other properties user has
    };
    // Add any other custom session properties here
  }
}
