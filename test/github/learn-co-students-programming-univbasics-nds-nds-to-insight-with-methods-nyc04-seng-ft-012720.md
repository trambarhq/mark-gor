# Derive Insight from NDS Using Methods

## Learning Goals

* Wrap uses of `[]` from Step 2 into new method
* Create a "First-Order" method
* Ensure "First-Order Methods" use arguments to create flexibility

## Introduction

In the previous lab we used our knowledge of REPETITION and `Array` syntax to
answer the question: "***What's the total value of all the snacks in this
vending machine?***"

But our code didn't take advantage of our ability to create _methods_ to help
our human brains understand what the code was doing. While the previous
implementation _worked_, it's not fun or easy to reason about. In this lesson,
we'll follow step 3 of our process:

> 3. Wrap uses of `[]` from Step 2 into new methods
>   * Create simple methods with meaningful names ("First-Order Methods")
>   * Ensure "First-Order Methods" use arguments to create flexibility

## "Be Smarter, Code Readers"

You might disagree with our assessment that the previous code is "too complex."
Many developers have used the excuse that "it's not ***their*** fault that
***other people*** aren't smart enough to read ***their*** (brilliant) code."

Baloney.

Readability is a real concern for our code. Remember, we want computers to run
our code, but it's more important that humans understand our problem-solving
process. A good guideline for when our code is clean enough is "the 3 a.m.
rule."

Your guiding rule of thumb should be "can a reasonable person understand this
code at 3 am on 3 hours of sleep 3 weeks from now?" If you can honestly say,
"Yes. This is the most understandable I can do right now," then you've probably
gotten clean enough.

Our guideline comes from the idea of being an "on-call" support programmer.
You're warm and cozy in bed. Suddenly your phone (pager?) goes off: site is
down, it's the day before your biggest online sales day. You go to look at the
code that's sending out the error and you see...(your code here)...if you, in
this exercise of empathy, feel like crying, then you should clean up your code
more. If you feel like you've given your future self and other developers a
strong, understandable basis for fixing things, you've met the guideline.

## Wrap Uses of `[]` from Step 2 into new method

At the end of the previous lesson, our solution to calculate the aggregate
value of snacks in the vending machine looked like this:

```ruby
vm = [[[{:name=>"Vanilla Cookies", :price=>3}, {:name=>"Pistachio Cookies", :price=>3}, {:name=>"Chocolate Cookies", :price=>3}, {:name=>"Chocolate Chip Cookies", :price=>3}], [{:name=>"Tooth-Melters", :price=>12}, {:name=>"Tooth-Destroyers", :price=>12}, {:name=>"Enamel Eaters", :price=>12}, {:name=>"Dentist's Nightmare", :price=>20}], [{:name=>"Gummy Sour Apple", :price=>3}, {:name=>"Gummy Apple", :price=>5}, {:name=>"Gummy Moldy Apple", :price=>1}]], [[{:name=>"Grape Drink", :price=>1}, {:name=>"Orange Drink", :price=>1}, {:name=>"Pineapple Drink", :price=>1}], [{:name=>"Mints", :price=>13}, {:name=>"Curiously Toxic Mints", :price=>1000}, {:name=>"US Mints", :price=>99}]]]


grand_total = 0
row_index = 0
while row_index < vm.length do
  column_index = 0
  while column_index < vm[row_index].length do
    inner_len = vm[row_index][column_index].length
    inner_index = 0
    while inner_index < inner_len do
      # Explanation!
      # vm[row][column][spinner]
      # spinner is full of Hashes with keys :price and :name
      grand_total += vm[row_index][column_index][inner_index][:price]
      inner_index += 1
    end
    column_index += 1
  end
  row_index += 1
end

p grand_total #=> 1192
```

Look where we introduced our comments. Generally, comments that explain
***why*** something is done like `# Added because of Bug #123123, don't remove
the following reset!` or that document some really tricky bit of code like `#
Optimization seen in blog post
http://example.com/101-ways-to-speed-up-an-application#32` are great additions
to code.

***However***, _this_ comment is a little different, it's here because our code
is really hard to understand. As programmer Brian Kernighan once said: "Don't
comment bad code ‐ rewrite it." One of the best ways to "rewrite" complex code
is to put its work or "thinking" inside of a _method_ with a meaningful name.

Let's examine the nasty code we tried to "explain away" with a comment:

```ruby
# Invalid code, can't be pasted into IRB!
    inner_index = 0
    while inner_index < inner_len do
    # vm[row][column][spinner]
    # spinner is full of Hashes with keys :price and :name
    grand_total += vm[row_index][column_index][inner_index][:price]
    inner_index += 1
    end
    column_index += 1
```

Inside this code two key things happen:

1. We total up the price in each of the snacks on a vending machine "spinner"
2. We "accumulate" that number to a grand total.

