# Research, Document and Publish an article on running a K8s cluster on Pi devices.

__Research phase:__

- [x] Set up a proposed BOM.

- [x] Get it approved.

- [x] Acquire the materials as per BOM.

>>Please note that I ended up purchasing one 16GB MicroSD card and two 32GB MicroSD cards.
Because I want to make sure that the Master Node (MN1) can run on 16GB, I will use the 16GB card for MN1 and the two 32GB cards for he worker nodes (WN1 & WN2).

- [ ] Document initial technical strategy for installing and managing the K8s cluster.
  - [ ] 2 Pi devices as Nodes.
  - [ ] 1 Pi device as Master.

- [ ] Start development and refactor documentation as I go along.

- [ ] Refactor the actual deployment strategy and resources (such as config files)

- [ ] Finalise the research phase:
  - [ ] Code repos for configurations.
  - [ ] Documentation.

__Article Preparation:__

- [ ] Set up tasks as per writing checklist.

## Documentation

This section outlines all the technical steps I am taking to install K8s on the RPi devices so that I can refer to it when typing the article.

### Setting the Hardware

After unpacking the devices, I connected the fans and fitted the RPi devices into the cases. I connected the RPi devices to the power banks (due to power cuts). Once I've turned on each RPi device, I can confirm that the red LED light is working.

At this stage, the result is that I have 3 Raspberry Pi 3 model B devices capable of being powered on.

- [ ] Label the RPi devices
  - [ ] One device __MN1__ which stands for Master Node One.
  - [ ] One device __WN1__ which stands for Worker Node One.
  - [ ] One device __MN2__ which stands for Worker Node Two.

- [x] Cannot label the MicroSD cards as otherwise they won't fit in the reader slot. However:
  - [ ] MN1 will use a 16GB Samsung microSDHC Card.
  - [ ] WN1 will use a 32GB Samsung microSDHC Card.
  - [ ] WN2 will use a 32GB Samsung microSDHC Card.

- [ ] Label any cables and their power switches for ease of maintenance.


### Installing Software Dependencies

I decided to not install NOOBS on the SD cards so that I can install each dependency separately.

#### Installing an Operating System

I decided to first try using the Raspbian Lite (Stretch) a minimal image based on Debian Stretch.

- [x] Download the OS from the [official website](https://www.raspberrypi.org/downloads/raspbian/)

I decided to use [Etcher](https://etcher.io) to flash the SD cards because it is safer for everyone to use, avoiding flashing the wrong drive and minimising the list of commands to type.

- [x] Download and Install [Etcher](https://etcher.io)
> On MAC, you can simply run `brew cask install etcher`.

__ For each MicroSD Card:__

- [x] Open Etcher, select the Raspbian image, double check the correct drive and click Flash.
- [x] Once ready, enable `headless start` by placing a file named `ssh` without any extension into the boot partition of the SD card. Simply use a terminal, navigate to your drive such as `cd /f` and `touch ssh`.
> In Windows, I found that the best way to do this is to create a file named `ssh` anywhere on the PC and then copy and paste it from the GUI because of write access issues. You can probably also use `Command Prompt` as an Administrator.

- [x] With all the RPi devices powered OFF, insert the newly flashed SD cards.

While booting the RPi devices, you should start seeing a blinking green LED(s) notifying you that the device is reading from the SD card.


### Setting up a Network with Internet

In my setup, I am using my mobile network provider's data for an internet connection. Therefore, I have my Android phone connected tot he internet through Mobile Data and is used a Tethering Hotspot by my laptop. My laptop also has a Mobile Hotspot enabled and thus the RPi devices can connect to it through WiFi.

> I don't think this is possible on Mac systems. Mac users may need to use a WiFi USB Dongle if their WiFi Card does not allow simultaneous connections I.e. Internet traffic through connecting the Laptop to the Mobile Hotspot and LAN traffic through its own Hotspot.

I am also using a [DHCP Server software](http://www.dhcpserver.de/) so that I can reserve IP addresses for the RPi devices.

> This software is only available for Windows systems. I think that Mac systems include a built in DHCP server.

- [x] Configure a Mobile Hotspot on the host machine and assign it a static IP such as `192.169.0.10`
- [x] Mobile Hotspot should have an internet connection. In my case, I have internet through a Mobile Hotspot from my mobile phone.
- [x] Download, install and configure the [DHCP Server software](http://www.dhcpserver.de/) by following the online documentation.

- [ x For each RPi device, configure the WiFi settings in the `boot` partition so that Raspbian will automatically copy the settings to the OS on the next boot. The steps to follow are:

1) Insert the MicroSD card in your laptop.
2) Create a new file in the `boot` partition named `wpa_supplicant.conf` and enter the following contents:

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

You will need to change the `country code`, network `SSID` and `PSK` to match the settings of your WiFi connection.

3) Safely remove the MicroSD card from your laptop and with the RPi powered off, insert the card in the RPi device. Then power the RPi on.

>Since, I don't know the MAC addresses of each RPi, I had to power them on one by one so that I can see the MAC address when the DHCP server assigns an IP address.

- [x] Reserve an IP address for each device as follows:

1) Make sure the DHCP server software is running.
2) Power on one RPi device and wait for the DHCP server software to assign an IP to it. The software will show you the MAC address of the RPi device and the IP address it automatically assigned to it.
3) To confirm this, simply `ssh` into the RPi using the IP address assigned by the DHCP server software. In my case:

