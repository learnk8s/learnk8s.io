# Research, Document and Publish an article on running a K8s cluster on Pi devices.

My aim is to install and Kubernetes on three Raspberry Pi devices. One RPi device will serve as the Master Node and the other two will be the Worker Nodes.

This file outlines the set up requirements and the steps I've taken to complete this task. This document is also the foundation of a corresponding Blog Article.

It is important to note that some of the steps I've detailed here are only required due to my particular set up. The main variables are:

1) I'm only using WiFi connections. My Internet connection is sourced from my mobile phone's HotSpot and the LAN is managed through my Laptop's HotSpot.

2) My host machine's operating system is Windows 10. Other operating systems will probably require additional hardware for setting up a HotSpot.

3) I decided to install the Raspbian Stretch Lite operating system on my RPi devices and thus, I needed to customise the standard setup and versions.

## Hardware Requirements

My set up includes:

3 x  Raspberry Pi 3 Model B.
3 x 32GB MicroSD cards.
1 x MicroSD to SD adaptor.
2 x RPi Acrylic Cases with Fan.
1 x RPi Plastic Case.
2 x Power Banks, 20000mAh, 5V and 1 & 2.1 Amps Output. Each have two outputs.
3 x USB to MicroUSB Power Cables with switch.
1 x Laptop running Windows 10 with HotSpot. Must allow incoming and outgoing WiFi connections simultaneously.
1 x Mobile Phone with a Data Connection and HotSpot tethering.


## Installing and Configuring the Operating System on the RPi devices

