Here’s a cleaned and polished version of your README diagnostics section, Nehemie—streamlined for clarity, utility, and that cockpit-level precision you demand:

---

## 🧠 Developer Diagnostics Toolkit

A collection of shell commands for auditing ports, processes, and services when troubleshooting dev server conflicts.

### 1️⃣ Find Active Listening Ports

```bash
sudo lsof -iTCP -sTCP:LISTEN -Pn
```

Or the compact alternative:

```bash
netstat -tulpn
```

---

### 2️⃣ Map Process IDs to Commands

```bash
ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%cpu | head -20
```

Use this to locate the highest resource-consuming processes.

---

### 3️⃣ Check What's Using a Specific Port (e.g. 3000)

```bash
sudo lsof -i :3000
```

Useful when your Next.js dev server says “port in use.”

---

### 4️⃣ List Running Services via systemd

```bash
systemctl list-units --type=service --state=running
```

To inspect autostart services:

```bash
systemctl list-unit-files | grep enabled
```

---

### 5️⃣ Kill Unwanted Processes (use carefully ⚠️)

```bash
sudo kill -9 <PID>
```

> Pro tip: use `sudo kill -SIGTERM` first for a cleaner exit before forcing `-9`.

---

### 6️⃣ View All ESTABLISHED Connections

```bash
sudo lsof -i -nP | grep ESTABLISHED
```

Detect persistent background connections from apps or daemons.

---

### 7️⃣ Check Firewall Rules (Ubuntu/Debian)

```bash
sudo ufw status verbose
```

Reveal blocked ports or strict IP access configurations.

---

