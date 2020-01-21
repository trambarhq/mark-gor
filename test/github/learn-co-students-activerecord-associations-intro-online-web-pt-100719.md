# Active Record Associations Introduction: Playlister

## Objectives

1. Understand how and why Active Record implements associations between models.
2. Use Active Record migrations and methods to build out a domain model that
   associates classes via the has-many/belongs-to *and* the many-to-many (or
   has-many-through) relationships.

## What are Active Record Associations?

We already know that we can build our classes such that they associate with one
another. We also know that it takes a lot of code to do it. Active Record
associations allow us to associate models *and their analogous database tables*
without having to write tons of code.

Additionally, Active Record associations make actually working with our
associated objects even quicker, neater and easier.

Sounds great, right? Now that we have you totally hooked, let's take a look at
how we use these AR associations.

## How do we use AR Associations?

Active Record makes it easy to implement the following relationships between
models:

* belongs_to
* has_one
* has_many
* has_many :through
* has_one :through
* has_and_belongs_to_many

We don't need to worry about most of these right now. We'll concern ourselves
with relationships that should sound familiar:

* belongs to
* has many
* has many through

In order to implement these relationships, we will need to do two things:

1. Write a migration that creates tables with associations. For example, if a
   cat belongs to an owner, the cats table should have an `owner_id` column.
2. Use Active Record macros in the models.

We'll go through both of these steps together, using our Playlister domain model.

## Overview

In this walk-through, we'll be building out a domain model for our fictitious
music playing app, Playlister. This app will catalog songs and their
associated artists and genres.  

We'll have three models: Artists, Songs, and Genres. By writing a few migrations
and making use of the appropriate Active Record macros (more on that later), we
will be able to:

* ask an Artist about its songs and genres
* ask a Song about its genre and its artist
* ask a Genre about its songs and artists.

The relationships between artists, songs and genres will be enacted as follows:

* Artists have many songs and a song belongs to an artist.
* Artists have many genres through songs.
* Songs belong to a genre.
* A genre has many songs.
* A genre has many artists through songs.

We will build these associations through the use of Active Record migrations and
macros.

## Building our Migrations

### The Song model

A song will belong to an artist *and* belong to a genre. Before we worry about
the migration that will implement this in our songs table, let's think about
what that table will look like:

|id |name        |artist_id |genre_id |
|---|------------|----------|---------|
|2  |Shake It Off|1         |1        |

We can see that the songs table will have an `artist_id` column and a `genre_id`
column. We will give a given song an `artist_id` value of the artist it belongs
to. The same goes for genre. These foreign keys, in conjunction with the
Active Record association macros will allow our query to get an artist's songs or
genres, a song's artist or genre, and a genre's songs and artists entirely
through Active Record provided methods on our classes.

Let's write the migration that will make this happen.

* Open a file, `db/migrate/03_create_songs.rb`
* Write the following migration:

```ruby
class CreateSongs < ActiveRecord::Migration[4.2]
  def change
    create_table :songs do |t|
      t.string :name
      t.integer :artist_id
      t.integer :genre_id
    end
  end
end
```

### The Artist Model

An artist will have many songs and it will have many genres *through* songs.
These associations will be taken care of entirely through AR macros, which we'll
get to in a bit. What do we mean by *through* songs? The table songs is the
`JOIN` table! Remember that from previous labs? That means that songs has both
an `artist_id` and a `genre_id` to combine those two tables together in a
many-to-many relationship.

Let's take a look at what our `artists` table will need to look like:

|id |name         |
|---|-------------|
|1  |Taylor Swift |

Our artists table just needs a `name` column. Let's write the migration. In
`db/migrate/01_create_artists.rb`:

```ruby
class CreateArtists < ActiveRecord::Migration[4.2]
  def change
    create_table :artists do |t|
      t.string :name
    end
  end
end
```

### The Genre Model

A genre will have many songs and it will have many artists through songs. These
associations will be taken care of entirely through AR macros, which we'll get
to in a bit.

Let's take a look at what our genres table will need to look like:

|id |name |
|---|-----|
|1  |pop  |

Let's write our migration. In `db/migrate/02_create_genres.rb`:

