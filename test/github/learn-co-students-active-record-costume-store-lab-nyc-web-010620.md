# Active Record Costume Store

## Contents

|Section                           |
|----------------------------------|
|[Objectives](#objectives)         |
|[Active Record](#active-record)    |
|[Example](#example)               |
|[Instructions](#instructions)     |
|[Resources](#resources)           |

## Objectives

:jack_o_lantern: :ghost: :jack_o_lantern:

In this lab, you'll be creating the following tables: `costumes`,
`costume_stores`, and `haunted_houses`. You'll be creating the following
classes: `Costume`, `CostumeStore`, and `HauntedHouse`.

The `costumes` table will have four columns:

  1. name
  2. price
  3. size
  4. image url
  
_as well as_ the two "timestamp" columns:  `created_at` and `updated_at`. This
will provide a grand total of _six_ columns.

The `costume_stores` table will have seven columns:

  1. name
  2. location
  3. number of costumes, or "costume inventory"
  4. number of employees
  5. whether or not it's still in business
  6. opening time
  7. closing time

The `haunted_houses` table will have eight columns:

  1. name
  2. location
  3. theme
  4. price
  5. whether they're family friendly or not
  6. opening date
  7. closing date
  8. long description

Before coding out the creation of these tables, read about Active Record below:

## Active Record Review

Active Record is magic. Well, not really. But it does build out a bunch of
methods for you. For instance, when it's used properly it will give you access
to methods such as `create`, `save`, and `find_by`. Rejoice! Never again will
you have to manually build out these methods!

Active Record allows you to create a database that interacts with your class
with only a few lines of code. These lines of code go to creating a model, which
resides in the `app/models` folder, and a migration, which resides in the
`db/migrate` folder.

The model inherits from `ActiveRecord::Base` while the migration inherits from
`ActiveRecord::Migration`. Many migrations these days have a `change` method,
but you might also see migrations with an `up` and a `down` method instead. To
use Active Record, you have to stick to some specific naming conventions: while
the migrations are plural, the models are singular.

### Migrations

When creating migrations, the class names in the migration files must match
their file names. For instance, a class in the migration file called
`20141013204115_create_candies.rb` must be named `CreateCandies` while a class
in a migration file called `20130915204319_add_addresses_to_houses.rb` must be
called AddAddressesToHouses.

You might notice that in both the examples above, the numbers at the front of
the file name were ignored. These numbers are in the form `YYYYMMDDHHMMSS`.
Later on, these timestamps will become important as Rails uses them to determine
which migration should be run and in what order. For instance, if you made a
table called `dog_walkers` and then added a column to it called `rating`, that
would be fine as the timestamp on the `dog_walkers` table creation would
indicate it needs to be migrated before adding the `rating` column to it.
However, if you did this in reverse order, that is adding a column to a table
that doesn't exist, then creating the table, you would get an error.

Migrations, as it was mentioned before, inherit from `ActiveRecord::Migration`
and usually have a method called `change`. In change, you can create a table
with the [create_table][] method. This method automatically will create a
primary key column called `id`, but this default can be overridden if you'd like
to customize it.

[create_table]: http://guides.rubyonrails.org/migrations.html#creating-a-table

***NOTE***: As of Active Record 5.x, we can no longer inherit directly from
`ActiveRecord::Migration` and must instead specify which version of Active
Record / Rails the migration was written for. If we were writing a migration for
Active Record 5.1, we would inherit from `ActiveRecord::Migration[5.1]`. Don't
worry too much about this until you get to the Rails section. Until then, if you
encounter an error like this...

```text
StandardError: Directly inheriting from ActiveRecord::Migration is not supported. Please specify the Rails release the migration was written for:

  class CreateDogs < ActiveRecord::Migration[4.2]
```

...simply add `[4.2]` to the end of `ActiveRecord::Migration`, exactly as the
error message instructs.

Here's a simple example of the `create_table` method in action:

```ruby
class CreateDogs < ActiveRecord::Migration[4.2]
  def change
    create_table :dogs do |t|
      t.string :name
      t.string :breed
    end
  end
end
```

The above code would create a table called `dogs` with three columns: `name`,
`breed` (both explicitly created), and an implicitly created `id` column.

Take a look at a few data types that Active Record supports below:

|Data Type                      |Examples                                               |
|-------------------------------|-------------------------------------------------------|
|boolean                        | true, false                                           |
|integer                        | 2, -13, 485                                           |
|string                         | "Halloween", "Boo!", strings between 1-255 characters|
|datetime                       | DateTime.now, DateTime.new(2014,10,31)                |
|float                          | 2.234, 32.2124, -6.342                                |
|text                           | strings between 1 and 2 ^ 32 - 1 characters           |

### Models

Like migrations, models also inherit, but they inherit from
`ActiveRecord::Base`. A simple model would look like this:

```ruby
class Dog < ActiveRecord::Base
end
```

Even though there are no explicit methods for retrieving `name` and `breed`,
this `Dog` model is associated with the created `dogs` table above. Because of
this integration, we can call `name`, `breed`, and `id` on any new instance of
the Dog class. For example:

```ruby
shiloh = Dog.new
=> #<Dog id: 1, name: nil, breed: nil>
shiloh.name = "Shiloh"
=> "Shiloh"
shiloh.breed = "Beagle"
=> "Beagle"
shiloh.save
=> true

Dog.find_by(:name => "Shiloh") == shiloh
=> true
```

Notice that you had access to reader and writer methods that cooperated with the
database that you never had to actually code. You could set the name without
ever writing `def name=()` and call the `self.find_by(attribute)` method without
ever teaching your Dog class how to look up data in the database. It's pretty
awesome. Take a look at an example below.

#### Example

Let's say you wanted to make a class called `Candy`. Candies should have two
attributes, a name (string) and the number of calories (integer), you would
write the migration as seen below:

`db/migrations/20130915204319_create_candies.rb`

```ruby
class CreateCandies < ActiveRecord::Migration[4.2]
  def change
    create_table :candies do |t|
      t.string :name
      t.integer :calories
      t.timestamps
    end
  end
end
```

> **Note**: You might be wondering what `t.timestamps` is doing here. Well, it
> creates two new columns, `created_at` and `updated_at`. These are handy columns
> to have around as sometimes you want to query based on the time of creation or
> update-tion instead of querying using attributes or ids. To read more about
> timestamps, go to Active Record's [docs on them][].

[docs on them]: http://api.rubyonrails.org/classes/ActiveRecord/Timestamp.html

While the migration was plural, the model would be singular:

`app/models/candy.rb`

```ruby
class Candy < ActiveRecord::Base
end
```

After saving the code above, running `rake db:migrate` will apply the desired
changes to the database by running the change method. Then you can alter the
database with simple Ruby statements.

For instance, you could create three rows in the table easily:

```ruby
Candy.create(:name => "Milky Way Midnight", :calories => 220)
Candy.create(:name => "Snickers", :calories => 550)
Candy.create(:name => "Reese's Peanut Butter Cups", :calories => 210)
```

Retrieving information is just as painless:

```ruby
reeses = Candy.find_by(:name => "Reese's Peanut Butter Cups")
# => #<Candy id: 3, name: "Reese's Peanut Butter Cups", calories: 210>
Candy.first
# => #<Candy id: 1, name: "Milky Way Midnight", calories: 220>
snickers = Candy.find(2)
# => #<Candy id: 2, name: "Snickers", calories: 550>
```

As is viewing attributes:

```ruby
reeses = Candy.find(3)
# => #<Candy id: 3, name: "Reese's Peanut Batter Cups", calories: 210>
reeses.calories
# => 210
reeses.name
# => "Reese's Peanut Batter Cups"
```

Updating information and viewing table info is also quite simple:

```ruby
snickers = Candy.find(2)
# => #<Candy id: 2, name: "Snickers", calories: 550>
snickers.update(:calories => 250)
# => true

reeses = Candy.last
# => #<Candy id: 3, name: "Reese's Peanut Batter Cups", calories: 210>
reeses.update(:name => "Reeeese's Peanut Butter Cups")
# => true

Candy.find(2)
# => #<Candy id: 2, name: "Snickers", calories: 250>
Candy.last
# => #<Candy id: 3, name: "Reeeese's Peanut Butter Cups", calories: 210>
```

Isn't that amazing? Eleven lines of code allows you to create a table and a
class that interact with each other elegantly and efficiently. It builds out
methods like, `create`, `update`, `count`, `name`, `calories`, along with others
such as `build` and `save`.

## Instructions

### File Structure

You will only be altering code in six files, the three files in the `models`
folder and the three files in the `db/migrations` folder.

```text
├── app
│   └── models
│       ├── costume.rb
│       ├── costume_store.rb
│       └── haunted_house.rb
└──db
    └── migrations
        ├── 001_create_costumes.rb
        ├── 002_create_costume_stores.rb
        └── 003_create_haunted_houses.rb
```

### Getting Started

**This is a test-driven lab so start with the first test and work your way down.**

**Your models should be no longer than two lines of code.**

* The first step is to run `bundle install`.
* Create the Costume class in `app/models/`.
* Fill out the Active Record migration for costumes such that it passes the
  specs.
* Create the CostumeStore class in `app/models/`.
* Fill out the Active Record migration for `costume_stores` such that it passes
  the specs.
* Create the HauntedHouse class in `app/models/`.
* Fill out the Active Record migration for haunted_houses such that it passes
  the specs.

Just like for any other lab, run `learn` to view your test progress. However,
unlike some of the other labs in thie section, for this lab, when updating an
existing migration, **you will need to rollback your previous migrations for
that table using the rake command `rake db:rollback`**. Otherwise, the schema
will remain unchanged and the changes you make to your migrations will not
be seen.

For example, say you've run `rake db:migrate` and `learn` once to start, and see
that you need to add an attribute to the `costume_stores` table. Since this
table is the second migration of three, you will need to run `rake db:rollback`
twice to remove the previous migration for this table, then run 
`rake db:migrate` again to update the schema.

## Resources

* [Active Record Migrations](http://guides.rubyonrails.org/migrations.html)
  * Just look at the code for the example migrations
* [Creating Active Record Models](http://guides.rubyonrails.org/active_record_basics.html#creating-active-record-models)
* [Timestamps](http://api.rubyonrails.org/classes/ActiveRecord/Timestamp.html)

<p data-visibility='hidden'>View <a href='https://learn.co/lessons/activerecord-costume-store-todo' title='Active Record Costume Store'>Active Record Costume Store</a> on Learn.co and start learning to code for free.</p>
