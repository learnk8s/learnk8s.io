## Can you have an API Gateway as an ingress?

> **TL;DR:** yes, you can. Have a look at the [Kong](https://konghq.com/blog/kong-kubernetes-ingress-controller/) and [Ambassador Ingress](https://www.getambassador.io/).

In Kubernetes, an Ingress is a component that routes the traffic from outside the cluster to your services and Pods inside the cluster.

In simple terms, **the Ingress works as a reverse proxy** or a load balancer: all external traffic is routed to the Ingress and then is routed to the other components.

While the most popular ingress is the [ingress-nginx project](https://github.com/kubernetes/ingress-nginx), there're several other options when it comes to selecting and using an Ingress.

You can choose from Ingresses that:

- handle HTTP traffic such as [Contour](https://github.com/heptio/contour) and [Treafik Ingress](https://docs.traefik.io/user-guide/kubernetes/)
- support UDP and TCP traffic such as [Citrix Ingress](https://github.com/citrix/citrix-k8s-ingress-controller)
- support Websockets such as [HAProxy Ingress](https://github.com/jcmoraisjr/haproxy-ingress)

There are also other hybrid ingresses can integrate with existing cloud providers such as [Zalando's Skipper Ingress](https://opensource.zalando.com/skipper/).

### Option #1 — The king of API Gateways: Kong

But if the product that you're building is primarily an API, you might be interested in what the [Kong Ingress](https://konghq.com/blog/kong-kubernetes-ingress-controller/) has to offer.

Kong is an API gateway built on top of Nginx.

It offers features such as authentication, rate limiting, retries, circuit breakers and more.

What's interesting about Kong is that comes packaged as a Kubernetes Ingress.

So you could use in your cluster as a gateway between your users and your backends.

You can expose your API to external traffic with the standard Ingress object:

```yaml|title=ingress.yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: my-ingress
spec:
  rules:
    - host: example.com
      http:
        paths:
          - path: /
            backend:
              serviceName: api-service
              servicePort: 80
```

But there's more.

As part of the installation process Kong's controller registers Custom Resource Definitions (CRDs). One of these custom extensions is related to Kong's plugins.

If you wish to limit the requests to your Ingress by IP address, you can create a definition for the limit with:

```yaml|title=limit-by-ip.yaml
apiVersion: configuration.konghq.com/v1
kind: KongPlugin
metadata:
  name: rl-by-ip
config:
  hour: 100
  limit_by: ip
  second: 10
plugin: rate-limiting
```

And you can reference the limit with an annotation in your ingress with:

```yaml|highlight=5-6|title=ingress.yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: my-ingress
  annotations:
    plugins.konghq.com: rl-by-ip
spec:
  rules:
    - host: example.com
      http:
        paths:
          - path: /
            backend:
              serviceName: api-service
              servicePort: 80
```

You can [explore the Custom Resource Definitions (CRDs) for Kong](https://github.com/Kong/kubernetes-ingress-controller/blob/master/docs/custom-resources.md) on the official documentation.

But Kong isn't the only option.

### Option #2 — Ambassador, the modern API gateway

[Ambassador is another Kubernetes Ingress](https://www.getambassador.io/) built on top of Envoy that offers a robust API Gateway.

The Ambassador Ingress is a modern take on Kubernetes Ingresses as demonstrated by its rapid development and the traction received by the community.

The main difference between Ambassador and Kong/Nginx is that Ambassador doesn't use the familiar Kubernetes Ingress.

Instead, services are exposed to the outside world using annotations within the Service:

```yaml|highlight=7-15|title=service.yaml
apiVersion: v1
kind: Service
metadata:
  labels:
    service: api-service
  name: api-service
  annotations:
    getambassador.io/config: |
      ---
      apiVersion: ambassador/v0
      kind: Mapping
      name: example_mapping
      prefix: /
      service: example.com:80
      host_rewrite: example.com
spec:
  type: LoadBalancer
  ports:
    - port: 80
      targetPort: 80
  selector:
    service: api-backend
```

The novel approach is interesting because in a single place you can define all the routing for your Deployments and Pods.

However, having YAML as free text within an annotation could lead to errors and confusion.

If you wish to apply rate limiting to your API, this is what it looks like in Ambassador:

```yaml|highlight=5-11|title=service.yaml
apiVersion: v1
kind: Service
metadata:
  name: api-service
  annotations:
    getambassador.io/config: |
      ---
      apiVersion: ambassador/v1
      kind: RateLimitService
      name: ratelimit
      service: "api-service:5000"
spec:
  type: ClusterIP
  selector:
    app: api-service
  ports:
    - port: 5000
      targetPort: http-api
```

Ambassador has an excellent tutorial about rate limiting, so if you are interested in using that features, you can head over to [Ambassador's official documentation](https://www.getambassador.io/user-guide/rate-limiting-tutorial/).

### More options

If neither Ambassador or Kong is suitable for what you do, you should check out the following alternatives:

- [Gloo](https://github.com/solo-io/gloo) is another Envoy-powered API gateway
- [Tyk](https://tyk.io/) is an open source API gateway that can be deployed as an Ingress.
- You could [build your API gateway Ingress using Ballerina](https://ballerina.io/learn/by-guide/api-gateway/) — a Cloud Native programming language

## That's all folks

Thanks for reading until the end!

If you know of a better way to connect multiple clusters together, please [get in touch and let us know](mailto:hello@learnk8s.io). We will add it to the links above.

A special thank you goes to [XXXX](xxx) and [XXX](xxx) that reviewed the content of this article.