```ruby
class CreateGenres < ActiveRecord::Migration[4.2]
  def change
    create_table :genres do |t|
      t.string :name
    end
  end
end
```

Great! Now go ahead and run `rake db:migrate` in your terminal to execute our
table creations.

## Building our Associations using AR Macros

### What is a macro?

A macro is a method that writes code for us (think metaprogramming). By invoking
a few methods that come with Active Record, we can implement all of the
associations we've been discussing.

We'll be using the following AR macros (or methods):

* [`has_many`][]
* [`has_many through`][]
* [`belongs_to`][]

[`has_many`]: http://guides.rubyonrails.org/association_basics.html#the-has-many-association
[`has_many through`]: http://guides.rubyonrails.org/association_basics.html#the-has-many-through-association
[`belongs_to`]: http://guides.rubyonrails.org/association_basics.html#the-belongs-to-association

Let's get started.

### A Song Belongs to an Artist and A Genre

Create a file, `app/models/song.rb`. Define your `Song` class to inherit from
`ActiveRecord::Base`. This is very important! If we don't inherit from Active
Record Base, we won't get our fancy macro methods.

```ruby
class Song < ActiveRecord::Base

end
```

We need to tell the `Song` class that it will produce objects that can belong to
an artist. We will do it with the `belongs_to` macro:

```ruby
class Song < ActiveRecord::Base
  belongs_to :artist
end
```

Songs also belong to a genre, so we'll use the same macro to implement that
relationship:

```ruby
class Song < ActiveRecord::Base
  belongs_to :artist
  belongs_to :genre
end
```

### An Artist Has Many Songs

Create a file, `app/models/artist.rb`. Define your `Artist` class to inherit
from `ActiveRecord::Base`:

```ruby
class Artist < ActiveRecord::Base

end
```

We need to tell the `Artist` class that each artist object can have many songs.
We will use the `has_many` macro to do it.

```ruby
class Artist < ActiveRecord::Base
  has_many :songs

end
```

And that's it! Now, because our songs table has an `artist_id` column and
because our `Artist` class uses the `has_many` macro, an artist has many songs!

It is also true that an artist has many genres through songs. We will use the
`has_many through` macro to implement this:

```ruby
class Artist < ActiveRecord::Base
  has_many :songs
  has_many :genres, through: :songs
end
```

### Genres Have Many Songs and Have Many Artists

Create a file `app/models/genre.rb`. In it, define a class, `Genre`, to inherit
from `ActiveRecord::Base`.

```ruby
class Genre < ActiveRecord::Base

end
```

A genre can have many songs. Let's implement that with the `has_many` macro:

```ruby
class Genre < ActiveRecord::Base
  has_many :songs
end
```

A genre also has many artists through its songs. Let's implement this
relationship with the `has_many through` macro:

```ruby
class Genre < ActiveRecord::Base
  has_many :songs
  has_many :artists, through: :songs
end
```

And that's it! The tests in this lesson are in place to ensure you've properly
set up these associations. You can go ahead and run `learn` now to see if you
pass them all before continuing.

## Our Code in Action: Working with Associations

Go ahead and run the test suite and you'll see that we are passing all of our
tests! Amazing! Our associations are all working, just because of our migrations
and use of macros.

Let's play around with our code.

In your console, run `rake console`. Now we are in a Pry console that accesses
our models.

Let's make a few new songs:

```bash
[1]pry(main)> hello = Song.new(name: "Hello")
=> #<Song:0x007fc75a8de3d8 id: nil, name: "Hello", artist_id: nil, genre_id: nil>
[2]pry(main)> hotline_bling = Song.new(name: "Hotline Bling")
=> #<Song:0x007fc75b9f3a38 id: nil, name: "Hotline Bling", artist_id: nil, genre_id: nil>
```

Okay, here we have two songs. Let's make some artists to associate them to. In
the *same PRY sessions as above*:

```bash
[3] pry(main)> adele = Artist.new(name: "Adele")
=> #<Artist:0x007fc75b8d9490 id: nil, name: "Adele">
[4] pry(main)> drake = Artist.new(name: "Drake")
=> #<Artist:0x007fc75b163c60 id: nil, name: "Drake">
```

