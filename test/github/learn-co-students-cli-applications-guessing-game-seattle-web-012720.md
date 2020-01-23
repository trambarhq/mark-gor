# Build a Guessing Game in the CLI

## Learning Goals

- Review the Command Line Interface
- Run CLI applications
- Use `gets` to capture user input and store in a variable
- Practice defining a method
- Implement flow control

## Instructions

In this lab, you are tasked with building guessing game. The game is simple:
the computer will choose a random number between 1 and 6 and ask you to make a
guess. If you guess right, you win, if not, you lose.

The implementation of this game is not so simple. You will need to utilize what
you've learned about methods and conditional logic. In addition, we will
also introduce a way to capture user input, `gets`. First, though, let's refresh
on what a CLI application is.

## Review the Command Line Interface

A CLI, or command line interface, allows a user to interface, or interact with,
a computer's operating system or a particular application. You've already become
comfortable interacting with the command line to navigate files, connect with
GitHub and test your programs. Every lab so far has required you to run `learn`
and `learn submit` in the command line.

In a command line application, the user will respond to a prompt that your
program will output to the terminal. The user's response, or input, will be
received by the application and the application will then carry out the
programmed response based on that input.

For example, I might have a command line application which, once run, will ask
the user for their location and, in return, output the current weather for that
location to the terminal.

## Run a CLI Application

The work for this should be done in `guessing_game_cli.rb`. In this file, you'll
need to write a method, `run_guessing_game`, that will contain all of the code
we need for our guessing game.

However, when we want to _run_ this application, we are not going to call on
this file directly. Instead, we will use a second file that is already provided,
`bin/guessing_game_cli`. To start the application type the following in your
terminal from the main folder of this lesson:

```ruby
ruby bin/guessing_game_cli
```

This is a Ruby file, and if you look inside, you'll see it has two lines of
code:

```ruby
require_relative "../guessing_game_cli"

run_guessing_game
```

All the file does is _load_ `guessing_game_cli.rb` so that is has access to the
`run_guessing_game` method, then it calls that method to start the application.

You may be wondering: why is this necessary? Can't we just call
`run_guessing_game` at the bottom of `guessing_game_cli.rb` and achieve the same
result? Yes, you can. The problem here is that this set up isn't easily
scalable.

By separating out this action of _starting_ an application, we can ensure that
our application is being run in the correct environment. Building more complex
applications may require many files to be loaded up before a particular method
is called to start the app.

The `guessing_game_cli.rb` file is for our implementation, our code, not really
for setting up the environment. Another way of putting it: the
`guessing_game_cli.rb` should only be concerned with the guessing game code
itself. The `bin/guessing_game_cli` file separates out the concern of running
that code. [Separating concerns][concerns] is a common design principle in
programming. By using `bin/guessing_game_cli`, we have a clear, single entry
point for starting our application.

> **Note**: You may be wondering why `bin/guessing_game_cli` doesn't have a
> `.rb` file extension even though it is just Ruby inside. Files like
> `bin/guessing_game_cli` are sometimes referred to as **executables**. This
> mirrors a convention in frameworks like [Ruby on Rails][rails] where executable
> files are provided for setting up the environment for various tools used in the
> framework.

## Building the `run_guessing_game` Method

Start coding your solution by creating a `run_guessing_game` method. Once
created, the method should be responsible for the following:

- Generate and store a random number between 1 and 6
- Prompts the user to guess their own number between 1 and 6
- Capture user input from the command line
- Compare that input to the random number that has been generated
- Print out one of three statements:
  - If the user's input matches the random number: `You guessed the correct number!`
  - If the user's input DOES NOT matches the random number: `Sorry! The computer guessed <number>.`
  - It the user's input is equal to "exit": `Goodbye!`

Run `learn` to see your progress and `learn submit` when you've solved the lab.

## Generate Random Numbers

In Ruby, to generate a random number, you can use `rand`.

```ruby
rand #=> Returns a random float like 0.39113137693072575
```

