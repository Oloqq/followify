import '../src/log';

interface Logger {
  info: function (...string): void;
  error: function (...string): void;
  warn: function (...string): void;
}