So, we know that an individual song has an `artist_id` attribute. We *could*
associate `hello` to `adele` by setting `hello.artist_id=` equal to the `id` of
the `adele` object. BUT! Active Record makes it so easy for us. The macros we
implemented in our classes allow us to associate a song object directly to an
artist object:

```bash
[5] pry(main)> hello.artist = adele
=> #<Artist:0x007fc75b8d9490 id: nil, name: "Adele">
```

Now, we can ask `hello` who its artist is:

```bash
[6] pry(main)> hello.artist
=> #<Artist:0x007fc75b8d9490 id: nil, name: "Adele">
```

We can even chain methods to ask `hello` for the *name* of its artist:

```bash
[7] pry(main)> hello.artist.name
=> "Adele"
```

Wow! This is great, but we're not quite where we want to be. Right now, we've
been able to assign an artist to a song, but is the reverse true?

```bash
[7] pry(main)> adele.songs
=> []
```

In this case, we still need to tell the `adele` Artist instance which songs
it has. We can do this by pushing the song instance into `adele.songs`:

```bash
[7] pry(main)> adele.songs.push(hello)
=> [#<Song:0x007fc75a8de3d8 id: nil, name: "Hello", artist_id: nil, genre_id: nil>]
```

Okay, now both sides of the relationships are updated, but so far all the work
we've done has been with temporary instances of Artist and Song. To persist
these relationships, we can use Active Record's `save` functionality:

```bash
[8] pry(main)> adele.save
=> true
[9] pry(main)> adele
=> #<Artist:0x007fc75b8d9490 id: 1, name: "Adele">
```

Notice that `adele` now has an `id`. What about `hello`?

```bash
[10] pry(main)> hello
=> #<Song:0x007fc75a8de3d8 id: 1, name: "Hello", artist_id: nil, genre_id: nil>
```

Whoa! We didn't mention `hello` when we saved. However, we established an
association by assigning `hello` as a song `adele` _has_. In order for `adele`
to save, `hello` must also be saved. Thus, `hello` has also been given an `id`.

Go ahead and do the same for `hotline_bling` and `drake` to try it out on your
own.

## Adding Additional Associations

Now, let's make a second song for adele:

```bash
[8] pry(main)> someone_like_you = Song.new(name: "Someone Like You")
=> #<Song:0x007fc75b5cabc8 id: nil, name: "Someone Like You", artist_id: nil, genre_id: nil>
[8] pry(main)> someone_like_you.artist = adele
=> #<Artist:0x007fc75b8d9490 id: 1, name: "Adele">
```

We've only updated the song, so we should expect that `adele` is not
aware of this song:

```bash
[8] pry(main)> someone_like_you.artist
=> #<Artist:0x007fc75b8d9490 id: 1, name: "Adele">
[9] pry(main)> adele.songs
=> [#<Song:0x007fc75b9f3a38 id: 1, name: "Hello", artist_id: 1, genre_id: nil>]
```

Even if we save the song, `adele` will not be updated.

```bash
[8] pry(main)> someone_like_you.save
=> true
[8] pry(main)> someone_like_you
=> #<Song:0x007fc75b5cabc8 id: 2, name: "Someone Like You", artist_id: 1, genre_id: nil>
[9] pry(main)> adele.songs
=> [#<Song:0x007fc75b9f3a38 id: 1, name: "Hello", artist_id: 1, genre_id: nil>]
```

But lets see what happens when we switch some things around. Creating one more
song:

```bash
[8] pry(main)> set_fire_to_the_rain = Song.new(name: "Set Fire to the Rain")
=> #<Song:0x007fc75b5cabc8 id: nil, name: "Set Fire to the Rain", artist_id: nil, genre_id: nil>
```

Then add the song to `adele`:

```bash
[9] pry(main)> adele.songs.push(set_fire_to_the_rain)
=> [#<Song:0x007fc75b9f3a38 id: 1, name: "Hello", artist_id: 1, genre_id: nil>, #<Song:0x00007feac2be4f38 id: 3, name: "Set Fire to the Rain", artist_id: 1, genre_id: nil>]
```

Whoa! Check it out - we did not explicitly save `set_fire_to_the_rain`, but just
by pushing the instance into `adele.songs`, Active Record has gone ahead and
saved the instance. Not only that, notice that the song instance _also has an
aritst_id!_

