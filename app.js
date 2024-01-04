const express = require("express");
const Tabs = require("./model/TabSchema");
const Role = require("./model/RolesSchema");
const Permission = require("./model/PermissionSchema");
const app = express();
const connectDB = require("./config/db");
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const secretKey = 'apurvak123';

connectDB;

app.post("/api/add-tab", async (req, res) => {
  try {
    const { tabName, displayName, isAdd, isEdit, isDelete, isActive } =
      req.body;

    const newTab = new Tabs({
      tabName,
      displayName,
      isAdd,
      isEdit,
      isDelete,
      isActive,
    });

    await newTab.save();

    res.status(201).json({ tabId: newTab._id });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/tab/:tabId", async (req, res) => {
  try {
    const tab = await Tabs.findById(req.params.tabId);

    if (!tab) {
      return res.status(404).json({ error: "Tab not found" });
    }

    res.json(tab);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/api/update-tab/:tabId", async (req, res) => {
  try {
    const { tabName, displayName, isAdd, isEdit, isDelete, isActive } =
      req.body;

    const tab = await Tabs.findByIdAndUpdate(req.params.tabId, {
      tabName,
      displayName,
      isAdd,
      isEdit,
      isDelete,
      isActive,
    });

    if (!tab) {
      return res.status(404).json({ error: "Tab not found" });
    }

    res.json({ status: "Tab updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/add-role", async (req, res) => {
  try {
    const { roleName } = req.body;

    const newRole = new Role({
      roleName,
    });

    await newRole.save();

    res.status(201).json({ roleId: newRole._id });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/add-permission", async (req, res) => {
  try {
    const { roleId, tabId, isView, isAdd, isEdit, isDelete } = req.body;

    const newPermission = new Permission({
      roleId,
      tabId,
      isView,
      isAdd,
      isEdit,
      isDelete,
    });

    await newPermission.save();

    res.status(201).json({ permissionId: newPermission._id });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/roles-permissions/:roleId", async (req, res) => {
  try {
    const role = await Role.findById(req.params.roleId);
    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }

    const permissions = await Permission.find({ roleId: req.params.roleId });

    const tabIds = permissions.map((permission) => permission.tabId);
    const tabs = await Tabs.find({ _id: { $in: tabIds }, isActive: true });

    res.json({
      role,
      permissions,
      tabs,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post('/api/token', (req, res) => {
    const { username, password } = req.body;
  
    if (username === 'admin' && password === 'admin123') { 
      const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
  
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
