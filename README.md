# Custom-Shell

Welcome to my custom shell implementation built using Node.js! This project provides a simple yet functional command-line interface that supports a variety of common shell commands.

## Features

- **Modular Command Structure**: Organized and maintainable code.
- **Comprehensive Command Support**: Includes core shell commands such as `echo`, `pwd`, `ls`, `cd`, `mkdir`, `rmdir`, `rm`, `cp`, `mv`, `chmod`, `chown`, `find`, `grep`, `head`, `tail`, `wc`, `ps`, and `kill`.
- **Extensible Design**: Easy to add new commands.
- **Error Handling**: Clear and consistent error messages.
- **Help Command**: Lists all available commands and their usage.

## Installation

To get started, ensure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

1. **Clone the repository**:

   ```sh
   git clone https://github.com/mirza7860/Custom-Shell.git
   cd Custom-Shell

   ```

2. **Make the script executable**:

    ```sh
    chmod +x ./customShell.js

    ```
## Usage

To start the custom shell, run the following command in your terminal:

```sh
./customShell.js
```

You should see the prompt:

```
myShell>
```

- Now you can start using the shell with various commands.

### Available Commands : 

- echo [text] - Prints text to the console.
- pwd - Prints the current working directory.
- ls [dir] - Lists files in the specified directory (defaults to current directory).
- cd [dir] - Changes the current directory.
- mkdir [dir] - Creates a new directory.
- rmdir [dir] - Removes an empty directory.
- rm [target] - Removes a file or directory.
- cp [src] [dest] - Copies a file.
- mv [src] [dest] - Moves or renames a file.
- chmod [mode] [file] - Changes file permissions.
- chown [owner:group] [file] - Changes file owner and group.
- find [dir] [pattern] - Finds files in a directory matching a pattern.
- grep [pattern] [file] - Searches for a pattern in a file.
- head [file] [lines] - Prints the first few lines of a file.
- tail [file] [lines] - Prints the last few lines of a file.
- wc [file] - Counts lines, words, and characters in a file.
- ps - Lists processes.
- kill [pid] [signal] - Sends a signal to a process.
- exit - Exits the shell.
- help - Lists all available commands.

## Contributing

Contributions are welcome! If you have suggestions or find any issues, please open an issue or create a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.