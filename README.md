# WebAR-Artifact (青铜器 - 卡通写实) — 部署包说明

此项目演示使用 **AR.js (NFT)** + **A-Frame** 在浏览器中实现基于图片的 WebAR 识别，并结合一个简化的聊天科普界面（博物馆志愿者风格）。

---

## 项目结构

```
WebAR-Artifact/
├─ index.html
├─ css/
│  └─ style.css
├─ js/
│  └─ chat.js
├─ nft/
│  └─ artifact.fset, artifact.fset3, artifact.iset   # 由 NFT Marker Creator 生成（用户需放入）
├─ assets/
│  ├─ images/
│  │  └─ artifact.jpg    # 识别用图像（请用你上传的青铜器图片）
│  └─ models/
│     └─ artifact.glb    # 卡通写实 GLB 模型（占位，建议替换）
```

---

## 1）准备识别图像（生成 NFT 资源）

1. 打开 NFT Marker Creator（网页工具）：
   - https://ar-js-org.github.io/NFT-Marker-Creator/
2. 上传你的青铜器图片（建议使用你刚上传的高分辨率图片）。
3. 下载生成的文件：`artifact.fset`, `artifact.fset3`, `artifact.iset`。
4. 将这三个文件放到项目的 `nft/` 目录，文件名前缀保持 `artifact`（无需扩展名时在 index.html 中使用 `./nft/artifact`）。

---

## 2）替换模型与图片（可选）

- 将你想显示的卡通写实 GLB 模型放入 `assets/models/artifact.glb`。
  - 若没有可用模型，示例包中已使用占位模型（Duck），建议替换为更贴近青铜器的卡通模型。
- 将你上传的青铜器图片放入 `assets/images/artifact.jpg` （或修改 index.html 中路径）。

---

## 3）本地测试（注意 HTTPS）

- 本地测试可以直接在 `localhost` 上运行（摄像头权限允许）。
- 若使用远程服务器（非 localhost），请确保 HTTPS 可用（浏览器安全限制）。

例如使用 Python 3 简易服务器（仅用于 localhost）：
```
# 在项目根目录运行
python3 -m http.server 8000
# 然后在浏览器打开 http://localhost:8000/index.html
```

若在远程服务器（含手机）测试，推荐部署到 GitHub Pages 或其他支持 HTTPS 的静态托管。

---

## 4）把聊天集成到后端 LLM（可选）
- 当前 chat.js 使用本地模拟回答。要接入真实 LLM，请修改 chat.js 中的 onSend 方法，调用你的后端 API（注意 CORS 与鉴权），并把返回文本传入 appendLog。
- 你可以继续使用现有的聊天 UI（也可以替换为你的完整 UI）。

---

## 5）常见问题与调优建议

- 若识别失败，请检查：
  - NFT 文件是否放置正确（nft/artifact.*）
  - 图片是否太模糊或占比太小
  - 摄像头权限是否允许
  - 是否在 HTTPS 环境（非 localhost）
- 若追踪抖动，可调节 a-nft 上的 smooth 参数（smoothCount / smoothTolerance / smoothThreshold）。

---

## 联系与定制
如果你需要，我可以：
- 帮你把你上传的图片直接转换为 NFT 描述符文件（需你允许我访问并生成，或我给出操作脚本/步骤）。
- 帮你将项目部署到 GitHub Pages，并提供测试 URL。
- 用你的真实 GLB 模型替换占位模型并微调显示效果。

