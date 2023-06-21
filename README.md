## **INSTALL**

`npm install chat-virtualized-list`

or

`yarn add chat-virtualized-list`


## **Using**

```
import { VirtualizedList } from 'chat-virtualized-list';

<VirtualizedList
    data={data}
    dataLength={data.length}
    height="100%"
    inverse={true}
    hasMorePrev={canUpdatePrev}
    prev={requestPrevChunk}
    hasMoreNext={canUpdateNext}
    next={requestNextChunk}
>
    {(message, index) => {
        <div>
            {message.text}
        </div>
    }
</VirtualizedList>
```


## **Properties**

| Prop        |                    type                     | Description                                                                                                        | Default value |
|-------------|:-------------------------------------------:|--------------------------------------------------------------------------------------------------------------------|--------------:|
| height      |                     CSS                     | CSS height                                                                                                         |      required |
| data        |                 Array\<T\>                  | data array for render messages                                                                                     |      required |
| dataLength  |                   number                    | number of items in the list                                                                                        |      required |
| children    | (item: T, index: number) => React.ReactNode | a function that returns a node for rendering an element                                                            |      required |
| className   |                   string                    | add any custom class you want                                                                                      |            "" |
| style       |                CSSProperties                | add any custom styles you want                                                                                     |            {} |
| hasMoreNext |            boolean or undefined             | tells the VirtualizedList component whether it can call the next function when it reaches the bottom of the scroll |     undefined |
|next|() => any| called when the bottom of the scroll is reached if hasMoreNext === true                                            |     undefined |
| hasMorePrev |            boolean or undefined             | tells the VirtualizedList component whether it can call the prev function when it reaches the top of the scroll    |     undefined |
|prev|() => any| called when the top of the scroll is reached if hasMorePrev === true                                               |     undefined |
|getKey|(item: T, index: number) => string| get react key for list item                                                                                        |     undefined |
|threshold|number|A threshold value that determines when infinite scrolling will trigger the next call|           0.8 |
|inverse|boolean|expand the scroll from the top|         false |
|idForScroll|string|scrolls to the specified id. the id must be specified in the dom element|     undefined |






