const { Pod, Container } = require('kubernetes-models/v1')
const k8s = require('@kubernetes/client-node')
const kc = new k8s.KubeConfig()
kc.loadFromDefault()

const k8sApi = kc.makeApiClient(k8s.CoreV1Api)

const pod = new Pod({
  metadata: {
    name: 'test-pod',
  },
  spec: {
    containers: [
      new Container({
        name: 'test-container',
        image: 'k8s.gcr.io/busybox',
        env: [{ name: 'ENV', value: 'production' }],
      }),
    ],
  },
})

k8sApi.createNamespacedPod('default', pod).then(() => console.log('success'))
