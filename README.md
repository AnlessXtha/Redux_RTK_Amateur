# **Fix the Duplication Error in Project 3** (Fixed)

# Code Explained (2_Post)

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

    const orderedPosts = posts
        .slice()
        .sort((a, b) => b.date.localeCompare(a.date));

## **Explained**

1. Shallow Copy: `slice()` is used to create a shallow copy of the `posts` array. It's essential to create a copy before sorting to avoid mutating the original array. The `slice()` method without any arguments creates a copy of the entire array.

2. Sorting: The `sort` method is then applied to the copied array. The sorting function `(a, b) => b.date.localeCompare(a.date)` is used. This function compares the `date` properties of two posts (`a` and `b`). The `localeCompare` method is used for string comparison, and in this case, it's used for comparing the dates.

   - If `b.date` is lexicographically greater than `a.date`, it returns a positive number, indicating that `b` should come before `a` in the sorted array, resulting in a descending order.
     -If `b.date` is lexicographically less than `a.date`, it returns a negative number, indicating that `a` should come before `b` in the sorted array.
   - If the dates are equal, `localeCompare` returns 0, and the order remains unchanged.

3. Result: The sorted array is assigned to the variable `orderedPosts`. After this operation, `orderedPosts` contains a new array with the posts sorted in descending order based on their `date` property.

In summary, `orderedPosts` is a new array that represents a sorted version of the original `posts` array, with posts arranged in descending order based on their `date` property. Keep in mind that the original `posts` array remains unchanged due to the use of `slice()` to create a copy.

## **Code**

    const PostAuthor = ({ userId }) => {
        const users = useSelector(selectAllUsers);

        const author = users.find((user) => user.id === userId);

        return <span>by {author ? author.name : "Unknown author"}</span>;
    };

## **Explained**

1. Functional Component: `PostAuthor` is a functional component. In React, functional components are a way to define UI components using JavaScript functions.

2. Props: The component takes a prop named `userId`. This prop is used to identify the user for whom the author information is being displayed.

3. useSelector: `useSelector` is a hook provided by the React Redux library. It allows components to extract data from the Redux store. In this case, it's used to get the list of all users from the Redux store.

4. Finding the Author: The `find` method is used on the `users` array to find the user whose `id` matches the provided `userId`. If a matching user is found, the `author` variable will contain that user; otherwise, it will be `undefined`.

5. Rendering: The component renders a `<span>` element with the text "by {author's name}" if an author is found. If no author is found, it renders "Unknown author".

In summary, this component is designed to display the name of the author of a post, based on the provided `userId`. It relies on Redux for state management and assumes that there is a Redux slice with a selector named `selectAllUsers` that provides access to the list of all users in the application.

## **Code**

        import { parseISO, formatDistanceToNowStrict } from "date-fns";

        const TimeAgo = ({ timestamp }) => {
        let timeAgo = "";
        if (timestamp) {
            const date = parseISO(timestamp);
            const timePeriod = formatDistanceToNowStrict(date);
            timeAgo = `${timePeriod} ago`;
        }
        return (
            <span title={timestamp}>
            &nbsp; <i>{timeAgo}</i>
            </span>
        );
        };

        export default TimeAgo;

## **Explained**

This code defines a React functional component called `TimeAgo` that calculates and displays the time difference between a given timestamp and the current time. It utilizes the `date-fns` library, specifically the `parseISO` and `formatDistanceToNowStrict` functions.

1. Imports: The component imports two functions from the `date-fns` library: `parseISO` for parsing ISO-formatted date strings into JavaScript Date objects and `formatDistanceToNowStrict` for calculating the time difference between two dates.

2. Functional Component: `TimeAgo` is a functional component that takes a prop named `timestamp`. This prop is expected to be a string representing a timestamp in ISO format.

3. Parsing and Formatting Time: Inside the component, it checks if a `timestamp` is provided. If yes, it uses `parseISO` to convert the timestamp string into a JavaScript Date object. Then, it calculates the time difference between that date and the current time using `formatDistanceToNowStrict`.

4. Rendering: The component renders a `<span>` element. The `title` attribute of the span contains the original timestamp, which is useful for providing additional information when hovering over the displayed time. The calculated `timeAgo` string is displayed inside an `<i>` (italic) element.

5. Export: The component is exported as the default export of the module, making it available for use in other parts of the application.

In summary, this component is designed to display a human-readable time difference ("time ago") based on a given timestamp, and it uses the `date-fns` library for parsing and formatting dates.