With the hardware (RPi cases and cabling) ready, I flashed each device with the [Raspbian Stretch Lite](https://www.raspberrypi.org/downloads/raspbian/) operating system using [Etcher](https://etcher.io/).

Once the operating system is installed on the MicroSD Cards, I prepared them for SSH access. This is simple, just create a file named `ssh`, without any extension in the boot partition using the host machine.

```
cd /f # or whatever the boot partition is named
touch ssh
```

Then I preconfigured the WiFi so that each device connects to the Laptop's HotSpot once they've booted. This is straight forward, simply create a new file named `wpa_supplicant.conf` in the same boot partition and add the connection details. My details are:

```
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
country=GB

network={
    ssid="Kubernetes"
    psk="learnk8s"
    key_mgmt=WPA-PSK
}
```

> I also had to make some changes in my LAN's adapter properties so that the Laptop's HotSpot always uses a fixed IP address. Mine is set as `192.168.137.1` and remains static even if the HotSpot is restarted.

## Initial device configuration

Initially, when I power on the RPi devices, they get assigned an IP address by the Laptop's HotSpot. I tried various ways to be able to set static IP addresses for the devices. Using a [DHCP Server Software](http://www.dhcpserver.de/) did not work because once the HotSpot is restarted, the DHCP software fails to assign the set IP, probably due to conflicts. Most of the times the DHCP attempts to assign the IP set in its configuration but the HotSpot refuses it. Other times, the static IP gets assigned but the device only has a LAN connection without access to the internet. Eventually I've learned that simply setting a static IP address in the RPi DHCP configuration works.

You can see the devices' initial IP addresses from the Laptop's HotSpot connection details. You will need to check them so that you can SSH into each device and follow along the following changes. For this example, my first device was assigned `192.168.137.28` IP address. The other two devices also had random IPs which I used to SSH into.

Do this for each device:

```
ssh pi@192.168.137.28
```

Initial password is `raspberry` and we need to change it so it is not the default. To change the password, simply type `passwd`, enter the current default password and then type the new one and type the new one once again for confirmation.

I then add a `.ssh` directory so that I can access the device with my `ssh` key instead of the password:

```
install -d -m 700 ~/.ssh
```

At this stage I also want to assign a static IP address to the device for use with the `wlan0` connection.

```
sudo nano /etc/dhcpcd.conf
```

Add the following but change the static IP address accordingly:

```
interface wlan0
static ip_address=192.168.137.100/24
static routers=192.168.137.1
static domain_name_servers=8.8.8.8
```

As a final setting before I reboot the device, I change the `hostname` so that I can easily manage all the devices.

```
sudo raspi-config
```

Navigate to `Network Options` and the `Hostname`.

```
sudo reboot
```

Once rebooted, I can access SSH into the device using the assigned static IP, which in this example is `192.168.137.100`.

However, before I do so, I want to copy my public `ssh` key into the device so that I can access it without password. From the host machine:

```
cat ~/.ssh/id_rsa.pub | ssh pi@192.168.137.100 'cat >> .ssh/authorized_keys'
```

I enter the newly set password and now I can `ssh` into the device by simply typing:

```
ssh pi@192.168.137.100
```

I do this for all the devices to achieve the following setup:


|Key|Role|Description|IP Address|Hostname|
|:-:|:--:|:----------|:---------|:------:|
|MN1|Master|Kubernetes Master Node|192.168.137.100|learnk8s-mn1|
|WN1|Worker|Kubernetes Worker Node|192.168.137.101|learnk8s-wn1|
|WN2|Worker|Kubernetes Worker Node|192.168.137.102|learnk8s-wn2|

## Installing and Configuring Docker

Docker needs to be installed in each RPi device.

First, I disable `swap`

```
sudo dphys-swapfile swapoff && \
sudo dphys-swapfile uninstall && \
sudo update-rc.d dphys-swapfile remove
```

And confirm it is disabled by running:

```
sudo swapon --summary
```

Confirm that no output is returned and proceed to:

```
curl -sSL get.docker.com | sh && \
sudo usermod pi -aG docker
```

Note that until you exit `ssh`, the user permissions won't yet be refreshed so running:

```
docker ps
```

will print out a permission issue. With Docker installed, I set some `cgroups` configuration by editing the following:

```
sudo nano /boot/cmdline.txt
```

Add the following to the end of the line:

```
cgroup_enable=cpuset cgroup_enable=memory
```

__Make sure that there's no carriage return at the end of the line, save and:

```
sudo reboot
```

## Installing and Configuring Kubernetes

I need to install Kubernetes on all RPi devices. I have tried several versions of Docker and Kubernetes, even different versions of Raspbian, the following works for Raspbian Stretch and Raspbian Stretch Lite.

Run this command to allow installation over https:

```
sudo apt update && sudo apt install -y apt-transport-https curl
```

The following adds the GPG key for the repository:

```
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
```

Update the sources:

```
sudo nano /etc/apt/sources.list.d/kubernetes.list
```

Add this line:

```
deb http://apt.kubernetes.io/ kubernetes-xenial main
```

Install Kubernetes, Please note that I am using version ~1.9.
```
sudo apt update
sudo apt install kubelet=1.9.6-00 kubeadm=1.9.6-00 kubectl=1.9.6-00
```

Once Kubernetes is installed, I added a parameter to the `ExecStart` command. First I check the `cgroup name` used by Docker:

```
docker info | grep -i cgroup
```

Output says it uses `cgroupfs` so I edit the following:

```
sudo nano /etc/systemd/system/kubelet.service.d/10-kubeadm.conf
```

And add `--cgroup-driver=cgroupfs` to the `ExecStart`. Then, I reload the `daemon` and restart `kubelet`:

```
sudo systemctl daemon-reload
sudo systemctl restart kubelet
```

## Initialise `Kubeadm` on the Master Node

The following only applies to the Master Node (learnk8s-mn1).

Start `kubeadm`:

```
sudo kubeadm init
```

Once started, the output will tell you to run a few commands:

```
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

The output also includes a `join` command. Copy the command and save it somewhere as you'll need this to connect the Worker Nodes to this cluster.

```
kubeadm join --token 4fcec8.5b07254afe870cf9 192.168.137.100:6443 --discovery-token-ca-cert-hash sha256:62856061f60cbeb2575b36aa3bddd6a4e7ae223e44f7436afe92f13b47ec90c6
```

The above steps result in having Kubernetes running on the Master Node, however, as this point I don't have Pod to Pod networking running and thus the other Nodes cannot connect to the Cluster. There are several networking systems available. I decided to use `Weave Net` but `Flannel` is also a good candidate.

Install `Weave Net` Pod to Pod networking:

```
kubectl apply -f "https://cloud.weave.works/k8s/net?k8s-version=$(kubectl version | base64 | tr -d '\n')&env.WEAVE_NO_FASTDP=1"
```

Wait for containers to start and check them here:

```
kubectl get pods --all-namespaces
```

You should see something like this:

```
pi@learnk8s-mn1:~ $ kubectl get pods --all-namespaces
NAMESPACE     NAME                                   READY     STATUS    RESTARTS   AGE
kube-system   etcd-learnk8s-mn1                      1/1       Running   0          18m
kube-system   kube-apiserver-learnk8s-mn1            1/1       Running   5          20m
kube-system   kube-controller-manager-learnk8s-mn1   1/1       Running   0          19m
kube-system   kube-dns-7b6ff86f69-2qs9x              3/3       Running   0          19m
kube-system   kube-proxy-7k5bp                       1/1       Running   0          19m
kube-system   kube-scheduler-learnk8s-mn1            1/1       Running   0          19m
kube-system   weave-net-lh2m5                        2/2       Running   0          17m
```

The Master Node is now ready to accept connection from the Worker Nodes.

## Setting Up the Worker Nodes

Connecting the Worker Nodes to the cluster is very easy.

Run the following on each Worker Node:


```
sudo kubeadm join --token 4fcec8.5b07254afe870cf9 192.168.137.100:6443 --discovery-token-ca-cert-hash sha256:62856061f60cbeb2575b36aa3bddd6a4e7ae223e44f7436afe92f13b47ec90c6
```

After a few minutes, you can check that the nodes are running and connected to cluster. From the Master Node:

```
watch kubectl get nodes
```

```
Every 2.0s: kubectl get nodes                                                                   learnk8s-mn1: Wed Aug 29 10:10:02 2018

NAME           STATUS    ROLES     AGE       VERSION
learnk8s-mn1   Ready     master    42m       v1.9.6
learnk8s-wn1   Ready     <none>    8m        v1.9.6
learnk8s-wn2   Ready     <none>    8m        v1.9.6
```

## Next Steps

- [ ] Attempt to run Kubernetes version 1.11
- [ ] Plan a small IoT application to include a Hardware and Software Setup
- [ ] Develop the planned application, including setting up the Hardware and Writing the Software
- [ ] Run the application of separate Nodes and detail the steps I followed.
- [ ] Write an article explaining how I run xxx application on a Raspberry Pi Kubernetes cluster.