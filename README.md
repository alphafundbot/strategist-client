cle# 1. Find Listening Ports and Owning Processes

```bash
sudo lsof -iTCP -sTCP:LISTEN -Pn
```

Or more compact:
```bash
netstat -tulpn
```

---

## 🧠 2. Map Process IDs to Friendly Names

```bash
ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%cpu | head -20
```

---

## 🧪 3. Check Processes Using a Specific Port (e.g. 3000)

```bash
sudo lsof -i :3000
```

---

## 🧹 4. List All Running Services (systemd only)

```bash
systemctl list-units --type=service --state=running
```

To see autostart services:
```bash
systemctl list-unit-files | grep enabled
```

---

## 🔥 5. Kill Unwanted Processes (if needed)

```bash
sudo kill -9 <PID>
```

---

## 📡 6. Background Network Connections

```bash
sudo lsof -i -nP | grep ESTABLISHED
```

---

## 🛡️ 7. Firewall Rules (Ubuntu/Debian)

```bash
sudo ufw status verbose
```