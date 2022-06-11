---
title: Kotlin Flows and channels
---

## Hot and cold streams
- Cold Publisher: For every subscriber, the items start from the beginning.
- Hot Publisher: Does not publish from the beginning. Instead, the values keep on going independently. Any subscriber joining will get the same value that all others do.
- Cold publisher emits data only when they're collected(consumed) and when you subscribe to them, you get all the values it ever produced.
- Hot producers have data even when there are no subscriber. When you subscribe to them, only value produced after you subscribed are emitted.

## Flow
- represent a stream of specific values which can be collected
- starts emitted when `collect` is called on it
- flow are cold: emits only when it is collected and emits all values it produced
- flow is like a pipe, whatever comes inside, goes outside; doesn't stay in the pipe
## Channels
- channel can receive and emit data, flow can only emit
- channel is like a queue, can contain a buffer.
- regular channel have one producer and one consumer at a time, BroadcastChannel can have multiple consumers at once
- these are low level primitives
## StateFlow and SharedFlow
- hot streams
- StateFlows have a default value through constructor and emits it immediately when someone starts collecting, while a SharedFlow takes no value and emits nothing by default.
- So for data representing state, user StateFlows and for events use shared flow.
## Channels vs SharedFlow
- channels don't support multiple subscribers but SharedFlow does
- SharedFlow will emmit even when there are no subscribers, so if the subscriber went offline for some time, the events will be lost;
- For example, if UI is listening for ViewModel events through shared flow and a configuration change(like screen rotation) happens which cancels the viewModelScope for some time, if SharedFlow emits event at that time, they'll be lost.
- But Channels which are buffered are like queues, If there are no subscribers, then configured number of items will be stored and emitted to the incoming subscriber.
- So for ViewModel -> UI events, use channels; SharedFlows will work just fine for UI -> ViewModel events(because viewModelScope will not be cancelled when UI is existing)

## Conversions
- Represents the given receive channel as a hot flow
```kotlin
channel.receiveAsFlow()
```
- flow to a sharedFlow
```kotlin
myNormalFlow
.shareIn(coroutineScope, SharingStarted.WhileSubscribed(), defaultValue)
```