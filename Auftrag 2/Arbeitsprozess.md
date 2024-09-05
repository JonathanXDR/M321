# Übungsaufgabe Cluster-Dateisystem (macOS)

### 1. Vorbereitung der Umgebung

Zuerst haben wir sichergestellt, dass alle notwendigen Tools auf macOS installiert waren. Dazu gehörten:

- VMware Fusion als Virtualisierungsplattform
- Homebrew als Paketmanager
- Vagrant für die einfache Verwaltung von VMs
- Vagrant VMware Utility und Plugin für die Integration mit VMware Fusion

Wir haben Homebrew mit folgendem Befehl installiert (falls noch nicht vorhanden):

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Anschliessend haben wir Vagrant und das VMware Utility installiert:

```bash
brew install vagrant
brew install --cask vagrant-vmware-utility
```

Zum Schluss haben wir das Vagrant VMware Plugin hinzugefügt:

```bash
vagrant plugin install vagrant-vmware-desktop
```

### 2. Projekt-Setup

Als Nächstes haben wir das bestehende GitHub-Repository geklont und ein neues Verzeichnis für unser GlusterFS-Cluster erstellt:

```bash
git clone https://github.com/halkyon/glusterfs-vagrant
```

### 3. VM-Konfiguration

Nachdem wir die Grundstruktur des Projekts eingerichtet hatten, haben, mussten wir das Vagrantfile aber noch anpassen, damit es mit VMware Fusion und der ARM64 Prozessorarchitektur funktioniert. Dieser Prozess dauerte eine Weile, und wir mussten immer wieder kleinere Änderungen vornehmen, um die VMs zum Laufen zu bringen.

## Herausforderungen und aktuelle Probleme

Während des Setups stiessen wir auf ein Problem bei der Installation von GlusterFS. Der Fehler trat während des Provisioning-Prozesses auf:

```
The SSH command responded with a non-zero exit status. Vagrant
assumes that this means the command failed. The output for this command
should be in the log above. Please read the output to determine what
went wrong.
```

Dieser Fehler deutet darauf hin, dass es Schwierigkeiten bei der Ausführung der Shell-Befehle in der VM gab. Mögliche Ursachen könnten Netzwerkprobleme, Inkompatibilitäten oder Berechtigungsprobleme sein. Da wir aber nicht genügend Zeit hatten, um das Problem zu lösen, konnten wir den Cluster nicht erfolgreich einrichten.

Trotz dieser Herausforderung haben wir einen guten Überblick über den Prozess der Einrichtung eines GlusterFS-Clusters mit Vagrant und VMware Fusion auf macOS gewonnen.
