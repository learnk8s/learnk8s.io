# A single large Kubernetes cluster with multiple namespaces or a cluster per app?
# How many environments?


Large cluster:

- easier to provision
- ingress once
- authentication once

Smaller clusters

- overhead multiple clusters
- proliferation of setups
- authentication
- multi tenancy and blast radius
- upgrades (immutability but also upgrading versions if you have 100 clusters)
- CI/CD
- org, team, functions?
- org size
- kubeconfig
- costs (more control planes)
- self serve
- regulated environment
- federation
- monitoring, logging, etc.

## Resources:

- https://content.pivotal.io/blog/kubernetes-one-cluster-or-many
- https://stackoverflow.com/questions/54736502/kubernetes-single-cluster-or-multiple-clusters
- https://thenewstack.io/the-optimal-kubernetes-cluster-size-lets-look-at-the-data/
- https://www.reddit.com/r/kubernetes/comments/a5ua20/how_do_you_separate_your_environments/
- https://www.reddit.com/r/kubernetes/comments/96tmzr/1_or_many_clusters/
- https://www.reddit.com/r/kubernetes/comments/dnt8w0/managing_rbac_users_dev_environments_in_the_cloud/
- https://www.reddit.com/r/kubernetes/comments/d90x24/managing_multiple_production_environments_how_you/
- https://twitter.com/karlkfi/status/1080250279856005122?s=21
