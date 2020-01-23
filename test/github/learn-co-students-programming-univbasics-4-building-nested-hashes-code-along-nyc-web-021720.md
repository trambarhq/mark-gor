# Building Nested Hashes Code Along

## Learning Goals

- Build a nested hash.
- Access and manipulate data in nested hashes.

## Code Along Challenge: Epic Tragedy

You're 16 years old and back in high school English class. Luckily for us, our
teacher is kind of lazy and we get to watch the _Romeo and Juliet_ movie from
the '90s starring Leonardo DiCaprio and Claire Danes.

![](http://readme-pics.s3.amazonaws.com/RomeoandJuliet5.jpg)

But there's a Romeo and Juliet quiz our teacher has scheduled for us that we
need to get ready for. We will definitely be required to answer some questions
on the cast of characters and their attributes and relationships to one another.
Let's map out that information:

![Montague/Capulet Family Tree](https://curriculum-content.s3.amazonaws.com/programming-univbasics-4/nested-hashes/Image_7_NestedHash.png)

What we have here is a nested data structure. There are different levels or
tiers of information. On the top tier, we have family names. Beneath that we
have key characters, and beneath that we have their attributes. We have an
additional layer of the hero/heroine's friends because there are multiple
friends. Now that we have a sense of the structure that our collection of
information is taking, we're going to build a nested hash that displays it in
the same nested way. Our end result will look like this:

```ruby
epic_tragedy = {
  :montague => {
    :patriarch => {
      :name => "Lord Montague",
      :age => "53"
  },
    :matriarch => {
      :name => "Lady Montague",
      :age => "54"
  },
    :hero => {
      :name => "Romeo",
      :age => "15"
  },
    :hero_friends => [
      {
         :name => "Benvolio",
         :age => "17",
         :attitude => "worried"
      },
      {
        :name => "Mercutio",
        :age => "18",
        :attitude => "hot-headed"
      }
    ]
  },
  :capulet => {
    :patriarch => {
      :name => "Lord Capulet",
      :age => "50"
    },
    :matriarch => {
      :name => "Lady Capulet",
      :age => "51"
    },
    :heroine => {
      :name => "Juliet",
      :age => "15",
      :status => "alive"
    },
    :heroine_friends=> [
      {
        :name => "Steven",
        :age => "30",
        :attitude => "confused"
      },
      {
        :name => "Nurse",
        :age => "44",
        :attitude => "worried"
      }
    ]
  }
}
```

> **Note:** You might notice that we are storing ages as strings. That is
> because the ages here are not numbers that we need to frequently do math with.
> If a hash value was a number that we needed to manipulate, then we would store
> it as an integer. For example, if it was the price of an item that we need to
> calculate the tax on, then the price would be stored as an integer or float.
> Otherwise, it is conventional to store information like a person's age as a
> string.

Remember that the `key: value` syntax is the same as the `:key => value` syntax
used above. Get ready to see them both used in different applications and
sources.

## Instructions

This is a complicated data structure, so we're going to build it up one step at
a time. Follow along with the walk-through below.

### Code Along Challenge I: Family Names

In `lib/first_challenge.rb`, you're going to fill out the content of the
`epic_tragedy` hash. The first level of our nested hash are the keys for the
family names, "Montague" and "Capulet". We've made them symbols above, because
symbols make better hash keys than strings.

- Set the `epic_tragedy` variable equal to a hash with two key/value pairs. The
  keys should be symbols of the family names (`:montague` and `:capulet`) and the
  values should be empty hashes.

At this point, we have a hash that looks like this:

```ruby
epic_tragedy = {
  :montague => {},
  :capulet => {}
}
```

Now it's time to fill out the second level of our hash — the collection of data
that constitutes the value hashes of each family name key.

### Code Along Challenge II: Character Roles

In `lib/second_challenge.rb`, you'll find the hash you built in the previous
challenge.

Fill out the empty hash that is the value of the `:montague` key. There are four
keys in this hash:

- `:patriarch`
- `:matriarch`
- `:hero`
- `:hero_friends`

The first three of these keys point to the value of an empty hash. The fourth key
`:hero_friends` has the value of an empty array.

Then, do the same for the empty hash that is the value of the `:capulet` key.
This time, your keys are:

- `:patriarch`
- `:matriarch`
- `:heroine`
- `:heroine_friends`

The values are the same as described above. Once you get this test passing, you
should have a hash that looks like this:

```ruby
epic_tragedy = {
   :montague => {
      :patriarch => {},
      :matriarch => {},
      :hero => {},
      :hero_friends => []
   },
   :capulet => {
      :patriarch => {},
      :matriarch => {},
      :heroine => {},
      :heroine_friends => []
   }
}
```

Now we're ready to fill out the empty hashes that constitute the values for the
`:patriarch`, `:matriarch` and `:hero`/`:heroine` keys, nested inside the family
name keys of our epic `epic_tragedy hash`.

### Code Along Challenge III: Character Attributes

According to the diagram that we saw at the very beginning of this exercise,
each character has a set of attributes. Matriarch and Patriarchs have a name and
an age. The hero and heroine each have a name, age and status.

In `lib/third_challenge`, you'll find the hash that you built in the previous
challenge. Fill out the empty hashes that are the values of the `:patriarch`,
`:matriarch`, and `:hero`/`:heroine` keys with the following key/value pairs.

- The Montague `:patriarch` has
  - a `:name` of "Lord Montague" and
  - an `:age` of "53".
- The Montague `:matriarch` has
  - a `:name` of "Lady Montague" and
  - an `:age` of "54".
- The Montague `:hero` has
  - a `:name` of "Romeo",
  - an `:age` of "15", and
  - a `:status` of "alive".
- The Capulet `:patriarch` has
  - a `:name` of "Lord Capulet" and
  - an `:age` of "50".
- The Capulet `:matriarch` has
  - a `:name` of "Lady Capulet" and
  - an `:age` of "51".
- The Capulet `:heroine` has
  - a `:name` of "Juliet",
  - an `:age` of "15", and
  - a `:status` of "alive".

Once you get this test passing, you should have the following hash:

```ruby
epic_tragedy = {
   :montague => {
      :patriarch => {name: "Lord Montague", age: "53"},
      :matriarch => {name: "Lady Montague", age: "54"},
      :hero => {name: "Romeo", age: "15", status: "alive"},
      :hero_friends => []
   },
   :capulet => {
      :patriarch => {name: "Lord Capulet", age: "50"},
      :matriarch => {name: "Lady Capulet", age: "51"},
      :heroine => {name: "Juliet", age: "15", status: "alive"},
      :heroine_friends => []
   }
}
```

We're almost done. Our hero and heroine have two friends each. That constitutes
a collection of friends. Since they each have a collection of friends, it makes
sense to collect those friends in an array. Since each friend will have his or
her own attributes (name, age, etc), our array will be _an array of hashes_!

### Code Along Challenge IV: Nesting Friends and Attributes

The values of the `:hero_friends` and `:heroine_friends` keys currently point to
empty arrays. Why arrays? Well, we know that an individual person can be
represented by a hash. However, our hero and heroine have multiple friends. So,
we need a way to store their friends in list-form. Luckily for us, that's just
what arrays are for.

Fill out these empty arrays with a series of hashes that will contain key/value
pairs describing these friends.

The hero's two friends are Benvolio and Mercutio. So, the `:hero_friends` array
will contain two hashes. Each of these two hashes has the following three keys:

- `:name`
- `:age`
- `:attitude`

The hero's first friend has

- a name of "Benvolio",
- an age of "17", and
- an attitude of "worried".

The hero's second friend has

- a name of "Mercutio",
- an age of "18", and
- an attitude of "hot-headed".

The heroine's two friends are Steven and Nurse. So, the `:heroine_friends` array
will contain two hashes. Each of these two hashes has the following three keys:

- `:name`
- `:age`
- `:attitude`

The heroine's first friend has

- a name of "Steven",
- an age of "30", and
- an attitude of "confused".

The heroine's second friend has

- a name of "Nurse",
- an age of "44", and
- an attitude of "worried".

Once you get this test passing, your hash should look like this:

```ruby
epic_tragedy = {
   :montague => {
      :patriarch => {name: "Lord Montague", age: "53"},
      :matriarch => {name: "Lady Montague", age: "54"},
      :hero => {name: "Romeo", age: "15", status: "alive"},
      :hero_friends => [
         {name: "Benvolio", age: "17", attitude: "worried"},
         {name: "Mercutio", age: "18", attitude: "hot-headed"}
      ]
   },
   :capulet => {
      :patriarch => {name: "Lord Capulet", age: "50"},
      :matriarch => {name: "Lady Capulet", age: "51"},
      :heroine => {name: "Juliet", age: "15", status: "alive"},
      :heroine_friends => [
          {name: "Steven", age: "30", attitude: "confused"},
          {name: "Nurse", age: "44", attitude: "worried"}
      ]
   }
}
```

## Bonus: Manipulating the Hash

In the previous lesson we learned that you can access a value in a hash like
this:

```ruby
hash = {first: "first value!", second: "second value!"}

hash[:first]
#  => "first value!"
```

To access the values in our nested hash, we simply tack on additional keys,
until we have the last key that points to the value we want to access.

For example, to access the Montague patriarch's name, I use the hash name,
`epic_tragedy`, followed by a chained list of all of the key names that precede
the value of his name, enclosed in brackets:

```ruby
epic_tragedy[:montague][:patriarch][:name]
#  => "Lord Montague"
```

We can even use this method to change the value of a particular key. If we
wanted to reset the Montague patriarch's name to "Michael Jordan", we would do
it in the following way:

```ruby
epic_tragedy[:montague][:patriarch][:name] = "Michael Jordan"

puts epic_tragedy

#  =>
{
   :montague => {
      :patriarch => {name: "Michael Jordan", age: "53"},
      :matriarch => {name: "Lady Montague", age: "54"},
      :hero => {name: "Romeo", age: "15", status: "alive"},
      :hero_friends => [
        {name: "Benvolio", age: "17", attitude: "worried"},
        {name: "Mercutio", age: "18", attitude: "hot-headed"}
      ]
   },
   :capulet => {
      :patriarch => {name: "Lord Capulet", age: "50"},
      :matriarch => {name: "Lady Capulet", age: "51"},
      :heroine => {name: "Juliet", age: "15", status: "alive"},
      :heroine_friends => [
        {name: "Steven", age: "30", attitude: "confused"},
        {name: "Nurse", age: "44", attitude: "worried"}
      ]
   }
}
```

![Montague/Capulet Family Tree w/ Michael Jordan](https://curriculum-content.s3.amazonaws.com/programming-univbasics-4/nested-hashes/Image_8_NestedHash.png)

### Bonus Code Along Challenge

In `lib/bonus.rb` you'll see our completed `epic_tragedy hash`. We're coming to
the end of the epic tragedy of Romeo and Juliet. At this point in the story,
Romeo and Juliet are — as in every good tragedy — quite dead. Use the above
method to change the status of our hero Romeo and our heroine Juliet from
"alive" to "dead". These are a bonus and if you're feeling comfortable with
Hashes, feel free to move forward. Also, to enable these tests, make sure to
remove the `x` in front of the `it` block in spec/bonus_spec.rb.

## Conclusion

Nested hashes can be very complex! However, their structure is very consistent.
Once data is contained within a hash, as long as we have the right keys, we can
access data from anywhere on the hash, no matter how deeply nested the data is.

Good night, good night! parting is such sweet sorrow, That I shall say good
night till it be morrow.
