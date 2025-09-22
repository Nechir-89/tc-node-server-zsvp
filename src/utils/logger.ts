import fs from "fs";
import path from "path";

// Resolve log file at project root, alongside package.json
const logFilePath = path.join(process.cwd(), "log.log");

// Ensure log file exists
try {
  if (!fs.existsSync(logFilePath)) {
    fs.writeFileSync(logFilePath, "", { encoding: "utf8" });
  }
} catch (e) {
  // If we can't create the log file, proceed silently but keep console usable
}

function formatArgs(args: any[]): string {
  return args
    .map((a) => {
      if (a instanceof Error) {
        return `${a.name}: ${a.message}\n${a.stack ?? ""}`;
      }
      if (typeof a === "object") {
        try {
          return JSON.stringify(a);
        } catch {
          return String(a);
        }
      }
      return String(a);
    })
    .join(" ");
}

function write(line: string) {
  const timestamp = new Date().toISOString();
  const entry = `[${timestamp}] ${line}\n`;
  try {
    fs.appendFileSync(logFilePath, entry, { encoding: "utf8" });
  } catch {
    // ignore file write errors to avoid crashing the app
  }
}

// Preserve originals
const originalLog = console.log.bind(console);
const originalError = console.error.bind(console);
const originalWarn = console.warn.bind(console);
const originalInfo = console.info.bind(console);
const originalDebug = console.debug?.bind(console) ?? console.log.bind(console);

// Override console methods to double-write to stdout and log file
console.log = (...args: any[]) => {
  originalLog(...args);
  write(formatArgs(args));
};

console.error = (...args: any[]) => {
  originalError(...args);
  write("ERROR: " + formatArgs(args));
};

console.warn = (...args: any[]) => {
  originalWarn(...args);
  write("WARN: " + formatArgs(args));
};

console.info = (...args: any[]) => {
  originalInfo(...args);
  write("INFO: " + formatArgs(args));
};

console.debug = (...args: any[]) => {
  originalDebug(...args);
  write("DEBUG: " + formatArgs(args));
};

export {}; // side-effect module
