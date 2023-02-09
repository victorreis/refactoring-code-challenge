# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

I applied the "early return" pattern by removing the nested ifs and returning `TRIVIAL_PARTITION_KEY` if the event is falsy. I extracted the constants and created functions for each piece of code with some meaning to improve the readability without needing comments and to apply the `Single Responsibility` and the `DRY` (`Don't Repeat Yourself`) principles. With this, the `deterministicPartitionKey` function was turned into a orchestrator function. I turned the `let` into `const`, removed all reatributions of the code to ensure immutability and created meaningful names for each constant. Additionally, I created a treatment to `bigint` numbers (not supported previously).