This would be simpler if we had a method that could
`total_value_of_spinner`. For each spinner in the row, we'd hand the spinner to
our method, and the method would return the total number of snacks on the
spinner.  Then, we'd accumulate those returned spinner totals to a grand total.

Beginners are often staggered by the idea we just presented: that we can just
code into existence things we wish we had.  But ...  Yes! We can! And we
should! It's strange, many beginners understand _how_ to write methods but have
not yet had an "Ah-hah!" moment when they realize that _we_ don't serve the
methods, the methods serve _us_. We hope some of you have been enlightened by
reading that sentence!

Let's create the method `total_value_of_spinner`. It will take as
arguments:

* the NDS
* the row coordinate
* and the column coordinate

and return the total value of snacks on that spinner.

The implementation of `total_value_of_spinner` will largely be the
pre-existing code, but will make use of passed-in arguments.

```ruby
vm = [[[{:name=>"Vanilla Cookies", :price=>3}, {:name=>"Pistachio Cookies", :price=>3}, {:name=>"Chocolate Cookies", :price=>3}, {:name=>"Chocolate Chip Cookies", :price=>3}], [{:name=>"Tooth-Melters", :price=>12}, {:name=>"Tooth-Destroyers", :price=>12}, {:name=>"Enamel Eaters", :price=>12}, {:name=>"Dentist's Nightmare", :price=>20}], [{:name=>"Gummy Sour Apple", :price=>3}, {:name=>"Gummy Apple", :price=>5}, {:name=>"Gummy Moldy Apple", :price=>1}]], [[{:name=>"Grape Drink", :price=>1}, {:name=>"Orange Drink", :price=>1}, {:name=>"Pineapple Drink", :price=>1}], [{:name=>"Mints", :price=>13}, {:name=>"Curiously Toxic Mints", :price=>1000}, {:name=>"US Mints", :price=>99}]]]

def total_value_of_spinner(nds, row_index, column_index)
  coordinate_total = 0
  inner_len = nds[row_index][column_index].length
  inner_index = 0
  while inner_index < inner_len do
    coordinate_total += nds[row_index][column_index][inner_index][:price]
    inner_index += 1
  end
  coordinate_total
end

# Main code

grand_total = 0
row_index = 0
while row_index < vm.length do
  column_index = 0
  while column_index < vm[row_index].length do
    grand_total += total_value_of_spinner(vm, row_index, column_index)
    column_index += 1
  end
  row_index += 1
end

# End Main code

p grand_total #=> 1192
```

Take a look at that code between the "`Main code...End Main code`" markers.
See how it's easier to read? Without the extra noise, it's easier to see that
we're iterating through grid coordinates and, for each coordinate pair, we're
asking some other bit of thinking called `total_value_of_spinner` to tell us
the value of snacks in the spinner. This liberates our brains from having to
think about the low-level `[]` details inside the method.

This is the heart of programming: building small little methods that make it
easy for humans to reason about how we asked a computer to help us figure
something out. Programmers call this "managing complexity." To quote guru Brian
Kernighan:

> Controlling complexity is the essence of computer programming.

## Create a "First-Order" Method

We call `total_value_of_spinner` a "First-Order Method." It wraps the basic
Ruby code in a meaningful name. "First-Order" means that instead of dealing
with "atomic" Ruby syntax like `[]`, we're working at a higher level of
abstraction that's a "first step" or "first order" away from the foundational
syntax.

A "First-Order" method in real life is "make a sandwich." It's many of many,
many, smaller, atomic operations, but instead of thinking terms of _all_ of
them, we talk about a "First-Order" activity, "make a sandwich."

## Ensure "First-Order Methods" Use Arguments to Create Flexibility

It's worth taking a moment to consider the arguments to
`total_value_of_spinner`. We chose arguments that allow flexibility
(`total_value_of_spinner` is better than `total_value_of_first_spinner`).

Also, by passing the big NDS in the method call we're saying "Look, we don't
want to know how you calculate this, but you're going to need these three
facts: NDS, row coordinate, and column coordinate."

You might recall that the process of making methods that are flexible based on
arguments is called _abstraction_. We should endeavor to make our methods
appropriately _abstract_. We _can_ make them too abstract and sometimes not
abstract enough. How to decide if you're in the sweet spot? Sadly, that takes
experience. Let the "3 a.m. rule" be your guide.

## Lab

In the lab you're going to work with the directors NDS again and clean up your
implementation from the previous lesson. You're going to be prompted to create
a "First-order method" that will make your code cleaner (`gross_for_director`).

This method will be used by another method that contains _it_ called
`directors_totals`. It returns a `Hash` of directors names to their total
gross, like we've seen before, but it's much neater code.

## Conclusion

While the _insight_ we discovered in this has remained the same from the last
lesson, you should find this code easier to scan and understand. Wrapping
"working code" inside of methods that make the code easier to work with is a
vital step in code mastery.
