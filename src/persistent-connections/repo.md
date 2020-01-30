## Setting up the lab

You can continue reading along, but do you trust the findings?

You should set up a lab environment and see for yourself.

> If you prefer not to, feel free to [jump to the next section]().

To follow the scenarios in this article, you need to install and run minikube.

> You can consult [the official documentation on how to install minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/). If you're on Windows, it isn't as straightforward. But we wrote [a detailed guide on your options](/blog/installing-docker-and-kubernetes-on-windows).

You can start minikube with:

```terminal|command=1|title=bash
minikube start
```

You can deploy the front-end app with the following YAML definition:

```yaml

```

Save the file as `front-end.yaml` and submit the resource to the cluster with:

```terminal|command=1|title=bash
kubectl apply -f front-end.yaml
```

The following is the YAML definition for the backend:

```yaml

```

You can save the file as `backend.yaml` and submit the resource to the cluster with:

```terminal|command=1|title=bash
kubectl apply -f front-end.yaml
```

You can verify that the front-end and backend are connected and deployed successfully with:

```terminal|command=1|title=bash
minikube service front-end
```

You should see the app running in your browser.
