# React Redux Clean architecture starter

Hi all, I set up this starter because one, I like to test stuff with Redux in clean architecture, and two, I rather like to work cleanly. So basically I'm recreating quite a few projects with the structure and various installations.

It's about time I put an end to this pain, and if it can help other people, I'd be delighted!

## Dependencies

I used vite and vitest with a global installation (so I didn't need to import "describe", "it", etc.). For those who are used to Jest, you'll simply see no change, apart from tests that launch super-fast.

As far as Redux dependencies are concerned, there's Reselect, which lets you memorize and compose selectors. There's also Redux-persist for persisting the branches of your store that interest you.

And finally, there's React-redux for consuming selectors once they're in the React world.

So React is the primary adapter.

## Notes

The eslint rules are the ones delivered with Vite/React by default, so you're free to add your own and customize them as you see fit.

I've included an initReduxStore function in this starter for the time being, but I don't know if it's relevant for all projects (trivial projects, I mean) to use a storeBuilder. I've been using a builder for a while now, since my needs have evolved (explanations for another day).

Suggestion: You can do it yourself for practice, or I could do another branch with a builder if asked.

## Final notes

If you're new to these practices, I'd advise you not to start with a starter, but rather to build projects from scratch. In this way, you'll be able to bring certain dependencies to bear on your needs, and so understand what problems they solve/why you should use them.
