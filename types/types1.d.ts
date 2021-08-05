import "express-session";
import "../src/utils";

declare module 'express-session' {
  interface SessionData {
    userid: string;
  }
}