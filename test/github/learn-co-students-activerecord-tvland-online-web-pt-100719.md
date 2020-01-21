# TV Land Active Record Associations Lab

## Objectives

- Create and modify tables using Active Record migrations.
- Build associations between models using Active Record macros.

## Overview

In this lab, we'll be working with a TV show domain model. We will have a show,
network, and character model. They will be associated in the following way:

- An actor has many characters and has many shows through characters.
- A character belongs to an actor and belongs to a show.
- A show has many characters and has many actors through characters.

We've given you a few migrations in the `db/migrate` directory to create the
networks and shows table, but you'll have to add additional tables and modify
these existing tables as per the guidelines below.

**Remember to run `rake db:migrate` in the terminal before you run your tests and after you make any new migrations!**

## Instructions

The tests in this lab are run for each model/migration - actor, character,
network (solution already provided), and show. Because of this, when run, you
will see _all the tests_ for the Actor model first, then _all the tests for
Character, etc... the tricky thing here is that **you will not be able to pass
all the tests for Actor until the migrations for other models are working**.

This makes sense, and mirrors normal development of associations - you can't ask
an Actor instance about what characters it has if there isn't characters table
or a model configured.

### Migrations

- Write a migration for the actors table. An actor should have a `first_name`
  and a `last_name`.
- Write a migration for the characters table. A character should have a `name`,
  `actor_id`, and a `show_id`––a character will belong to a show (the show
  migration is already provided) and an actor, and we'll keep track of this
  relationship with these database table columns.
- Write a migration that adds the column `catchphrase` to your character model.

### Associations

- Associate the `Actor` model with the `Character` and `Show` model. An actor
  should have many characters and many shows through characters.
- Write a method in the `Actor` class, `#full_name`, that returns the first and
  last name of an actor.
- Write a method in the `Actor` class, `#list_roles`, that lists all of the
  characters that actor has alongside the show that the character is in. So, for
  instance, if we had an actor, Peter Dinklage, a character, Tyrion Lannister,
  and a show, Game of Thrones, we with

    ```ruby
    peter = Actor.new(:first_name => "Peter", :last_name => "Dinklage")
    tyrion = Character.new(:name => "Tyrion Lannister")
    tyrion.actor = peter
    thrones = Show.new(:name => "Game of Thrones")
    tyrion.show = thrones
    tyrion.save
    ```

  And then, when we run `peter.list_roles`, we would get an Array containing a
  string with both the character and the show:

    ```ruby
    ['Tyrion Lannister - Game of Thrones']
    ```

- Define a method in the `Character` class, `#say_that_thing_you_say`, using a
  given character's catchphrase. Using Tyrion as an example again, the returned
  string should look like the following:

    ```ruby
    tyrion.catchphrase = 'A Lannister always pays his debts'
    tyrion.say_that_thing_you_say
    #=> 'Tyrion Lannister always says: A Lannister always pays his debts'
    ```

- Define a method in the `Show` class called `#actors_list` that returns an
  Array of the full names of each actor associated with the a show. Remember,
  a show should have many actors through characters.

- While we've connected shows, characters and actors together, we haven't
  connected these models to the existing network model. Update the associations
  so that a show belongs to a network. In the network model, an association has
  already been added so that a network has many shows.

  **Note**: Once connected, this allows us to do some interesting things, like
  chain-building. We could, for instance, create a character, and with that
  character created, tell Active Record to _chain build_ an associated show.
  With a _show_ created on the spot, we can immediately tell Active Record to
  then _chain build an associated network._

  ```ruby
  rick = Character.new(:name => "Rick Grimes")
  rick.build_show(:name => "The Walking Dead").build_network(:call_letters => "AMC")
  ```

  This doesn't _save_ these instances, but will set up the right associations
  for us and when we save our character, the new show and network are also
  saved.

### Final Migrations

For the last couple of tests, update the shows table with a new migration. This
migration should add a `day` column to indicate which day of the week the show
is on, a `genre` column for the show genre, and `season` to indicate which
season the show is currently on. All three should be strings.

## Resources

- Rails Guide - [Active Record Associations](http://guides.rubyonrails.org/association_basics.html)
- API dock - [Active Record Associations](http://apidock.com/rails/ActiveRecord/Associations)
- Rails Guide - [Active Record Migrations](http://edgeguides.rubyonrails.org/active_record_migrations.html)

<p data-visibility='hidden'>View <a href='https://learn.co/lessons/activerecord-tvland' title='TV Land ActiveRecord Associations Lab'>TV Land ActiveRecord Associations Lab</a> on Learn.co and start learning to code for free.</p>
