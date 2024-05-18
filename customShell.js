#!/usr/bin/env node

const readline = require("readline");
const { exec, execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "myShell> ",
});

const commands = {
  echo: (args) => {
    console.log(args.join(" "));
  },
  pwd: () => {
    console.log(process.cwd());
  },
  ls: (args) => {
    const dir = args[0] || process.cwd();
    fs.readdir(dir, (err, files) => {
      if (err) {
        console.error(`ls: ${err.message}`);
      } else {
        files.forEach((file) => console.log(file));
      }
    });
  },
  cd: (args) => {
    const dir = args[0];
    if (dir) {
      try {
        process.chdir(dir);
      } catch (err) {
        console.error(`cd: ${err.message}`);
      }
    } else {
      console.error("cd: missing argument");
    }
  },
  cat: (args) => {
    const file = args[0];
    if (file) {
      fs.readFile(file, "utf8", (err, data) => {
        if (err) {
          console.error(`cat: ${err.message}`);
        } else {
          console.log(data);
        }
      });
    } else {
      console.error("cat: missing argument");
    }
  },
  touch: (args) => {
    const file = args[0];
    if (file) {
      fs.closeSync(fs.openSync(file, "w"));
    } else {
      console.error("touch: missing argument");
    }
  },
  mkdir: (args) => {
    const dir = args[0];
    if (dir) {
      fs.mkdir(dir, (err) => {
        if (err) {
          console.error(`mkdir: ${err.message}`);
        }
      });
    } else {
      console.error("mkdir: missing argument");
    }
  },
  rmdir: (args) => {
    const dir = args[0];
    if (dir) {
      fs.rmdir(dir, (err) => {
        if (err) {
          console.error(`rmdir: ${err.message}`);
        }
      });
    } else {
      console.error("rmdir: missing argument");
    }
  },
  rm: (args) => {
    const target = args[0];
    if (target) {
      fs.rm(target, { recursive: true, force: true }, (err) => {
        if (err) {
          console.error(`rm: ${err.message}`);
        }
      });
    } else {
      console.error("rm: missing argument");
    }
  },
  cp: (args) => {
    const [src, dest] = args;
    if (src && dest) {
      fs.copyFile(src, dest, (err) => {
        if (err) {
          console.error(`cp: ${err.message}`);
        }
      });
    } else {
      console.error("cp: missing arguments");
    }
  },
  mv: (args) => {
    const [src, dest] = args;
    if (src && dest) {
      fs.rename(src, dest, (err) => {
        if (err) {
          console.error(`mv: ${err.message}`);
        }
      });
    } else {
      console.error("mv: missing arguments");
    }
  },
  chmod: (args) => {
    const [mode, file] = args;
    if (mode && file) {
      fs.chmod(file, mode, (err) => {
        if (err) {
          console.error(`chmod: ${err.message}`);
        }
      });
    } else {
      console.error("chmod: missing arguments");
    }
  },
  chown: (args) => {
    const [owner, file] = args;
    if (owner && file) {
      const [uid, gid] = owner.split(":");
      fs.chown(file, parseInt(uid), parseInt(gid), (err) => {
        if (err) {
          console.error(`chown: ${err.message}`);
        }
      });
    } else {
      console.error("chown: missing arguments");
    }
  },
  find: (args) => {
    const dir = args[0] || ".";
    const pattern = args[1] || "";
    exec(`find ${dir} -name "${pattern}"`, (err, stdout, stderr) => {
      if (err) {
        console.error(`find: ${stderr}`);
      } else {
        console.log(stdout);
      }
    });
  },
  grep: (args) => {
    const [pattern, file] = args;
    if (pattern && file) {
      fs.readFile(file, "utf8", (err, data) => {
        if (err) {
          console.error(`grep: ${err.message}`);
        } else {
          const lines = data.split("\n");
          lines.forEach((line) => {
            if (line.includes(pattern)) {
              console.log(line);
            }
          });
        }
      });
    } else {
      console.error("grep: missing arguments");
    }
  },
  head: (args) => {
    const file = args[0];
    const lines = args[1] || 10;
    if (file) {
      exec(`head -n ${lines} ${file}`, (err, stdout, stderr) => {
        if (err) {
          console.error(`head: ${stderr}`);
        } else {
          console.log(stdout);
        }
      });
    } else {
      console.error("head: missing argument");
    }
  },
  tail: (args) => {
    const file = args[0];
    const lines = args[1] || 10;
    if (file) {
      exec(`tail -n ${lines} ${file}`, (err, stdout, stderr) => {
        if (err) {
          console.error(`tail: ${stderr}`);
        } else {
          console.log(stdout);
        }
      });
    } else {
      console.error("tail: missing argument");
    }
  },
  wc: (args) => {
    const file = args[0];
    if (file) {
      exec(`wc ${file}`, (err, stdout, stderr) => {
        if (err) {
          console.error(`wc: ${stderr}`);
        } else {
          console.log(stdout);
        }
      });
    } else {
      console.error("wc: missing argument");
    }
  },
  ps: (args) => {
    exec("ps aux", (err, stdout, stderr) => {
      if (err) {
        console.error(`ps: ${stderr}`);
      } else {
        console.log(stdout);
      }
    });
  },
  kill: (args) => {
    const pid = args[0];
    const signal = args[1] || "SIGTERM";
    if (pid) {
      try {
        process.kill(pid, signal);
      } catch (err) {
        console.error(`kill: ${err.message}`);
      }
    } else {
      console.error("kill: missing argument");
    }
  },
  help: () => {
    console.log(`Available commands:
    echo [text] - Prints text to the console
    pwd - Prints the current working directory
    ls [dir] - Lists files in the directory
    cd [dir] - Changes the current directory
    cat [file] - Prints the content of the file
    touch [file] - Creates an empty file
    mkdir [dir] - Creates a new directory
    rmdir [dir] - Removes a directory
    rm [target] - Removes a file or directory
    cp [src] [dest] - Copies a file
    mv [src] [dest] - Moves or renames a file
    chmod [mode] [file] - Changes file permissions
    chown [owner:group] [file] - Changes file owner and group
    find [dir] [pattern] - Finds files
    grep [pattern] [file] - Searches for a pattern in a file
    head [file] [lines] - Prints the first few lines of a file
    tail [file] [lines] - Prints the last few lines of a file
    wc [file] - Counts lines, words, and characters in a file
    ps - Lists processes
    kill [pid] [signal] - Sends a signal to a process
    exit - Exits the shell`);
  },
  exit: () => {
    rl.close();
  },
};

rl.prompt();

rl.on("line", (line) => {
  const args = line.trim().split(" ");
  const command = args.shift();

  if (commands[command]) {
    commands[command](args);
  } else {
    exec(line, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error: ${stderr}`);
      } else {
        console.log(stdout);
      }
    });
  }

  rl.prompt();
}).on("close", () => {
  console.log("Goodbye!");
  process.exit(0);
});