By default, `rand` returns a random float. To get _integers_, we need to pass an
integer in as an argument for `rand`:

```ruby
rand(20) #=> Returns a random integer from 0 to 19
```

By passing an integer, `rand` will return a random integer that is _less than_
the number it was given, including zero. Calling `rand(20)` will never produce
the value `20`. If we wanted any random number between 1 and 20,
instead of 0 and 19, we could do something like:

```ruby
rand(20) + 1 #=> Returns a random integer from 1 to 20
```

> With `rand`, you can also pass in a [Range][range] as an argument to achieve
> the same result. However, as we haven't discussed ranges in depth yet, write
> code similar to the above example to pass the tests in this lab. Using a range
> **will not produce the correct test results**.

## Capture User Input with `gets`

We've used [`puts`][puts] in a few labs already for outputting text. For
capturing user _input_, we use [`gets`][gets].

```ruby
input = gets
```

If we run the above code in IRB, we'll be given a new line to type in. Try
typing `hello` and pressing enter:

```text
2.6.1 :001 > input = gets
hello
 => "hello\n"
```

Whatever we write after calling `gets` will be captured as a string. By having
`gets` on the right hand side of a variable assignment, whatever `gets` captures
will be assigned to the `input` variable.

If we were to lookup `input`, we'd see that it is now assigned to `"hello\n"`:

```text
2.6.1 :002 > input
 => "hello\n"
```

The `\n` at the end is the string representation of _newline_ (also referred to
as a carriage return), which was captured by `gets` when `Enter` was pressed.

For a number guessing game, we don't need `\n` at the end of every user input.
Luckily, Ruby provides a built in method for removing these: `chomp`.

#### Using `chomp`

The `chomp` method is part of the [`String` class][strings], so we can call it
on any string value or variable:

```text
2.6.1 :003 > input.chomp
=> "hello"
```

When we use `gets`, it returns a user's input as a string. This means that we
can actually use `chomp` directly after gets:

```text
2.6.1 :004 > input = gets.chomp
```

And our `input` variable be set to whatever a user inputs, minus the newline
characters.

## Things to Keep in Mind

This is a challenging lab, so go through it slowly. Look at the RSpec tests and
see what the tests are looking for. Talk to each other and communicate your way
through roadblocks.

Run `ruby bin/guessing_game_cli` as you build out your logic. This way, you can
develop based on the _behavior_ of your code. The tests in this lab are also
focused on this. Rather than test for a particular implementation, the tests
will _run_ the application and test for the appropriate outputs (when a user
wins, loses or exits).

This is a very small application that should play a single guessing game then
end. There is no need to incorporate loops into your code.

## Conclusion

A critical part of building CLI applications is capturing user input and setting
up logic to handle that input. Equipped with only the skills you've demonstrated
in this lab, it would be possible to build highly complex text based
applications (or games!).

In addition to using `gets`, we've also introduced the `bin` folder and
the use of an executable file. A file like `bin/guessing_game_cli` acts as the
starting point of our program. It ensures we load up the necessary files before
running the main method of our application.

## Resources

- [rand][rand]
- [gets][gets]
- [chomp][chomp]

[rand]: https://www.rubydoc.info/stdlib/core/Kernel:rand
[gets]: https://ruby-doc.org/core-2.3.1/Kernel.html
[chomp]: https://ruby-doc.org/core-2.3.1/String.html#method-i-chomp
[concerns]: https://en.wikipedia.org/wiki/Separation_of_concerns
[rails]: https://rubyonrails.org/
[range]: https://ruby-doc.org/core-2.5.0/Range.html
[puts]: https://ruby-doc.org/core-2.5.2/IO.html#method-i-puts
[strings]: https://ruby-doc.org/core-2.3.1/String.html

<p data-visibility='hidden'>View <a href='https://learn.co/lessons/guessing-cli' title='Build a Guessing Game in the CLI'>Build a Guessing Game in the CLI</a> on Learn.co and start learning to code for free.</p>
