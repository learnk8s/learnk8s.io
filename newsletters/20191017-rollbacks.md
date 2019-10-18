Hey there!

**You should have a plan to roll back releases that aren't fit for production.**

In Kubernetes, rolling updates are the default strategy to release software.

In a nutshell, you deploy a newer version of your app and Kubernetes makes sure that the rollout happens without disrupting the live traffic.

**However, even if you use techniques such as Rolling updates, there's still risk that your application doesn't work the way you expect it at the end of the deployment.**

Perhaps it has a bug, or it wasn't configured correctly, and it keeps crashing.

_When you introduce a change that breaks production, you should have a plan to roll back that change._

**Kubernetes has a built-in mechanism for rollbacks.**

[Learn how to trigger a rollback in Kubernetes](https://learnk8s.io/kubernetes-rollbacks/ 'Learn how to trigger a rollback in Kubernetes')

— Dan
