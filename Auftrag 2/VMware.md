---
layout: docs
page_title: VMware Provider
description: |-
  HashiCorp develops an official VMware Fusion and VMware Workstation provider
  for Vagrant. This provider allows Vagrant to power VMware based machines and
  take advantage of the improved stability and performance that VMware software
  offers.
---

# VMware

[HashiCorp](https://www.hashicorp.com) develops an official
[VMware Fusion](https://www.vmware.com/products/fusion/overview.html)
and [VMware Workstation](https://www.vmware.com/products/workstation/)&nbsp;
[provider](/vagrant/docs/providers/) for Vagrant. This provider allows
Vagrant to power VMware based machines and take advantage of the
improved stability and performance that VMware software offers.

The Vagrant VMware plugin is now open sourced under the MPL. The code
repository for the Vagrant VMware plugin is available on [GitHub](https://github.com/hashicorp/vagrant-vmware-desktop).

This provider is a drop-in replacement for VirtualBox. However, there are some
VMware-specific things such as box formats, configurations, etc. that are
documented here.

Please note that VMware Fusion and VMware Workstation are third-party products
that must be purchased and installed separately prior to using the provider.

Use the navigation to the left to find a specific VMware topic to read
more about.

---

layout: docs
page_title: Installation - VMware Provider
description: |-
The Vagrant VMware provider requires a two step installation
process which includes a system package and a Vagrant plugin

---

# Installation

If you are upgrading from the Vagrant VMware Workstation or Vagrant
VMware Fusion plugins, please halt or destroy all VMware VMs currently
being managed by Vagrant. Then continue with the instructions below.

Installation of the Vagrant VMware provider requires two steps. First the
Vagrant VMware Utility must be installed. This can be done by downloading
and installing the correct system package from the [Vagrant VMware Utility
downloads page](/vagrant/downloads/vmware).

Next, install the Vagrant VMware provider plugin using the standard plugin
installation procedure:

```shell-session
vagrant plugin install vagrant-vmware-desktop
```

For more information on plugin installation, please see the
[Vagrant plugin usage documentation](/vagrant/docs/plugins/usage).

## Upgrading to v1.x

It is **extremely important** that the VMware plugin is upgraded to 1.0.0 or
above. This release resolved critical security vulnerabilities. To learn more,
please [read our release announcement](https://www.hashicorp.com/blog/introducing-the-vagrant-vmware-desktop-plugin).

After upgrading, please verify that the following paths are empty. The upgrade
process should remove these for you, but for security reasons it is important
to double check. If you're a new user or installing the VMware provider on a
new machine, you may skip this step. If you're a Windows user, you may skip this
step as well.

The path `~/.vagrant.d/gems/*/vagrant-vmware-{fusion,workstation}`
should no longer exist. The gem `vagrant-vmware-desktop` may exist since this
is the name of the new plugin. If the old directories exist, remove them. An
example for a Unix-like shell is shown below:

```shell-session
# Check if they exist and verify that they're the correct paths as shown below.
$ ls ~/.vagrant.d/gems/*/vagrant-vmware-{fusion,workstation}
...

# Remove them
$ rm -rf ~/.vagrant.d/gems/*/vagrant-vmware-{fusion,workstation}
```

## Updating the Vagrant VMware Desktop plugin

The Vagrant VMware Desktop plugin can be updated directly from Vagrant. Run the
following command to update Vagrant to the latest version of the Vagrant VMware
Desktop plugin:

```shell-session
vagrant plugin update vagrant-vmware-desktop
```

---

layout: docs
page_title: Installation - VMware Provider
description: |-
The Vagrant VMware Utility works with the Vagrant VMware Provider to
interact with the system VMware installation

---

# Vagrant VMware Utility Installation

## System Packages

The Vagrant VMware Utility is provided as a system package. To install the
utility, download and install the correct system package from the downloads
page.

<Button title={`Download ${VMWARE_UTILITY_VERSION}`} url="/vmware/downloads" />

## Manual Installation

If there is no officially supported system package of the utility available,
it may be possible to manually install utility. This applies to Linux platforms
only. First, download the latest zip package from the releases page.

Next create a directory for the executable and unpack the executable as
root.

```shell-session
sudo mkdir -p /opt/vagrant-vmware-desktop/bin
sudo unzip -d /opt/vagrant-vmware-desktop/bin vagrant-vmware-utility_1.0.0_linux_amd64.zip
```

After the executable has been installed, the utility setup tasks must be run. First,
generate the required certificates:

```shell-session
sudo /opt/vagrant-vmware-desktop/bin/vagrant-vmware-utility certificate generate
```

The path provided from this command can be used to set the [`utility_certificate_path`](/vagrant/docs/providers/vmware/configuration#utility_certificate_path) in the Vagrantfile
configuration if installing to a non-standard path.

Finally, install the service. This will also enable the service.

```shell-session
sudo /opt/vagrant-vmware-desktop/bin/vagrant-vmware-utility service install
```

# Usage

The Vagrant VMware Utility provides the Vagrant VMware provider plugin access
to various VMware functionalities. The Vagrant VMware Utility is required by
the Vagrant VMware Desktop provider plugin.

## Vagrant VMware Utility Access

The Vagrant VMware Utility provides support for all users on the system using
the Vagrant VMware Desktop plugin. If access restrictions to the Utility need
to be applied to users on the system, this can be accomplished by restricting
user access to the certificates used for connecting to the service.

On Windows platforms these certificates can be found at:

```text
C:\ProgramData\HashiCorp\vagrant-vmware-desktop\certificates
```

On POSIX-style platforms these certificates can be found at:

```text
/opt/vagrant-vmware-desktop/certificates
```

## Vagrant VMware Utility Service

The Vagrant VMware Utility consists of a small service which runs on the
host platform. When the utility installer package is installed, the service
is configured to automatically start. If the plugin reports errors communicating
with the service, it may have stopped for some reason. The most common cause of
the service not being in a running state is the VMware application not being
installed. The service can be started again by using the proper command below:

### Windows

On Windows platforms a service is created called `vagrant-vmware-utility`. The
service can be manually started using the services GUI (`services.msc`) or by
running the following command from a `cmd.exe` in administrator mode:

```shell-session
net.exe start vagrant-vmware-utility
```

### macOS

```shell-session
sudo launchctl load -w /Library/LaunchDaemons/com.vagrant.vagrant-vmware-utility.plist
```

### Linux systemd

```shell-session
sudo systemctl start vagrant-vmware-utility
```

### Linux SysVinit

```shell-session
sudo /etc/init.d/vagrant-vmware-utility start
```

### Linux runit

```shell-session
sudo sv start vagrant-vmware-utility
```

## Utility Service Configuration

When installing the Vagrant VMware utility service, a configuration file is generated
that is used when the process is started. On Windows, this can be found at:

```text
C:\ProgramData\HashiCorp\vagrant-vmware-desktop\config\service.hcl
```

On POSIX-style systems, it can be found at:

```text
/opt/vagrant-vmware-desktop/config/service.hcl
```

The configuration file uses the [HCL](https://github.com/hashicorp/hcl) configuration
language. It supports a subset of the options provided by the CLI. An example configuration
file looks like:

```hcl
core {
  level = "info"
}

api {
  port = 9922
  driver = "advanced"
  license_override = "standard"
}
```

### Core options

- `level` (string) - Output level of the logger
- `log_file` (string) - Store logs to file at given path
- `log_append` (bool) - Append log output to existing file

### API options

- `port` (int) - Port to bind the API (changes require changes to [Vagrant configuration](/vagrant/docs/providers/vmware/configuration#utility_port))
- `driver` (string) - Internal driver to use (utility will auto-detect correct driver)
- `license_override` (string) - Override the detected VMware license (standard or professional)

#### Restarting the service

After updating the the configuration file, the service must be restarted. The method
for restarting the service will depend on your host platform.

For Windows:

On Windows platforms a service is created called `vagrant-vmware-utility`. The
service can be manually stopped and started using the services GUI (`services.msc`) or by
running the following command from a `cmd.exe` in administrator mode:

```shell-session
net.exe stop vagrant-vmware-utility
net.exe start vagrant-vmware-utility
```

For macOS:

```shell-session
sudo launchctl unload -w /Library/LaunchDaemons/com.vagrant.vagrant-vmware-utility.plist
sudo launchctl load -w /Library/LaunchDaemons/com.vagrant.vagrant-vmware-utility.plist
```

For Linux systemd:

```shell-session
sudo systemctl restart vagrant-vmware-utility
```

For Linux SysVinit:

```shell-session
sudo /etc/init.d/vagrant-vmware-utility restart
```

For Linux runit:

```shell-session
sudo sv restart vagrant-vmware-utility
```

### macOS service configuration

The Vagrant VMware utility service configuration on macOS is slightly different
than other platforms. If the `port` option is updated in the configuration file,
it will not be applied after restarting the service. This is due to the port
being defined directly within the service file so it properly matches the service
socket information. To update the port on macOS, it is easier to uninstall the
service and then install it again:

```shell-session
/opt/vagrant-vmware-desktop/bin/vagrant-vmware-utility service uninstall
/opt/vagrant-vmware-desktop/bin/vagrant-vmware-utility service install -port=9999
```

---

layout: docs
page_title: Usage - VMware Provider
description: |-
The Vagrant VMware providers are used just like any other provider. Please
read the general basic usage page for providers

---

# Usage

The Vagrant VMware provider is used just like any other provider. Please
read the general [basic usage](/vagrant/docs/providers/basic_usage) page for
providers.

The value to use for the `--provider` flag is `vmware_desktop`. For compatibility
with older versions of the plugin, `vmware_fusion` can be used for VMware
Fusion, and `vmware_workstation` for VMware Workstation.

The Vagrant VMware provider does not support parallel execution at this time.
Specifying the `--parallel` option will have no effect.

To get started, create a new `Vagrantfile` that points to a VMware box:

```ruby
# vagrant init hashicorp/bionic64
Vagrant.configure("2") do |config|
  config.vm.box = "hashicorp/bionic64"
end
```

Then run:

```shell-session
vagrant up --provider vmware_desktop
```

This will download and bring up a new VMware Fusion/Workstation virtual machine
in Vagrant.

---

layout: docs
page_title: Box Format - VMware Provider
description: |-
As with every Vagrant provider, the Vagrant VMware providers have a custom box
format

---

# Boxes

As with [every Vagrant provider](/vagrant/docs/providers/basic_usage), the
Vagrant VMware providers have a custom box format.

This page documents the format so that you can create your own base boxes.
Note that currently you must make these base boxes by hand. A future release
of Vagrant will provide additional mechanisms for automatically creating such
images.

-> **Note:** This is a reasonably advanced topic that
a beginning user of Vagrant does not need to understand. If you are
just getting started with Vagrant, skip this and use an available
box. If you are an experienced user of Vagrant and want to create
your own custom boxes, this is for you.

Prior to reading this page, please understand the
[basics of the box file format](/vagrant/docs/boxes/format).

## Contents

A VMware base box is a compressed archive of the necessary contents
of a VMware "vmwarevm" file. Here is an example of what is contained
in such a box:

```shell-session
$ tree
.
|-- disk-s001.vmdk
|-- disk-s002.vmdk
|-- ...
|-- disk.vmdk
|-- metadata.json
|-- bionic64.nvram
|-- bionic64.vmsd
|-- bionic64.vmx
|-- bionic64.vmxf

0 directories, 17 files
```

The files that are strictly required for a VMware machine to function are:
nvram, vmsd, vmx, vmxf, and vmdk files.

There is also the "metadata.json" file used by Vagrant itself. This file
contains nothing but the defaults which are documented on the
[box format](/vagrant/docs/boxes/format) page.

When bringing up a VMware backed machine, Vagrant copies all of the contents
in the box into a privately managed "vmwarevm" folder, and uses the first
"vmx" file found to control the machine.

-> **Vagrant 1.8 and higher support linked clones**. Prior versions
of Vagrant do not support linked clones. For more information on
linked clones, please see the documentation.

## VMX Allowlisting

Settings in the VMX file control the behavior of the VMware virtual machine
when it is booted. In the past Vagrant has removed the configured network
device when creating a new instance and inserted a new configuration. With
the introduction of ["predictable network interface names"][iface-names] this
approach can cause unexpected behaviors or errors with VMware Vagrant boxes.
While some boxes that use the predictable network interface names are configured
to handle the VMX modifications Vagrant makes, it is better if Vagrant does
not make the modification at all.

Vagrant will now warn if a allowlisted setting is detected within a Vagrant
box VMX file. If it is detected, a warning will be shown alerting the user
and providing a configuration snippet. The configuration snippet can be
used in the Vagrantfile if Vagrant fails to start the virtual machine.

### Making compatible boxes

These are the VMX settings the allowlisting applies to:

- `ethernet*.pcislotnumber`

If the newly created box does not depend on Vagrant's existing behavior of
modifying this setting, it can disable Vagrant from applying the modification
by adding a Vagrantfile to the box with the following content:

```ruby
Vagrant.configure("2") do |config|
  config.vm.provider "vmware_desktop" do |vmware|
    vmware.allowlist_verified = true
  end
end
```

This will prevent Vagrant from displaying a warning to the user as well as
disable the VMX settings modifications.

## Installed Software

Base boxes for VMware should have the following software installed, as
a bare minimum:

- SSH server with key-based authentication setup. If you want the box to
  work with default Vagrant settings, the SSH user must be set to accept
  the [insecure keypair](https://github.com/hashicorp/vagrant/blob/main/keys/vagrant.pub)
  that ships with Vagrant.

- [VMware Tools](https://kb.vmware.com/kb/340) so that things such as shared
  folders can function. There are many other benefits to installing the tools,
  such as improved networking performance.

## Optimizing Box Size

Prior to packaging up a box, you should shrink the hard drives as much as
possible. This can be done with `vmware-vdiskmanager` which is usually
found in `/Applications/VMware Fusion.app/Contents/Library` for VMware Fusion. You first
want to defragment then shrink the drive. Usage shown below:

```shell-session
$ vmware-vdiskmanager -d /path/to/main.vmdk
...
$ vmware-vdiskmanager -k /path/to/main.vmdk
...
```

## Packaging

Remove any extraneous files from the "vmwarevm" folder
and package it. Be sure to compress the tar with gzip (done below in a
single command) since VMware hard disks are not compressed by default.

```shell-session
cd /path/to/my/vm.vmwarevm
tar cvzf custom.box ./*
```

[iface-names]: https://www.freedesktop.org/wiki/Software/systemd/PredictableNetworkInterfaceNames/

---

layout: docs
page_title: Configuration - VMware Provider
description: |-
While Vagrant VMware providers are a drop-in replacement for VirtualBox, there
are some additional features that are exposed that allow you to more finely
configure VMware-specific aspects of your machines

---

# Configuration

While Vagrant VMware Desktop provider is a drop-in replacement for VirtualBox, there
are some additional features that are exposed that allow you to more finely
configure VMware-specific aspects of your machines.

Configuration settings for the provider are set in the Vagrantfile:

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "my-box"
  config.vm.provider "vmware_desktop" do |v|
    v.gui = true
  end
end
```

## Provider settings

- `allowlist_verified` (bool, symbol) - Flag that VMware box has been properly configured
  for allow list VMX settings. `true` if verified, `false` if unverified, `:disable_warning`
  to silence allowlist warnings.
- `base_address` (string) - Address to be reserved from the DHCP server. This option
  requires the `base_mac` option to be set as well.
- `base_mac` (string) - Custom MAC address to be used for the default NAT interface device
- `clone_directory` (string) - Path for storing VMware clones. This value can
  also be set using the `VAGRANT_VMWARE_CLONE_DIRECTORY` environment variable.
  This defaults to `./.vagrant`
- `enable_vmrun_ip_lookup` (bool) - Use vmrun to discover guest IP address.
  This defaults to `true`
- `functional_hgfs` (bool) - HGFS is functional within the guest.
  This defaults to detected capability of the guest
- `gui` (bool) - Launch guest with a GUI.
  This defaults to `false`
- `linked_clone` (bool) - Use linked clones instead of full copy clones.
  This defaults to `true` if linked clones are functional based on VMware installation.
- `nat_device` (string) - The host vmnet device to use for the default NAT interface. By
  default this will be automatically detected with a fallback to `vmnet8`.
- `port_forward_network_pause` - Number of seconds to pause after applying port forwarding
  configuration. This allows guest time to acquire DHCP address if previous address is
  dropped when VMware network services are restarted.
  This defaults to `0`
- `ssh_info_public` (bool) - Use the public IP address for SSH connections to guest.
  This defaults to `false`
- `unmount_default_hgfs` (bool) - Unmount the default HGFS mount point within the guest.
  This defaults to `false`
- `utility_port` (integer) - Listen port of the Vagrant VMware Utility service.
  This defaults to `9922`
- `utility_certificate_path` (string) - Path to the Vagrant VMware Utility service
  certificates directory.
  The default value is dependent on the host
- `verify_vmnet` (bool) - Verify vmnet devices health before usage.
  This defaults to `true`
- `vmx` (hash) - VMX key/value pairs to set or unset. If the value is `nil`, the key will
  be deleted.

### VM Clone Directory

By default, the VMware provider will clone the VMware VM in the box
to the ".vagrant" folder relative to the folder where the Vagrantfile is.
Usually, this is fine. For some people, for example those who use a
differential backup software such as Time Machine, this is very annoying
because you cannot regularly ignore giant virtual machines as part of backups.

The directory where the provider clones the virtual machine can be
customized by setting the `VAGRANT_VMWARE_CLONE_DIRECTORY` environmental
variable. This does not need to be unique per project. Each project will
get a different sub-directory within this folder. Therefore, it is safe to
set this systemwide.

### Linked Clones

By default new machines are created using a linked clone to the base
box. This reduces the time and required disk space incurred by directly
importing the base box.

Linked clones are based on a master VM, which is generated by importing the
base box only once the first time it is required. For the linked clones only
differencing disk images are created where the parent disk image belongs to
the master VM. To disable linked clones:

```ruby
config.vm.provider "vmware_desktop" do |v|
  v.linked_clone = false
end
```

### VMX Customization

If you want to add or remove specific keys from the VMX file, you can do
that:

```ruby
config.vm.provider "vmware_desktop" do |v|
  v.vmx["custom-key"]  = "value"
  v.vmx["another-key"] = nil
end
```

In the example above, the "custom-key" key will be set to "value" and the
"another-key" key will be removed from the VMX file.

VMX customization is done as the final step before the VMware machine is
booted, so you have the ability to possibly undo or misconfigure things
that Vagrant has set up itself.

VMX is an undocumented format and there is no official reference for
the available keys and values. This customization option is exposed for
people who have knowledge of exactly what they want.

The most common keys people look for are setting memory and CPUs.
The example below sets both:

```ruby
config.vm.provider "vmware_desktop" do |v|
  v.vmx["memsize"] = "1024"
  v.vmx["numvcpus"] = "2"
end
```

---

layout: docs
page_title: Known Issues - VMware Provider
description: |-
This page tracks some known issues or limitations of the VMware provider.
Note that none of these are generally blockers to using the provider, but
are good to know

---

# Known Issues

This page tracks some known issues or limitations of the VMware provider.
Note that none of these are generally blockers to using the provider, but
are good to know.

## Network disconnect

When Vagrant applies port forwarding rules while bring up a guest instance,
other running VMware VMs may experience a loss of network connectivity. The
cause of this connectivity issue is the restarting of the VMware NAT service
to apply new port forwarding rules. Since new rules cannot be applied to the
NAT service while it is running, it is required to restart the service, which
results in the loss of connectivity.

## Forwarded Ports Failing in Workstation on Windows

VMware Workstation has a bug on Windows where forwarded ports do not work
properly. Vagrant actually works around this bug and makes them work. However,
if you run the virtual network editor on Windows, the forwarded ports will
suddenly stop working.

In this case, run `vagrant reload` and things will begin working again.

This issue has been reported to VMware, but a fix has not been released yet.

## Big Sur Related Issues

### Creating Network Devices

Starting with the Big Sur release VMware Fusion is no longer able to create
network devices with custom subnet and mask settings to attach to guests. This
means custom IP addresses are not valid when creating a private network. When
creating a private network device to attach to a guest, simply define it with
no options:

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "hashicorp/bionic64"
  config.vm.network :private_network
end
```

### Port Forwarding

VMware Fusion currently does not support port forwarding to the localhost. To
work around this issue, the vagrant-vmware-utility provides functionality to
simulate port forwarding behavior available within VMware Fusion prior to
Big Sur. The port forward management is contained to the vagrant-vmware-utility
and is not accessible via the VMware Fusion networking UI.

### DHCP Reservations

Due VMware Fusion no longer utilizing its own service for DHCP, defining DHCP
reservations is currently not working with VMware Fusion on Big Sur.

---

layout: docs
page_title: Frequently Asked Questions - VMware Provider
description: |-
Frequently asked questions related to using Vagrant with VMware
Workstation and VMware Fusion

---

# Frequently Asked Questions

## Q: How do I use the VMware Fusion Tech Preview?

The Vagrant VMware utility expects VMware Fusion to be installed in a specific
path on macOS. Since the VMware Fusion Tech Preview installs into a different
path, the Vagrant VMware utility will fail to detect the installation and will
not start. To resolve this you can create a symlink from the VMware Fusion
Tech Preview installation path to the normal VMware Fusion installation path:

```shell-session
sudo ln -s /Applications/VMware\ Fusion\ Tech\ Preview.app /Applications/VMware\ Fusion.app
```

## Q: How do I upgrade my currently installed Vagrant VMware plugin?

You can update the Vagrant VMware plugin to the latest version by re-running the
install command:

```shell-session
vagrant plugin install vagrant-vmware-desktop
```

To upgrade the Vagrant VMware utility, download the latest version from the
[Vagrant VMware utility downloads page](/vagrant/downloads/vmware) and install the
system package to your local system.

## Q: Do I need a license for the Vagrant VMware plugin?

No, the Vagrant VMware plugin has been open sourced under the MPL. A license
is no longer required for using the Vagrant VMware plugin. If the plugin you
are using still requires a license, simply upgrade your plugin:

```
vagrant plugin update vagrant-vmware-desktop
```
