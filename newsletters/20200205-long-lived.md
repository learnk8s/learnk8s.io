Hey,

Dan here!

In the past month, I was busy authoring a course for the Learnk8s Academy about Service meshes.

While working on the content, I stumbled on an exciting problem related to persistent connections in Kubernetes.

**Long story short, Kubernetes doesn't do any load balancing of long-lived connections.**

If you use any of these:

- gRPC
- Websockets and secured WebSockets
- HTTP/2
- gRPC
- RSockets
- AMQP
- Any database connection

You might experience some weird behaviour in your cluster:

- **Apps might be unresponsive** even if you scale your deployments.
- You might find out that **some of the Pods are overloaded while others are under-utilised.**

I thought you might be interested to know more, so I wrote a blog post about it.

You can read it here:

[Read how to load balance and scale long-lived connection in Kubernetes](https://learnk8s.io/kubernetes-long-lived-connections "Read how to load balance and scale long-lived connection in Kubernetes")

— Dan

_P.S.: **We started a Telegram group to discuss all things Kubernetes.** We are thrilled to have you, and you can [join using this link](https://t.me/learnk8s). Join and let me know what you think of the article!_