```bash
[8] pry(main)> set_fire_to_the_rain.artist
=> #<Artist:0x007fc75b8d9490 id: 1, name: "Adele">
```

So what is happening? Active Record is doing things for us behind the scenes,
but when dealing with associations, it will behave differently depending on
which side of a relationship between two models you are updating.

**Remember**: In a `has_many`/`belongs_to` relationship, we can think of the
model that `has_many` as the parent in the relationship. The model that
`belongs_to`, then, is the child. If you tell the child that it belongs to
the parent, *the parent won't know about that relationship*. If you tell the
parent that a certain child object has been added to its collection, *both the
parent and the child will know about the association*.

Let's see this in action again. Let's create another new song and add it to `adele`'s
songs collection:

```bash
[10] pry(main)> rolling_in_the_deep = Song.new(name: "Rolling in the Deep")
=> #<Song:0x007fc75bb4d1e0 id: nil, name: "Rolling in the Deep", artist_id: nil, genre_id: nil>
```

```bash
[11] pry(main)> adele.songs << rolling_in_the_deep
=> [ #<Song:0x007fc75bb4d1e0 id: 4, name: "Rolling in the Deep", artist_id: 1, genre_id: nil>]
[12] pry(main)> rolling_in_the_deep.artist
=> #<Artist:0x007fc75b8d9490 id: 4, name: "Adele">
```

We added `rolling_in_the_deep` to `adele`'s collection of songs and we can see
the `adele` knows it has that song in the collection *and* `rolling_in_the_deep`
knows about its artist. Not only that, `rolling_in_the_deep` is not persisted to
the database.

Notice that `adele.songs` returns an array of songs. When a model `has_many` of
something, it will store those objects in an array. To add to that collection,
we use the shovel operator, `<<`, to operate on that collection, treat
`adele.songs` like any other array.

Let's play around with some genres and our has many through association.

```bash
[13] pry(main)> pop = Genre.create(name: "pop")
=> #<Genre:0x007fa34338d270 id: 1, name: "pop">
```

This time, we'll just use `create` directly, which would be the same as running
`Genre.new`, then `Genre.save`.

```bash
[14] pry(main)> pop.songs << rolling_in_the_deep
=> [#<Song:0x007fc75bb4d1e0 id: 4, name: "Rolling in the Deep", artist_id: 1, genre_id: 1>]
[15] pry(main)> pop.songs
=> [#<Song:0x007fc75bb4d1e0 id: 4, name: "Rolling in the Deep", artist_id: 1, genre_id: 1>]
[16] pry(main)> rolling_in_the_deep.genre
=> #<Genre:0x007fa34338d270 id: 1, name: "pop">
```

It's working! But even cooler is that we've established has many _through_
relationships. By creating a genre, then pushing a song into that genre's list
of songs, _the genre will now be able to produce its associated artists!_

```bash
[16] pry(main)> rolling_in_the_deep.artist
=> #<Artist:0x007fc75b8d9490 id: 4, name: "Adele">
[17] pry(main)> pop.artists
=> [#<Artist:0x007fc75b8d9490 id: 1, name: "Adele">]
[28] pry(main)> adele.genres
=> [#<Genre:0x007fa34338d270 id: 1, name: "pop">]
```

## Conclusion

So, order and direction of operations does matter when establishing associations
between models - it is typically better to update the `has_many` side of a
relationship to get the full benefit of Active Record's power. Still, as we can
see, with just migrations and Active Record macros, we can start to build and
persist associations between things!

## Video Reviews

* [Active Record Associations](https://www.youtube.com/watch?v=5dqPYRsQd10)

* [Active Record Associations II](https://www.youtube.com/watch?v=l9JCzNN2Z2U)

* [Aliasing Active Record Associations](https://www.youtube.com/watch?v=WVBWlnUghOI)

* [Blog CLI with Active Record and Associations](https://www.youtube.com/watch?v=ZfJ1rqFcNFU)

<p class='util--hide'>View <a href='https://learn.co/lessons/activerecord-associations-intro'>Active Record Associations</a> on Learn.co and start learning to code for free.</p>
