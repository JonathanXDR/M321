# GlusterFS-Cluster Übungsaufgabe für macOS

## 1. Umgebungsvorbereitung

Benötigte Tools:

- VMware Fusion (Virtualisierungsplattform)
- Homebrew (Paketmanager)
- Vagrant (VM-Verwaltung)
- Vagrant VMware Utility und Plugin (VMware Fusion Integration)

Installation:

```bash
# Homebrew installieren (falls nicht vorhanden)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Vagrant und VMware Utility installieren
brew install vagrant
brew install --cask vagrant-vmware-utility

# Vagrant VMware Plugin hinzufügen
vagrant plugin install vagrant-vmware-desktop
```

## 2. Projekt-Setup

Repository klonen:

```bash
git clone https://github.com/halkyon/glusterfs-vagrant
```

## 3. VM-Konfiguration

Das Vagrantfile wurde angepasst, um mit VMware Fusion und der ARM64-Architektur kompatibel zu sein. Dieser Prozess erforderte mehrere Iterationen und Feinjustierungen.

## Herausforderungen

Während des Setups trat ein Problem bei der GlusterFS-Installation auf:

```
The SSH command responded with a non-zero exit status. Vagrant
assumes that this means the command failed. The output for this command
should be in the log above. Please read the output to determine what
went wrong.
```

Dieser Fehler deutet auf Schwierigkeiten bei der Ausführung von Shell-Befehlen in der VM hin. Mögliche Ursachen:

- Netzwerkprobleme
- Inkompatibilitäten
- Berechtigungsprobleme

Aufgrund zeitlicher Beschränkungen konnte der Cluster nicht erfolgreich eingerichtet werden.

## Fazit

Trotz der Herausforderungen wurde ein guter Überblick über den Prozess der Einrichtung eines GlusterFS-Clusters mit Vagrant und VMware Fusion auf macOS gewonnen.
