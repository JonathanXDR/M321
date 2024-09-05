# Übungsaufgabe Cluster Dateisystem

## Anleitung für macOS

Für macOS würde ich folgendes Vorgehen empfehlen:

1. Vorbereitung:

Stellen Sie sicher, dass VMware Fusion installiert ist.
Installieren Sie Homebrew, falls noch nicht vorhanden: /bin/bash -c "$(curl -fsSL <https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh>)"
Installieren Sie Vagrant: brew install vagrant
Installieren Sie das Vagrant VMware Utility: brew install --cask vagrant-vmware-utility
Installieren Sie das Vagrant VMware Plugin: vagrant plugin install vagrant-vmware-desktop

2. Wählen Sie GlusterFS als Cluster-Dateisystem (wie zuvor empfohlen).
   Setup vorbereiten:

3. Erstellen Sie einen neuen Ordner für das Projekt: mkdir glusterfs-cluster && cd glusterfs-cluster
   Erstellen Sie ein neues Vagrantfile: touch Vagrantfile

4. Vagrantfile anpassen:
   Öffnen Sie das Vagrantfile mit einem Texteditor und fügen Sie folgenden Inhalt ein:

Angepasstes Vagrantfile für GlusterFS mit VMware FusionClick to open code

VMs starten und konfigurieren:

Starten Sie die VMs: vagrant up --provider=vmware_desktop
Verbinden Sie sich mit jeder Node: vagrant ssh gluster1, vagrant ssh gluster2, vagrant ssh gluster3
Auf jeder Node führen Sie aus:
Copysudo gluster peer probe 192.168.56.11
sudo gluster peer probe 192.168.56.12
sudo gluster peer probe 192.168.56.13

6. GlusterFS-Volume erstellen:
   Auf einer der Nodes (z.B. gluster1) führen Sie aus:
   Copysudo mkdir -p /gluster/volume1
   sudo gluster volume create gv0 replica 3 192.168.56.11:/gluster/volume1 192.168.56.12:/gluster/volume1 192.168.56.13:/gluster/volume1 force
   sudo gluster volume start gv0

7. Client konfigurieren:

Verbinden Sie sich mit dem Client: vagrant ssh client
Installieren Sie den GlusterFS-Client: sudo apt-get install -y glusterfs-client
Mounten Sie das GlusterFS-Volume:
Copysudo mkdir /mnt/glusterfs
sudo mount -t glusterfs 192.168.56.11:/gv0 /mnt/glusterfs

8. Testen:

Schreiben Sie Testdaten auf den Client: echo "Test data" | sudo tee /mnt/glusterfs/testfile
Überprüfen Sie, ob die Daten auf allen Nodes vorhanden sind

Ausfallszenarien testen:

Fahren Sie einen Node herunter: vagrant halt gluster1
Versuchen Sie, die Daten vom Client aus zu lesen und zu schreiben
Wiederholen Sie den Test mit zwei ausgefallenen Nodes