`ssh pi@192.168.137.48` Initial password is `raspberry`.
4) Open `dhcpsrv.ini` from within the DHCP Server Software directory and add this entry:

```
[B8-27-EB-C8-6A-2B]
IPADDR=192.168.137.39
```

The first line being the MSC address of the device and the second the desired IP address from the IP POOL.

5) Reboot your RPi:
```
ssh pi@192.168.137.48
sudo shutdown -h now
```

6) Power on the RPi and it should now have the reserved IP assigned to it. Check:

```
ssh pi@192.168.137.39
```

7) To check that the internet connection is available, simply ping a website:

`ping google.com`

Once all RPi devices have a reserved IP address, my final `dhcpsrv.ini` includes:

```
[SETTINGS]
IPPOOL_1=192.168.137.1-254
IPBIND_1=192.168.137.1
AssociateBindsToPools=1
Trace=1
DeleteOnRelease=0
ExpiredLeaseTimeout=3600

[GENERAL]
LEASETIME=86400
NODETYPE=8
SUBNETMASK=255.255.255.0
NEXTSERVER=192.168.137.1
ROUTER_0=0.0.0.0

[DNS-SETTINGS]
EnableDNS=0

[TFTP-SETTINGS]
EnableTFTP=0
ROOT=C:\Users\Keith\Code\uasabi\learnk8s\resources\rpi-research\dhcpsrv2.5.2\wwwroot
WritePermission=0

[HTTP-SETTINGS]
EnableHTTP=1
ROOT=C:\Users\Keith\Code\uasabi\learnk8s\resources\rpi-research\dhcpsrv2.5.2\wwwroot
[B8-27-EB-C8-6A-2B]
IPADDR=192.168.137.39

[B8-27-EB-E5-F2-FA]
IPADDR=192.168.137.129

[B8-27-EB-00-AB-34]
IPADDR=192.168.137.200
```

### Security & Access

The steps in this section are optional but highly recommended.

#### Change the default Password.

I recommend to change the default `SSH` password from `raspberry` to something more unique and secure. To do so, first ssh into the first RPi device using the default password

```
ssh pi@192.168.137.50
```

Then enter the `passwd` command, your current password and type in the new password. Type it again for confirmation.

Repeat the above for the other RPi devices.

#### Change the `hostname`

Furthermore, for a more organised workflow, I change the `hostname` of each device so that when I `ssh` into them, I can see which Node I'm working with. As detailed in the above sections, I have a key name for each RPi device and I ultimately want to have the following:

|Key|Role|Description|IP Address|Hostname|IP Address|
|:-:|:--:|:----------|:---------|:------:|---------:|
|MN1|Master|Kubernetes Master Node|192.168.137.50|learnk8s-mn1|192.168.137.39|
|WN1|Worker|Kubernetes Worker Node|192.168.137.51|learnk8s-wn1|192.168.137.129|
|WN2|Worker|Kubernetes Worker Node|192.168.137.52|learnk8s-wn2|192.168.137.200|

To change the `hostname`, for each RPi device, `ssh` into it, now using the new password.

```
ssh pi@192.168.137.50
```

Then edit the `hostname` using the preinstalled `nano` editor:

```
sudo nano /etc/hostname
```

Change `raspberrypi` to `learn8s-mn1`. Furthermore, we need to update the `hosts` file:

```
sudo nano /etc/hosts
```

Add change `raspberrypi` to `learn8s-mn1` at last line of the file. The last line should look like this:

```
127.0.1.1       learnk8s-mn1
```

Finally, `sudo reboot` the RPi device.

Repeat this foe the other RPi devices.

#### Passwordless SSH access

For more secure access to your RPi devices and also to avoid having to type in the `ssh` login password every time you want to `ssh` into a device, you can configure `ssh` to use your public `ssh key`. Assuming you have a public `ssh key` located in `~/.ssh` on your host machine, you can copy it into your RPi devices.

First access the first RPi using your password:

```
ssh pi@192.168.137.50
```
Then create a `.ssh` directory using the following command to ensure the permissions are correct:

```
cd ~
install -d -m 700 ~/.ssh
```

With the `.ssh` directory set up, go back to your host machine and enter the following command to copy the key into the first RPi:

```
cat ~/.ssh/id_rsa.pub | ssh pi@192.168.137.50 'cat >> .ssh/authorized_keys'
```

Enter your password and you're done. If you try to `ssh` into RPi one more time, you should be automatically authenticated.

Repeat the above for the other RPi devices.


### Installing Docker

### Installing Kubernetes

### Running Kubernetes

Master & Worker Nodes.

## Results

- [ ] I have Kubernetes installed and running on 3 RPi devices:
  - [ ] One Master Node (MN1)
  - [ ] Two Worker Nodes (WN1) & (WN2)

- [ ] I can run an application (POD) on WN1

- [ ] I can replicate the application (POD) on WN2

- [ ] I can see the two running Pods from MN1

- [ ] Check available memory?

- [ ] Check available storage space?