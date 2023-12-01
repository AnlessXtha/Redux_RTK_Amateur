# New Concepts

## createSelector (memoized selector)

## Normalization

- Recommended in docs
- No duplication of data
- Creates an ID lookup

## State Shape

    {
        posts:
        {
            ids:[1,2,3,...],
            entites: {
                '1': {
                    userId: 1,
                    id: 1,
                    title: ...etc
                }
            }
        }
    }

## createEntityAdapter API

- Abstracts more logic from components
- Built-in CRUD methods
- Automatic selector generation

  ### .getInitialState

  ### .upsertMany

  ### .addOne

  ### .upsertOne

  ### .removeOne

  ### .getSelectors

##
