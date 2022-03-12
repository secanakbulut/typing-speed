# typing-speed

small typing test i wrote one evening. shows wpm and accuracy as you type. picks a random short paragraph from a hardcoded pool.

## how to run it

no build step, just open the file.

```
git clone https://github.com/secanakbulut/typing-speed.git
cd typing-speed
open index.html
```

or double click `index.html`. that works too.

## how the numbers work

- wpm = (characters typed / 5) / minutes elapsed. the divide-by-five is the standard way, since the average english word is about five characters.
- accuracy = correct characters / total characters typed, as a percentage. correct means the character matches the same position in the passage.

timer starts on the first keypress. default limit is 60 seconds, you can switch to 30 or 120. if you finish the passage before time runs out, it ends early.

## stack

plain html, css, js. no libraries.

## license

released under PolyForm Noncommercial 1.0.0. fine for personal use, not for resale or commercial work.
