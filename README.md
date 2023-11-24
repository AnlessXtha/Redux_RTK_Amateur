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

## **Code**

        reactionAdded(state, action) {
            const { postId, reaction } = action.payload;
            const existingPost = state.find((post) => post.id === postId);
            if (existingPost) {
                existingPost.reactions[reaction]++;
            }
        },

## **Explained**

1. `reactionAdded` Reducer:

   - This is a reducer function that handles the action of adding a reaction to a post.
   - Reducers in Redux are responsible for specifying how the application's state changes in response to actions.
   - The `reactionAdded` reducer takes two parameters: `state` (the current state) and `action` (the action dispatched to the store).

2. Action Payload:

   - The `action` object is expected to have a `payload` property, which contains information about the reaction being added.
   - The `payload` object is destructured to obtain `postId` and `reaction`.

3. Updating State:

   - The reducer then attempts to find the post in the `state` array with the matching `postId`.
   - If an existing post is found, it increments the count of the specified `reaction` type in the post's `reactions` object.

Here's a step-by-step breakdown of the logic:

- Destructuring:

  - `const { postId, reaction } = action.payload;`: Extracts `postId` and `reaction` from the action payload.

- Finding the Existing Post:

  - `const existingPost = state.find((post) => post.id === postId);`: Uses the `find` method to locate the post in the `state` array with the matching `postId`.

- Updating Reaction Count:

  - If an existing post is found (`if (existingPost)`), it increments the count of the specified `reaction` type in the post's `reactions` object: `existingPost.reactions[reaction]++;`.

In summary, when the `reactionAdded` action is dispatched, the reducer looks for the post in the state with the corresponding ID. If the post is found, it increments the count of the specified reaction in the post's reactions object. This mechanism allows the application to track and update reactions associated with each post in the state.

## **Code**

    const ReactionButton = ({ post }) => {
    const dispatch = useDispatch();

    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
        <button
            key={name}
            type="button"
            className="reactionButton"
            onClick={() =>
            dispatch(reactionAdded({ postId: post.id, reaction: name }))
            }
        >
            {emoji} {post.reactions[name]}
        </button>
        );
    });

    return <div>{reactionButtons}</div>;
    };

## **Explained**

1.  Functional Component:

    - `ReactionButton` is a functional component in React.
    - It takes a single prop `post`, which presumably represents a post object.

2.  Dispatching Actions:

    - `const dispatch = useDispatch();`: This line uses the useDispatch hook from the React-Redux library to get access to the dispatch function. `dispatch` is used to dispatch actions to the Redux store.

3.  Mapping Reaction Buttons:

    - `Object.entries(reactionEmoji).map(([name, emoji]) => {...}`: This line iterates over the entries of the `reactionEmoji` object using `Object.entries`. Each entry consists of a `name` (reaction type) and an `emoji`.
    - For each reaction type, it creates a button element.

4.  Button Element:

    - `<button ... onClick={() => dispatch(reactionAdded({ postId: post.id, reaction: name }))}>`: This line creates a button element with the following characteristics:
      - key={name}: A unique key for React to efficiently track changes.
      - type="button": Specifies that this is a button element.
      - className="reactionButton": Assigns the CSS class "reactionButton" to the button.
      - onClick={() => dispatch(reactionAdded({ postId: post.id, reaction: name }))}: Specifies an onClick event handler. When the button is clicked, it dispatches the reactionAdded action to the Redux store. The action payload includes the postId (from the post prop) and the reaction type (name).

5.  Displaying Emoji and Reaction Count:

    `{emoji} {post.reactions[name]}`: Inside the button, it displays the emoji associated with the reaction type (`emoji`) and the count of that reaction type for the specific post (`post.reactions[name]`).

6.  Rendering:

    `return <div>{reactionButtons}</div>;`: The component renders a `div` containing all the reaction buttons generated in the previous step.

In summary, the `ReactionButton` component renders a set of reaction buttons based on the entries in the `reactionEmoji` object. When a button is clicked, it dispatches a `reactionAdded` action to the Redux store, updating the state with the new reaction count for the associated post. The component dynamically displays the emoji and the current count for each reaction type.

## **Code**

## **Explained**
