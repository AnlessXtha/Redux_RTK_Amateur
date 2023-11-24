# Code Explained

## **Code**

    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content, userId) {
        // prepare callback
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },

## **Explained**

1.  `postAdded` Reducer:

    - This is a reducer function that handles the action of adding a new post.
    - Reducers in Redux are responsible for specifying how the application's state changes in response to actions.
    - The `reducer` function takes two parameters: state (the current state) and `action` (the action dispatched to the store).
    - In this case, the reducer simply pushes the `action.payload` (which represents a new post) into the `state` array. This assumes that state is an array.

2.  `prepare` Callback:

    - The `prepare` function is a callback used to prepare the action object for the `postAdded` reducer.
    - It takes `title`, `content`, and `userId` as parameters.
    - It returns an object with a `payload` property containing the details of the new post.
      - `id`: Generated using `nanoid()` (or a similar function for creating unique IDs).
      - `title`, `content`, and `userId`: Passed as parameters to the `prepare` function.
      - `date`: Current date and time in ISO format, representing when the post is created.
      - `reactions`: An object containing different reaction types with initial counts set to 0.

In summary, when the `postAdded` action is dispatched, the `reducer` function is called, and it adds a new post to the state array. The details of the new post are provided by the `prepare` function, which generates a unique ID, sets the post's date, and initializes reaction counts to 0. This structure is a convention often used with the Redux Toolkit to make it easier to handle actions and reducers in a concise and predictable manner.
