export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
  csharp: "6.12.0",
  php: "8.2.3",
  "c++": "10.2.0",
};

export const CODE_SNIPPETS = {
  javascript: `// Example with user input
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('What is your name? ', name => {
  console.log(\`Hello, \${name}!\`);
  readline.close();
});`,
  typescript: `// Example with user input
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('What is your name? ', (name: string) => {
  console.log(\`Hello, \${name}!\`);
  readline.close();
});`,
  python: `# Example with user input
name = input("What is your name? ")
print(f"Hello, {name}!")`,
  java: `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    System.out.print("What is your name? ");
    String name = scanner.nextLine();
    System.out.println("Hello, " + name + "!");
    scanner.close();
  }
}`,
  csharp: `using System;

namespace UserInputExample
{
  class Program { 
    static void Main(string[] args) {
      Console.Write("What is your name? ");
      string name = Console.ReadLine();
      Console.WriteLine($"Hello, {name}!");
    }
  }
}`,
  php: `<?php
echo "What is your name? ";
$name = trim(fgets(STDIN));
echo "Hello, " . $name . "!\n";
?>`,
  "c++": `#include <iostream>
#include <string>

int main() {
  std::string name;
  std::cout << "What is your name? ";
  std::getline(std::cin, name);
  std::cout << "Hello, " << name << "!" << std::endl;
  return 0;
}`,
};
